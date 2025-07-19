import { useState, useEffect } from "react";
import { createRole, updateRole, fetchRoleById } from "../services/api";
import { useParams, useNavigate } from 'react-router-dom';

const allPrivileges = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'ALTER'];

const RoleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState('');
    const [privileges, setPrivileges] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchRoleById(id)
                .then(data => {
                    setRoleName(data.name);
                    setPrivileges(data.privileges || []);
                })
                .catch(() => setError('Failed to load role.'));
        }
    }, [id]);

    const handleCheckboxChange = (priv) => {
        setPrivileges(prev =>
            prev.includes(priv) ? prev.filter(p => p !== priv) : [...prev, priv]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { name: roleName, privileges };
            if (id) {
                await updateRole(id, data);
            } else {
                await createRole(data);
            }
            navigate('/');
        } catch (err) {
            if (err.response?.status === 409) {
                setError('Role name already exists.');
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
                <h2>{id ? 'Edit role' : 'Create role'}</h2>
                {error && <p className="form-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                <label className="title">Role name:</label>
                <input 
                    type="text" 
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    className="input-text"
                />

                <label className="title">Privileges:</label>
                <div className="checkbox-group">
                    {allPrivileges.map(priv => (
                    <label key={priv} className="checkbox-label">
                        <input 
                            type="checkbox" 
                            checked={privileges.includes(priv)}
                            onChange={() => handleCheckboxChange(priv)}
                            className="input-box"
                        />
                        {priv}
                    </label>
                    ))}
                </div>

                <button type="submit">{id ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    );
};

export default RoleForm;
