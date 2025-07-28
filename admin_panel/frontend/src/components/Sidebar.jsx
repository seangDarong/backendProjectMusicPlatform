import { useNavigate } from "react-router-dom";
import '../styles/global.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h3>Admin Panel</h3>
            <ul>
                <li onClick={() => navigate('/')}>Artists Section</li>
                <li onClick={() => navigate('/manage/subscriptions')}>Subscriptions Section</li>
                <li onClick={() => navigate('/manage/subscribers')}>Subscribers Section</li>
                <li onClick={() => navigate('/roles/dashboard')}>Database Role Management</li>
            </ul>
        </div>
    );
};

export default Sidebar;
