import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAlbumDetail } from '../services/api';
import Sidebar from '../components/Sidebar';
import SongTable from "../components/SongTable";
import '../styles/global.css';

const AlbumDetail = () => {
    const { id } = useParams(); 
    const [album, setAlbum] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbumDetail(id)
            .then(data => setAlbum(data))
            .catch(err => console.error("Error loading album detail", err));
    }, [id]);

    if (!album) return null; 

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <div style={{ display: 'flex', gap: '20px'}}>
                    <h1 
                        onClick={() => navigate(`/artists/${album.artist_id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        &lt;
                    </h1>
                    <div>
                        <h1>{album.title}</h1>
                        {album.Artist && (
                            <p style={{ fontSize: '1.2rem', color: '#666', margin: '0' }}>
                                by {album.Artist.name}
                            </p>
                        )}
                    </div>
                </div>
                
                <hr />
                <p><strong>Release date:</strong> {album.release_date}</p>

                <div className="create-buttons">
                    <button className="create-button" onClick={() => navigate(`/songs/new?albumId=${id}`)}>Create song</button>
                </div>

                <h3>Songs</h3>
                <SongTable albumId={id} />
            </div>
        </div>
    );
};

export default AlbumDetail;