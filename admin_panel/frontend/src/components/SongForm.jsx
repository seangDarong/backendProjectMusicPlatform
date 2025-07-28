import { useState, useEffect } from "react";
import { createSong, updateSong, fetchUserById } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
const SongForm = () => {
    const { id } = useParams();
    

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>{id ? 'Edit song' : 'Create song'}</h2>
                {error && <p className="form-error">{error}</p>}

                <form>

                </form>
            </div>
        </div>
    );
};

export default SongForm;