import { useParams, useNavigate } from "react-router-dom";
import { createArtist, updateArtist, fetchArtistById } from "../services/api";
import { useState, useEffect } from "react";

const ArtistForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchArtistById(id)
                .then((data) => {
                    setName(data.name);
                    setBio(data.bio || '');
                    setCountry(data.country);
                })
                .catch(() => setError('Failed to load artist.'));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { 
                name, 
                bio: bio || null,
                country
            };

            if (id) {
                await updateArtist(id, data);
            } else {
                await createArtist(data);
            }

            navigate('/'); // Navigate back to artist dashboard
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>{id ? 'Edit Artist' : 'Create Artist'}</h2>
                {error && <p className="form-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="title">Artist Name</label>
                    <input 
                        type="text" 
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="input-text"
                        placeholder="Enter artist name"
                    />

                    <label className="title">Country</label>
                    <input 
                        type="text" 
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        className="input-text"
                        placeholder="Enter country"
                    />

                    <label className="title">Bio (Optional)</label>
                    <textarea 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="input-text"
                        placeholder="Enter artist biography..."
                        rows="4"
                        style={{ resize: 'vertical', minHeight: '100px' }}
                    />

                    <button type="submit">{id ? 'Update Artist' : 'Create Artist'}</button>
                </form>
            </div>
        </div>
    );
};

export default ArtistForm;
