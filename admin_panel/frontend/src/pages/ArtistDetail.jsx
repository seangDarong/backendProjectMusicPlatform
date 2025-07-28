import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArtistDetail } from '../services/api';
import Sidebar from '../components/Sidebar';
import AlbumTable from "../components/AlbumTable";
import '../styles/global.css';

const ArtistDetail = () => {
    const { id } = useParams(); 
    const [artist, setArtist] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArtistDetail(id)
            .then(data => setArtist(data))
            .catch(err => console.error("Error loading artist detail", err));
    }, [id]);

    if (!artist) return null; 

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <div style={{ display: 'flex', gap: '20px'}}>
                    <h1 
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                    >
                        &lt;
                    </h1>
                    <h1>{artist.name}</h1>
                </div>
                
                <hr />
                <p><strong>Bio:</strong> {artist.bio}</p>
                <p><strong>Country:</strong> {artist.country}</p>

                <div className="create-buttons">
                    <button className="create-button" onClick={() => navigate('/albums/new')}>Create album</button>
                </div>

                <h3>Albums</h3>
                <AlbumTable artistId={id} />
            </div>
        </div>
    );
};

export default ArtistDetail;
