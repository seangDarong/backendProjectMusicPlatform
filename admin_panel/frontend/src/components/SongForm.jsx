import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchAlbums, fetchArtists, createSong, updateSong, fetchSongById, fetchAlbumDetail } from "../services/api";
import { useState, useEffect } from "react";

const SongForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const initialAlbumId = queryParams.get("albumId");

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [artistId, setArtistId] = useState('');
    const [albumId, setAlbumId] = useState(initialAlbumId || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (albumId && !id) {
            fetchAlbumDetail(albumId)
                .then(album => setArtistId(album.artist_id))
                .catch(() => setError("Failed to fetch album for artist ID"));
        }

        if (id) {
            fetchSongById(id)
                .then((data) => {
                    setTitle(data.title);
                    setDuration(data.duration);
                    setReleaseDate(data.release_date);
                    setArtistId(data.artist_id);
                    setAlbumId(data.album_id);
                })
                .catch(() => setError('Failed to load song.'));
        }
    }, [id, albumId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { title, duration, releaseDate, artist_id: artistId, album_id: albumId };

            if (id) {
                await updateSong(id, data);
            } else {
                await createSong(data);
            }

            navigate(`/albums/${albumId}`);
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>{id ? 'Edit song' : 'Create song'}</h2>
                {error && <p className="form-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="title">Title</label>
                    <input 
                        type="text" 
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-text"
                    />

                    <label className="title">Duration (seconds)</label>
                    <input 
                        type="number" 
                        value={duration}
                        required
                        onChange={(e) => setDuration(e.target.value)}
                        className="input-text"
                    />

                    <label className="title">Release date</label>
                    <input 
                        type="date" 
                        value={releaseDate}
                        required
                        onChange={(e) => setReleaseDate(e.target.value)}
                        className="input-text"
                    />

                    {/* Hidden inputs (optional, but helps in debugging or form control) */}
                    <input type="hidden" value={artistId} />
                    <input type="hidden" value={albumId} />

                    <button type="submit">{id ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    );
};

export default SongForm;
