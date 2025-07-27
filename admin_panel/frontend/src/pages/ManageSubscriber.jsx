import Sidebar from '../components/Sidebar';
import '../styles/global.css';

const ManageSubscriber = () => {

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <h1>ManageSubscriber</h1>
            </div>
        </div>
    );
}

export default ManageSubscriber;