import React, { useState, useEffect } from 'react';
import { getAllArtists } from '../apis/artistApi';

export default function Artists({ token, onSelectArtist }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    document.title = 'Artists - Music Platform';
    getAllArtists(token).then(setArtists);
  }, [token]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh', color: '#4a4a4a' }}>
      <h2 style={{ color: '#6b21a8', marginBottom: '2rem', fontSize: '2rem' }}>Artists</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '2rem', 
        maxWidth: '1200px' 
      }}>
        {artists.map(artist => (
          <div key={artist.artist_id} style={{ 
            backgroundColor: '#f5f1fb', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
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
          onClick={() => onSelectArtist(artist.artist_id)}
          >
            {/* Artist Avatar/Icon */}
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#eae2f7', 
              borderRadius: '50%', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #d1c4e9',
              boxShadow: '0 4px 12px rgba(234, 226, 247, 0.4)'
            }}>
              <div style={{ 
                color: '#6b21a8', 
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>
                🎤
              </div>
            </div>
            
            {/* Artist Info */}
            <div style={{ width: '100%' }}>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '1.1rem', 
                color: '#4a5568', 
                marginBottom: '0.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {artist.name}
              </div>
              {artist.country && (
                <div style={{ 
                  color: '#8b5cf6', 
                  fontSize: '0.9rem', 
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}>
                  🌍 {artist.country}
                </div>
              )}
              <div style={{ 
                color: '#9c88d4', 
                fontSize: '0.8rem',
                marginTop: '0.5rem'
              }}>
                View Albums →
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {artists.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#8b5cf6', 
          padding: '4rem 2rem',
          fontSize: '1.1rem' 
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎤</div>
          <div>No artists found</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#9c88d4' }}>
            Artists will appear here when albums are added
          </div>
        </div>
      )}
    </div>
  );
}
