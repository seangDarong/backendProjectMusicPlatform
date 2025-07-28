import Sidebar from '../components/Sidebar';
import ArtistTable from '../components/ArtistTable';
import '../styles/global.css';

const ManageArtist = () => {

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <h1>Manage Artist</h1>
                <hr />
                <div className="create-buttons">
                    <button className="create-button" onClick={() => navigate('/users/new')}>Create artist</button>
                </div>
                <ArtistTable />
            </div>
        </div>
    );
}

export default ManageArtist;