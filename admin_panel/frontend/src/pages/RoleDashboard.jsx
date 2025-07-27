import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RoleTable from '../components/RoleTable';
import UserTable from '../components/UserTable';
import Sidebar from '../components/Sidebar';
import '../styles/global.css';

const RoleDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <h1>Database Role Management Dashboard</h1>
                <div>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`user-tab ${activeTab === 'users' ? 'active' : ''}`}
                    >
                        Users
                    </button>

                    <button
                        onClick={() => setActiveTab('roles')}
                        className={`role-tab ${activeTab === 'roles' ? 'active' : ''}`}
                    >
                        Roles
                    </button>
                </div>
                <hr />
                <div className="create-buttons">
                    {activeTab === 'users' && (
                        <button className="create-button" onClick={() => navigate('/users/new')}>Create new user</button>
                    )}
                    {activeTab === 'roles' && (
                        <button className="create-button" onClick={() => navigate('/roles/new')}>Create new role</button>
                    )}
                </div>

                {activeTab === 'users' && <UserTable />}
                {activeTab === 'roles' && <RoleTable />}
            </div>
        </div>
    );
};

export default RoleDashboard;
