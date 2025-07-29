import React, { useState, useEffect } from 'react';
import { getArtistById, getArtistAlbums } from '../apis/artistApi';

export default function ArtistAlbums({ artistId, token, onBack, onSelectAlbum }) {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch artist details
    getArtistById(artistId, token).then(artist => {
      setArtist(artist);
      document.title = `${artist.name} - Music Platform`;
    });
    
    // Fetch artist's albums
    getArtistAlbums(artistId, token).then(setAlbums);
  }, [artistId, token]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh', color: '#4a4a4a' }}>
      <button 
        onClick={onBack} 
        style={{ 
          marginBottom: '2rem', 
          background: '#6b21a8', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 6, 
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#5b1a8b'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#6b21a8'}
      >
        ← Back to Artists
      </button>
      
      {artist && (
        <div style={{ 
          marginBottom: '2rem', 
          padding: '2rem', 
          background: 'linear-gradient(135deg, #f5f1fb 0%, #eae2f7 100%)', 
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          boxShadow: '0 8px 20px rgba(234, 226, 247, 0.4)',
          border: '1px solid #eae2f7'
        }}>
          {/* Large Artist Avatar */}
          <div style={{ 
            width: '150px', 
            height: '150px', 
            backgroundColor: '#eae2f7', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '4px solid #d1c4e9',
            boxShadow: '0 8px 20px rgba(234, 226, 247, 0.6)'
          }}>
            <div style={{ color: '#6b21a8', fontSize: '4rem' }}>🎤</div>
          </div>
          
          {/* Artist Info */}
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#6b21a8' }}>
              {artist.name}
            </div>
            {artist.country && (
              <div style={{ color: '#8b5cf6', fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🌍 {artist.country}
              </div>
            )}
            {artist.bio && (
              <div style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.6', maxWidth: '500px' }}>
                {artist.bio}
              </div>
            )}
            <div style={{ color: '#9c88d4', fontSize: '1rem', marginTop: '1rem' }}>
              {albums.length} {albums.length === 1 ? 'Album' : 'Albums'}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ color: '#6b21a8', marginBottom: '1rem', fontSize: '1.5rem' }}>
          Albums by {artist?.name || 'Artist'}
        </h3>
      </div>

      {albums.length > 0 ? (
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
                height: '200px',
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
                  color: '#9c88d4', 
                  fontSize: '0.8rem' 
                }}>
                  {album.release_date}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#8b5cf6', 
          padding: '4rem 2rem',
          fontSize: '1.1rem' 
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💿</div>
          <div>No albums found for this artist</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#9c88d4' }}>
            Albums by {artist?.name} will appear here
          </div>
        </div>
      )}
    </div>
  );
}
