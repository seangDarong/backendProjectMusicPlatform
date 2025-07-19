const { sequelize, User, Role } = require('../modles');

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Role,
                attributes: ['name']  
            }
        });

        const formattedUsers = users.map(user => ({
            id: user.user_id,
            username: user.username,
            role: user.Role ? user.Role.name : 'No role assigned'
        }));

        res.json(formattedUsers);
    } catch (err) {
        console.error('Error fetching users.', err);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};

// const getUserById = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (!user) return res.status(404).json({ error: 'User not found.' });

//         const [results] = await sequelize.query(
//             'select * from users where user_id = ?',
//             { replacements: [user.user_id] }
//         );
//     } catch (err) {
//         console.error('Error fetching user by ID.', err);
//         res.status(500).json({ error: 'Failed to fetch user by ID.' });
//     }
// };

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: Role, 
        });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        return res.json(user);
    } catch (err) {
        console.error('Error fetching user by ID.', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    const { username, password, role_id } = req.body;
    const t = await sequelize.transaction();

    try {
        const role = await Role.findByPk(role_id, { transaction: t });
        if (!role) {
            await t.rollback();
            return res.status(404).json({ error: 'Role not found' });
        }

        const existingUser = await User.findOne({ where: { username }, transaction: t });
        if (existingUser) {
            await t.rollback();
            return res.status(409).json({ error: 'Username already exists.' });
        }

        const newUser = await User.create({
            username,
            password,
            role_id
        }, { transaction: t });

        const [privResult] = await sequelize.query(
            'select privilege from role_privilege where role_id = ?',
            {
                replacements: [role_id],
                transaction: t
            }
        );

        const privileges = privResult.map(p => p.privilege).join(', ');

        await sequelize.query(
            `create user '${username}'@'localhost' identified by '${password}'`,
            { transaction: t }
        );

        await sequelize.query(
            `grant ${privileges} on ${process.env.DB_NAME}.* TO '${username}'@'localhost'`,
            { transaction: t }
        );

        await t.commit();

        res.status(201).json({ message: 'User created successfully.', user: newUser, grantedPrivilege: privileges });
    } catch (err) {
        await t.rollback();

        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Username already exists.' });
        }

        console.error('Error creating user.', err);
        res.status(500).json({ error: 'Failed to create user.' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, password, role_id } = req.body;
    const t = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId, { transaction: t });
        if (!user) {
            await t.rollback();
            return res.status(404).json({ error: 'User not found.' });
        }

        if (username && username !== user.username) {
            const existingUser = await User.findOne({ where: { username }, transaction: t });
            if (existingUser) {
                await t.rollback();
                return res.status(409).json({ error: 'Username already exists.' });
            }
        }

        if (role_id && role_id !== user.role_id) {
            const role = await Role.findByPk(role_id, { transaction: t });
            if (!role) {
                await t.rollback();
                return res.status(404).json({ error: 'New role not found.' });
            }
            user.role_id = role_id;
        }

        const oldUsername = user.username;

        if (username) user.username = username;
        if (password) user.password = password;

        await user.save({ transaction: t });

        if (username && username !== oldUsername) {
            // Rename MySQL user
            await sequelize.query(
                `rename user '${oldUsername}'@'localhost' to '${username}'@'localhost'`,
                { transaction: t }
            );
        }

        if (password) {
            await sequelize.query(
                `alter user'${username || oldUsername}'@'localhost' identified by '${password}'`,
                { transaction: t }
            );
        }

        await t.commit();

        res.status(200).json({
            message: 'User updated successfully.',
            user
        });
    } catch (err) {
        await t.rollback();

        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Username already exists.' });
        }

        console.error('Error updating user.', err);
        res.status(500).json({ error: 'Failed to update user.' });
    }
};


const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const t = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId, { transaction: t });
        if (!user) {
            await t.rollback();
            return res.status(404).json({ error: 'User not found.' });
        }

        const username = user.username;

        await User.destroy({
            where: { user_id: userId },
            transaction: t
        });

        await sequelize.query(
            `drop user '${username}'@'localhost'`,
            { transaction: t }
        );

        await t.commit();

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        await t.rollback();
        console.error('Error deleting user.', err);
        res.status(500).json({ error: 'Failed to delete user.' });
    }
};

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};