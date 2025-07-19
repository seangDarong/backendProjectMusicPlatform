import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RoleTable from '../components/RoleTable';    
import UserTable from '../components/UserTable';   
import '../styles/global.css';  

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('users'); 
    const navigate = useNavigate();

    return (
        <div>
            <h1>Dashboard</h1>
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
    );
};

export default Dashboard;
