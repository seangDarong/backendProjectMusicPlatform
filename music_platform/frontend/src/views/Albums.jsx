import React, { useState, useEffect } from 'react';
import { getAllAlbums } from '../apis/albumApi';

export default function Albums({ token, onSelectAlbum }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAllAlbums(token).then(setAlbums);
  }, [token]);

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Albums</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {albums.map(album => (
          <li key={album.album_id} style={{ marginBottom: '1rem', border: '1px solid #ccc', borderRadius: 8, padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{album.title}</span>
              <button onClick={() => onSelectAlbum(album.album_id)} style={{ padding: '0.3rem 1rem', borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff' }}>View Songs</button>
            </div>
            <div style={{ color: '#555', fontSize: '0.95rem' }}>{album.release_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
