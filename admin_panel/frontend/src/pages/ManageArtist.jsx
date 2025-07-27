import Sidebar from '../components/Sidebar';
import '../styles/global.css';

const ManageArtist = () => {

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <h1>ManageArtist</h1>
            </div>
        </div>
    );
}

export default ManageArtist;