import { useState, useEffect } from "react";
import { fetchRolesWithPrivileges, createUser, updateUser, fetchUserById } from "../services/api";
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRolesWithPrivileges()
            .then(setRoles)
            .catch(() => setError('Failed to load roles.'));

        if (id) {
            fetchUserById(id)
                .then((data) => {
                    setUsername(data.username);
                    setRoleId(data.role_id);
                })
                .catch(() => setError('Failed to load user.'));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { username, role_id: roleId };
            if (!id) data.password = password; 

            if (id) {
                await updateUser(id, data);
            } else {
                await createUser(data);
            }
            navigate('/');
        } catch (err) {
            if (err.response?.status === 409) {
                setError('Username already exists.');
            } else if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Something went wrong.');
            }
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>{id ? 'Edit user' : 'Create user'}</h2>
                {error && <p className="form-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="title">Username:</label>
                    <input 
                        type="text" 
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-text"
                    />

                    {!id && (
                        <>
                            <label className="title">Password:</label>
                            <input 
                                type="text" 
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-text"
                            />
                        </>
                    )}

                    <label className="title">Role:</label>
                    <select 
                        value={roleId} 
                        onChange={(e) => setRoleId(e.target.value)} 
                        required
                    >
                        <option value="">Select a role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit">{id ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
