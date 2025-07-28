import { useState, useEffect } from "react";
import { fetchSongs, deleteSong } from '../services/api';
import { useNavigate } from "react-router-dom";
import '../styles/global.css'; 

const SongTable = () => {
    const [songs, setSongs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSongs()
            .then(data => setSongs(data))
            .catch(err => console.error('Error fetching songs', err));
    }, []);

    const confirmDelete = (id) => {
        setSelectedSongId(id);
        setShowModal(true);
    };

    const handleDelete = ()=> {
        deleteSong(selectedSongId)
            .then(() => {
                alert('Song deleted sucessfullly!');
                fetchSongs().then(setSongs);
                setShowModal(false);
                setSelectedSongId(null);
            })
            .catch(() => {
                alert('Failed to delete song');
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
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {songs.length === 0 ? (
                            <tr><td colSpan="6">No songs found.</td></tr>
                        ) : (
                            songs.map(song => (
                                <tr key={song.song_id}>
                                    <td>{song.song_id}</td>
                                    <td>{song.title}</td>
                                    <td>
                                        {song.Artist
                                            ? `${song.Artist.name} (${song.Artist.country})`
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {song.Album
                                            ? `${song.Album.title} (${song.Album.release_date})`
                                            : 'N/A'}
                                    </td>
                                    <td>{song.duration_in_sec} sec</td>
                                    <td>
                                        <button className="edit-button" onClick={() => navigate(`/songs/edit/${song.song_id}`)}>Edit</button>
                                        <button className="delete-button" onClick={() => confirmDelete(song.song_id)}>Delete</button>
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
                        <p>Are you sure you want to delete this song?</p>
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

export default SongTable;