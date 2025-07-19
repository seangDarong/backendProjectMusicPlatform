import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from '../services/api';
import { useNavigate } from "react-router-dom";
import '../styles/global.css'; 

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers()
            .then(data => setUsers(data))
            .catch(err => console.error('Error fetching users', err));
    }, []);

    const confirmDelete = (id) => {
        setSelectedUserId(id);
        setShowModal(true);
    };

    const handleDelete = () => {
        deleteUser(selectedUserId)
            .then(() => {
                alert('User deleted successfully!');
                fetchUsers().then(setUsers);
                setShowModal(false);
                setSelectedUserId(null);
            })
            .catch(() => {
                alert('Failed to delete user');
                setShowModal(false);
            });
    };

    return (
        <>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr><td colSpan="4">No users found.</td></tr>
                    ) : (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="edit-button" onClick={() => navigate(`/users/edit/${user.id}`)}>Edit</button>
                                    <button className="delete-button" onClick={() => confirmDelete(user.id)}>Delete</button>
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
                        <p>Are you sure you want to delete this user?</p>
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

export default UserTable;
