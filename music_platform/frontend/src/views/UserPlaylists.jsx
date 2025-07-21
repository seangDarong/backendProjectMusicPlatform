import React, { useState, useEffect } from 'react';
import { getUserPlaylists } from '../apis/playlistApi';
import PlaylistSongs from './PlaylistSongs';

export default function UserPlaylists({ token, userId, refresh }) {
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (userId && token) {
      getUserPlaylists(userId, token).then(data => {
        console.log('Fetched playlists:', data);
        setPlaylists(data);
      });
    }
  }, [userId, token, refresh]);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>My Playlists</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {playlists.map(pl => (
          <li key={pl.playlist_id} style={{ marginBottom: '1rem', border: '1px solid #ccc', borderRadius: 8, padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{pl.title}</span>
              <button onClick={() => setSelected(pl.playlist_id)} style={{ padding: '0.3rem 1rem', borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff' }}>View Songs</button>
            </div>
            <div style={{ color: '#555', fontSize: '0.95rem' }}>{pl.description}</div>
          </li>
        ))}
      </ul>
      {selected && <PlaylistSongs playlistId={selected} token={token} onClose={() => setSelected(null)} />}
    </div>
  );
}
