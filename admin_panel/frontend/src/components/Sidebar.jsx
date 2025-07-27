import { useNavigate } from "react-router-dom";
import '../styles/global.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h3>Admin Panel</h3>
            <ul>
                <li onClick={() => navigate('/')}>Dashboard</li>
                <li onClick={() => navigate('/report')}>View Reports</li>
                <li onClick={() => navigate('/manage/songs')}>Manage Songs</li>
                <li onClick={() => navigate('/manage/subscriptions')}>Manage Subscriptions</li>
                <li onClick={() => navigate('/manage/subscribers')}>Manage Subscribers</li>
                <li onClick={() => navigate('/manage/artists')}>Manage Artists</li>
                <li onClick={() => navigate('/roles/dashboard')}>Database Role Management</li>
                <li onClick={() => navigate('/admin/add')}>Add Admin User</li>
            </ul>
        </div>
    );
};

export default Sidebar;
