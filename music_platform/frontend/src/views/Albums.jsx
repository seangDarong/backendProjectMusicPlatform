import React, { useState, useEffect } from 'react';
import { getAllAlbums } from '../apis/albumApi';

export default function Albums({ token, onSelectAlbum }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    document.title = 'Albums - Music Platform';
    getAllAlbums(token).then(setAlbums);
  }, [token]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh', color: '#4a4a4a' }}>
      <h2 style={{ color: '#6b21a8', marginBottom: '2rem', fontSize: '2rem' }}>Albums</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '2rem', 
        maxWidth: '1200px' 
      }}>
        {albums.map(album => (
          <div key={album.album_id} style={{ 
            backgroundColor: '#f5f1fb', 
            borderRadius: '12px', 
            padding: '1.2rem', 
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 12px rgba(234, 226, 247, 0.6)',
            border: '1px solid #eae2f7'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#eae2f7';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(234, 226, 247, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f1fb';
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(234, 226, 247, 0.6)';
          }}
          onClick={() => onSelectAlbum(album.album_id)}
          >
            {/* Album Cover */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '1/1', 
              backgroundColor: '#eae2f7', 
              borderRadius: '8px', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid #d1c4e9'
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
                  color: '#9c88d4', 
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
                color: '#4a5568', 
                marginBottom: '0.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {album.title}
              </div>
              <div style={{ 
                color: '#6b46c1', 
                fontSize: '0.875rem', 
                marginBottom: '0.25rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {album.Artist?.name || 'Unknown Artist'}
              </div>
              <div style={{ 
                color: '#9c88d4', 
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
