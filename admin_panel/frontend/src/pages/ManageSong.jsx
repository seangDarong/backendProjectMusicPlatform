import Sidebar from '../components/Sidebar';
import SongTable from '../components/SongTable';
import '../styles/global.css';

const ManageSong = () => {

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <h1>Manage Song</h1>
                <hr />
                <div className="create-buttons">
                    <button className="create-button" onClick={() => navigate('/users/new')}>Create song</button>
                </div>
                <SongTable />
            </div>
        </div>
    );
}

export default ManageSong;