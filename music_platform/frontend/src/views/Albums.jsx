import React, { useState, useEffect } from 'react';
import { getAllAlbums } from '../apis/albumApi';

export default function Albums({ token, onSelectAlbum }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    document.title = 'Albums - Music Platform';
    getAllAlbums(token).then(setAlbums);
  }, [token]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#181818', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '2rem' }}>Albums</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '2rem', 
        maxWidth: '1200px' 
      }}>
        {albums.map(album => (
          <div key={album.album_id} style={{ 
            backgroundColor: '#282828', 
            borderRadius: '8px', 
            padding: '1rem', 
            transition: 'background-color 0.2s',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#383838'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#282828'}
          onClick={() => onSelectAlbum(album.album_id)}
          >
            {/* Album Cover */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '1/1', 
              backgroundColor: '#333', 
              borderRadius: '4px', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {album.cover_image_url ? (
                <img 
                  src={album.cover_image_url} 
                  alt={`${album.title} cover`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              ) : (
                <div style={{ 
                  color: '#666', 
                  fontSize: '3rem',
                  textAlign: 'center'
                }}>
                  🎵
                </div>
              )}
            </div>
            
            {/* Album Info */}
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '1rem', 
                color: 'white', 
                marginBottom: '0.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {album.title}
              </div>
              <div style={{ 
                color: '#b3b3b3', 
                fontSize: '0.875rem', 
                marginBottom: '0.25rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {album.Artist?.name || 'Unknown Artist'}
              </div>
              <div style={{ 
                color: '#888', 
                fontSize: '0.8rem' 
              }}>
                {album.release_date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
