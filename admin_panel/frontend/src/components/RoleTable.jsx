import { useState, useEffect } from "react";
import { fetchRolesWithPrivileges, deleteRole } from '../services/api';
import { useNavigate } from "react-router-dom";
import '../styles/global.css'; 

const RoleTable = () => {
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRolesWithPrivileges()
            .then(data => setRoles(data))
            .catch(err => console.error('Error fetching roles.', err));
    }, []);

    const confirmDelete = (id) => {
        setSelectedRoleId(id);
        setShowModal(true);
    };

    const handleDelete = () => {
        deleteRole(selectedRoleId)
            .then(() => {
                alert('Role deleted successfully!');
                fetchRolesWithPrivileges().then(setRoles);
                setShowModal(false);
                setSelectedRoleId(null);
            })
            .catch(() => {
                alert('Failed to delete role');
                setShowModal(false);
            });
    };

    return (
        <>  
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Role name</th>
                        <th>Privileges</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length == 0 ? (
                        <tr><td colSpan="4">No roles found.</td></tr>
                    ) : (roles.map(role => (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>{(role.privileges || []).join(', ')}</td>
                                <td>
                                    <button className="edit-button" onClick={() => navigate(`/roles/edit/${role.id}`)}>Edit</button>
                                    <button className="delete-button" onClick={() => confirmDelete(role.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this role?</p>
                        <div className="modal-buttons">
                            <button onClick={handleDelete} className="ok-btn">OK</button>
                            <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RoleTable;
