const { sequelize, Role } = require('../modles');

const getAllRolesWithPrivileges = async (req, res) => {
    try {
        const [roles] = await sequelize.query(`
            select r.role_id, r.name, group_concat(rp.privilege) as privileges
            from roles r
            left join role_privilege rp on r.role_id = rp.role_id
            group by r.role_id, r.name
        `);

        const formatted = roles.map(role => ({
            id: role.role_id,
            name: role.name,
            privileges: role.privileges ? role.privileges.split(',') : []
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error('Error fetching roles.', err);
        res.status(500).json({ error: 'Failed to fetch roles.' });
    }
};

const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ error: 'Role not found.' });

        const [results] = await sequelize.query(
            'select privilege from role_privilege where role_id = ?',
            { replacements: [role.role_id] }
        );

        const privileges = results.map(row => row.privilege);

        res.json({ ...role.toJSON(), privileges})
    } catch (err) {
        console.error('Error fetching role by ID.', err);
        res.status(500).json({ error: 'Failed to fetch role by ID.' });
    }
};

const createRole = async (req, res) => {
    const { name, privileges = [] } = req.body;
    const t = await sequelize.transaction();

    try {
        const existing = await Role.findOne({ where: { name }, transaction: t });
        if (existing) {
            await t.rollback();
            return res.status(409).json({ error: 'Role name already exists.' });
        }

        const newRole = await Role.create({
            name
        }, { transaction: t });

        for (const priv of privileges) {
            await sequelize.query(
                'insert into role_privilege (role_id, privilege) values (?, ?)',
                { replacements: [newRole.role_id, priv], transaction: t }
            );
        }

        const privilegeList = privileges.join(', ');
    
        await sequelize.query(
            `create role '${name}'`,
            { transaction: t }
        );
    
        await sequelize.query(
            `grant ${privilegeList} on ${process.env.DB_NAME}.* to '${name}'`,
            { transaction: t }
        );
    
        await t.commit();
    
        res.status(201).json({ message: 'Role created successfully.', role: newRole, grantedPrivilege: privileges });
    } catch (err) {
        await t.rollback();
        console.error('Error creating role.', err);
        res.status(500).json({ error: 'Failed to create role.' });
    }

};

const updateRole = async (req, res) => {
    const roleId = req.params.id;
    const { name, privileges = [] } = req.body;
    const t = await sequelize.transaction();

    try {
        const role = await Role.findByPk(roleId, { transaction: t });
        if (!role) {
            await t.rollback();
            return res.status(404).json({ error: 'Role not found.' });
        }

        const oldName = role.name;
        const newName = name;

        await sequelize.query(
            `revoke all privileges on ${process.env.DB_NAME}.* from '${oldName}'`,
            { transaction: t }
        );

        if (newName && newName !== oldName) {
            const duplicate = await Role.findOne({
                where: { name: newName },
                transaction: t
            });
            if (duplicate) {
                await t.rollback();
                return res.status(409).json({ error: 'New role name already exists.' });
            }

            await sequelize.query(
                `rename user '${oldName}' TO '${newName}'`, 
                { transaction: t }
            );

            role.name = newName;
        }

        await role.save({ transaction: t });

        const privilegeList = privileges.join(', ');

        await sequelize.query(
            `grant ${privilegeList} on ${process.env.DB_NAME}.* to '${role.name}'`,
            { transaction: t }
        );

        await sequelize.query(
            'delete from role_privilege where role_id = ?',
            { replacements: [role.role_id], transaction: t }
        );

        for (const priv of privileges) {
            await sequelize.query(
                'insert into role_privilege (role_id, privilege) values (?, ?)',
                { replacements: [role.role_id, priv], transaction: t }
            );
        }

        await t.commit();

        res.status(200).json({
            message: 'Role updated successfully.',
            role,
            updatedPrivileges: privileges
        });
    } catch (err) {
        console.error('Error updating role.', err);
        res.status(500).json({ error: 'Failed to update role.' });
    }
};

const deleteRole = async (req, res) => {
    const roleId = req.params.id;
    const t = await sequelize.transaction();

    try {
        const role = await Role.findByPk(roleId, { transaction: t });
        if (!role) {
            await t.rollback();
            return res.status(404).json({ error: 'Role not found.' });
        }

        const roleName = role.name;

        await Role.destroy({
            where: { role_id: roleId },
            transaction: t
        });

        await sequelize.query(
            `drop role '${roleName}'`,
            { transaction: t }
        );

        await t.commit();

        res.status(200).json({ message: 'Role deleted successfully.' });
    } catch (err) {
        await t.rollback();
        console.error('Error deleting role.', err);
        res.status(500).json({ error: 'Failed to delete role.' });
    }
};

module.exports = {
    getAllRolesWithPrivileges,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};