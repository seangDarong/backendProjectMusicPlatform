import React, { useState, useEffect } from 'react';
import { getAllAlbums } from '../apis/albumApi';

export default function Albums({ token, onSelectAlbum }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    document.title = 'Albums - Music Platform';
    getAllAlbums(token).then(setAlbums);
  }, [token]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '2rem', fontSize: '2rem' }}>Albums</h2>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px' }}>
        {albums.map(album => (
          <li key={album.album_id} style={{ marginBottom: '1rem', border: '1px solid #ddd', borderRadius: 8, padding: '1.5rem', backgroundColor: '#f8f9fa', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2c3e50', marginBottom: '0.5rem' }}>{album.title}</div>
                <div style={{ color: '#666', fontSize: '1rem', marginBottom: '0.25rem' }}>
                  by {album.Artist?.name || 'Unknown Artist'}
                </div>
                <div style={{ color: '#7f8c8d', fontSize: '0.95rem' }}>{album.release_date}</div>
              </div>
              <button 
                onClick={() => onSelectAlbum(album.album_id)} 
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: 6, 
                  border: 'none', 
                  background: '#3498db', 
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
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
