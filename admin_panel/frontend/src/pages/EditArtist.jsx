import Sidebar from '../components/Sidebar';
import ArtistForm from '../components/ArtistForm';
import '../styles/global.css';

const EditArtist = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <ArtistForm />
            </div>
        </div>
    );
};

export default EditArtist;
