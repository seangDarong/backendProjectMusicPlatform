import { useState, useEffect } from "react";
import { fetchAlbums, deleteAlbum } from '../services/api';
import { useNavigate } from "react-router-dom";
import '../styles/global.css';

const AlbumTable = ({ artistId }) => {
    const [albums, setAlbums] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbums()
            .then(data => {
                const filtered = data.filter(album => album.artist_id === parseInt(artistId));
                setAlbums(filtered);
            })
            .catch(err => console.error('Error fetching albums', err));
    }, [artistId]);

    const confirmDelete = (id) => {
        setSelectedAlbumId(id);
        setShowModal(true);
    };

    const handleDelete = () => {
        deleteAlbum(selectedAlbumId)
            .then(() => {
                alert('Album deleted successfully!');
                fetchAlbums().then(data => {
                    const filtered = data.filter(album => album.artist_id === parseInt(artistId));
                    setAlbums(filtered);
                });
                setShowModal(false);
                setSelectedAlbumId(null);
            })
            .catch(() => {
                alert('Failed to delete album');
                setShowModal(false);
            });
    };

    return (
        <>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Release date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {albums.length === 0 ? (
                        <tr><td colSpan="4">No albums found for this artist.</td></tr>
                    ) : (
                        albums.map(album => (
                            <tr key={album.album_id}>
                                <td>{album.album_id}</td>
                                <td
                                    className="clickable-name"
                                    onClick={() => navigate(`/albums/${album.album_id}`)}
                                >
                                    {album.title}
                                </td>
                                <td>{album.release_date}</td>
                                <td>
                                    <button className="edit-button" onClick={() => navigate(`/albums/edit/${album.album_id}`)}>Edit</button>
                                    <button className="delete-button" onClick={() => confirmDelete(album.album_id)}>Delete</button>
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
                        <p>Are you sure you want to delete this album?</p>
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

export default AlbumTable;