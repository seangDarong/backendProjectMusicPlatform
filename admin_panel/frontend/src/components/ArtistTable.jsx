import { useState, useEffect } from "react";
import { fetchArtists, deleteArtist } from '../services/api';
import { useNavigate } from "react-router-dom";
import '../styles/global.css'; 

const ArtistTable = () => { 
    const [artists, setArtists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArtists()
            .then(data => setArtists(data))
            .catch(err => console.error('Error fetching artists', err));
    }, []);

    const confirmDelete = (id) => {
        setSelectedArtistId(id);
        setShowModal(true);
    };

    const handleDelete = ()=> {
        deleteArtist(selectedArtistId)
            .then(() => {
                alert('Artist deleted sucessfullly!');
                fetchArtists().then(setArtists);
                setShowModal(false);
                setSelectedArtistId(null);
            })
            .catch(() => {
                alert('Failed to delete artist');
                setShowModal(false);
            });
    };

    return (
        <>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Bio</th>
                        <th>Country</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {artists.length === 0 ? (
                            <tr><td colSpan="5">No artists found.</td></tr>
                        ) : (
                            artists.map(artist => (
                                <tr key={artist.artist_id}>
                                    <td>{artist.artist_id}</td>
                                    <td     
                                        className="clickable-name"
                                        onClick={() => navigate(`/artists/${artist.artist_id}`)}
                                    >
                                        {artist.name}
                                    </td>
                                    <td>{artist.bio}</td>
                                    <td>{artist.country}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => navigate(`/artists/edit/${artist.artist_id}`)}>Edit</button>
                                        <button className="delete-button" onClick={() => confirmDelete(artist.artist_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this artist?</p>
                        <div className="modal-buttons">
                            <button onClick={handleDelete} className="ok-btn">OK</button>
                            <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ArtistTable;