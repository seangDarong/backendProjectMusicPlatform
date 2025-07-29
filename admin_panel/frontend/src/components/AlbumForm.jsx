import { useParams, useNavigate, useLocation } from "react-router-dom";
import { createAlbum, updateAlbum, fetchAlbumById, fetchArtistDetail } from "../services/api";
import { useState, useEffect } from "react";

const AlbumForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const initialArtistId = queryParams.get("artistId");

    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [artistId, setArtistId] = useState(initialArtistId || '');
    const [artistName, setArtistName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // If we have an artistId from URL params, fetch artist details
        if (artistId && !id) {
            fetchArtistDetail(artistId)
                .then(artist => setArtistName(artist.name))
                .catch(() => setError("Failed to fetch artist details"));
        }

        // If editing existing album, fetch album data
        if (id) {
            fetchAlbumById(id)
                .then((data) => {
                    setTitle(data.title);
                    setReleaseDate(data.release_date);
                    setCoverImageUrl(data.cover_image_url || '');
                    setArtistId(data.artist_id);
                    // Also fetch artist name for display
                    return fetchArtistDetail(data.artist_id);
                })
                .then(artist => setArtistName(artist.name))
                .catch(() => setError('Failed to load album.'));
        }
    }, [id, artistId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { 
                title, 
                release_date: releaseDate, 
                artist_id: parseInt(artistId),
                cover_image_url: coverImageUrl || null
            };

            if (id) {
                await updateAlbum(id, data);
            } else {
                await createAlbum(data);
            }

            navigate(`/artists/${artistId}`);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>{id ? 'Edit Album' : 'Create New Album'}</h2>
                {artistName && (
                    <p style={{ marginBottom: '1rem', color: '#666' }}>
                        Artist: <strong>{artistName}</strong>
                    </p>
                )}
                {error && <p className="form-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="title">Album Title</label>
                    <input 
                        type="text" 
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-text"
                        placeholder="Enter album title"
                    />

                    <label className="title">Release Date</label>
                    <input 
                        type="date" 
                        value={releaseDate}
                        required
                        onChange={(e) => setReleaseDate(e.target.value)}
                        className="input-text"
                    />

                    <label className="title">Cover Image URL (Optional)</label>
                    <input 
                        type="url" 
                        value={coverImageUrl}
                        onChange={(e) => setCoverImageUrl(e.target.value)}
                        className="input-text"
                        placeholder="https://example.com/album-cover.jpg"
                    />

                    {coverImageUrl && (
                        <div style={{ margin: '1rem 0' }}>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Preview:</p>
                            <img 
                                src={coverImageUrl} 
                                alt="Album cover preview" 
                                style={{ 
                                    maxWidth: '150px', 
                                    maxHeight: '150px', 
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    <div className="form-buttons">
                        <button type="submit" className="button-primary">
                            {id ? 'Update Album' : 'Create Album'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate(`/artists/${artistId}`)}
                            className="button-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AlbumForm;