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
    const [songUrl, setSongUrl] = useState('');
    const [albumCoverUrl, setAlbumCoverUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (albumId && !id) {
            fetchAlbumDetail(albumId)
                .then(album => {
                    setArtistId(album.artist_id);
                    setAlbumCoverUrl(album.cover_image_url || '');
                })
                .catch(() => setError("Failed to fetch album for artist ID"));
        }

        if (id) {
            fetchSongById(id)
                .then((data) => {
                    setTitle(data.title);
                    setDuration(data.duration_in_sec);
                    setReleaseDate(data.release_date);
                    setArtistId(data.artist_id);
                    setAlbumId(data.album_id);
                    setSongUrl(data.song_url || '');
                    // For editing, also fetch the album cover for reference
                    return fetchAlbumDetail(data.album_id);
                })
                .then(album => {
                    setAlbumCoverUrl(album.cover_image_url || '');
                })
                .catch(() => setError('Failed to load song.'));
        }
    }, [id, albumId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { 
                title, 
                duration_in_sec: parseInt(duration), 
                release_date: releaseDate, 
                artist_id: parseInt(artistId), 
                album_id: parseInt(albumId),
                cover_image_url: albumCoverUrl || null, // Use album's cover image
                song_url: songUrl || null
            };

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

                    {albumCoverUrl && (
                        <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                Song will use album cover:
                            </p>
                            <img 
                                src={albumCoverUrl} 
                                alt="Album cover that will be used for this song" 
                                style={{ 
                                    maxWidth: '80px', 
                                    maxHeight: '80px', 
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    <label className="title">Song URL (Optional)</label>
                    <input 
                        type="url" 
                        value={songUrl}
                        onChange={(e) => setSongUrl(e.target.value)}
                        className="input-text"
                        placeholder="https://example.com/song.mp3"
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
