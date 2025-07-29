import React, { useState, useEffect } from 'react';
import { getUserPlaylists } from '../apis/playlistApi';

export default function UserPlaylists({ token, userId, refresh, onSelectPlaylist }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (userId && token) {
      getUserPlaylists(userId, token).then(data => {
        console.log('Fetched playlists:', data);
        setPlaylists(data);
      });
    }
  }, [userId, token, refresh]);

  return (
    <div style={{ padding: '0 2rem 2rem 2rem', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 120px)' }}>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px' }}>
        {playlists.map(pl => (
          <li key={pl.playlist_id} style={{ marginBottom: '1rem', border: '1px solid #eae2f7', borderRadius: 8, padding: '1.5rem', backgroundColor: '#f5f1fb', boxShadow: '0 2px 4px rgba(234, 226, 247, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2c3e50' }}>{pl.title}</span>
              <button 
                onClick={() => onSelectPlaylist(pl.playlist_id)} 
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: 6, 
                  border: 'none', 
                  background: '#6b21a8', 
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#9c88d4'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6b21a8'}
              >
                View Songs
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
