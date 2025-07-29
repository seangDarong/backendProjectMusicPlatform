import React, { useState, useEffect } from 'react';
import { getAlbumSongs } from '../apis/albumApi';
import { getUserPlaylists, addSongToPlaylist } from '../apis/playlistApi';

export default function AlbumSongs({ albumId, token, userId, onBack, onPlaySong }) {
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch album songs
    getAlbumSongs(albumId, token).then(setSongs);
    
    // Fetch album details to get the title
    fetch(`http://localhost:3000/api/albums/${albumId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(album => {
      setAlbum(album);
      document.title = `${album.title} - Music Platform`;
    })
    .catch(err => {
      console.error('Error fetching album:', err);
      document.title = 'Album Songs - Music Platform';
    });
    
    // Fetch user playlists
    getUserPlaylists(userId, token).then(setPlaylists);
  }, [albumId, token, userId]);

  const handleAddToPlaylist = async (playlistId) => {
    if (selectedSong && playlistId) {
      try {
        await addSongToPlaylist(playlistId, selectedSong, token);
        setStatus('Song added to playlist!');
        setSelectedSong(null);
        setTimeout(() => setStatus(''), 2000);
      } catch (error) {
        setStatus(error.message || 'Error adding song to playlist');
        setTimeout(() => setStatus(''), 3000);
      }
    }
  };

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        ← Back to Albums
      </button>
      
      {album && (
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
          {/* Large Album Cover */}
          <div style={{ 
            width: '200px', 
            height: '200px', 
            backgroundColor: '#eae2f7', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid #d1c4e9',
            boxShadow: '0 4px 12px rgba(234, 226, 247, 0.6)'
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
              <div style={{ color: '#9c88d4', fontSize: '4rem' }}>🎵</div>
            )}
          </div>
          
          {/* Album Info */}
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#6b21a8' }}>
              {album.title}
            </div>
            <div style={{ color: '#8b5cf6', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              by {album.Artist?.name || 'Unknown Artist'}
            </div>
            <div style={{ color: '#9c88d4', fontSize: '1rem' }}>
              Released: {album.release_date}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ color: '#6b21a8', marginBottom: '1rem', fontSize: '1.5rem' }}>Songs</h3>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map((song, index) => (
          <li 
            key={song.song_id} 
            style={{ 
              marginBottom: '0.5rem', 
              backgroundColor: '#f5f1fb', 
              borderRadius: 8, 
              padding: '0.75rem 1rem',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              border: '1px solid #eae2f7'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#eae2f7';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f1fb';
              e.currentTarget.style.transform = 'translateX(0px)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                {/* Track Number */}
                <div style={{ 
                  width: '20px', 
                  color: '#9c88d4', 
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  {index + 1}
                </div>
                
                {/* Song Cover (smaller) */}
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#eae2f7', 
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid #d1c4e9'
                }}>
                  {song.cover_image_url || album?.cover_image_url ? (
                    <img 
                      src={song.cover_image_url || album?.cover_image_url} 
                      alt={`${song.title} cover`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  ) : (
                    <div style={{ color: '#9c88d4', fontSize: '1rem' }}>🎵</div>
                  )}
                </div>
                
                {/* Song Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.2rem', color: '#4a5568' }}>
                    {song.title}
                  </div>
                  <div style={{ color: '#8b5cf6', fontSize: '0.9rem' }}>
                    {song.Artist?.name || 'Unknown Artist'}
                  </div>
                </div>
                
                {/* Duration */}
                <div style={{ color: '#9c88d4', fontSize: '0.9rem', minWidth: '50px', textAlign: 'right' }}>
                  {formatDuration(song.duration_in_sec)}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => onPlaySong && onPlaySong(song, songs)} 
                  style={{ 
                    background: '#6b21a8', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 20, 
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5b1a8b'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6b21a8'}
                >
                  ▶ Play
                </button>
                <button 
                  onClick={() => setSelectedSong(song.song_id)} 
                  style={{ 
                    background: '#8b5cf6', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 20, 
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8b5cf6'}
                >
                  Add to Playlist
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedSong && (
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(107, 33, 168, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f1fb 100%)', 
            borderRadius: 12, 
            padding: '1.5rem',
            minWidth: '400px',
            maxWidth: '500px',
            maxHeight: '80vh',
            border: '2px solid #eae2f7',
            boxShadow: '0 20px 40px rgba(234, 226, 247, 0.8)',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#6b21a8' }}>Add to playlist</h3>
              <button 
                onClick={() => setSelectedSong(null)}
                style={{ 
                  background: 'transparent', 
                  color: '#9c88d4', 
                  border: 'none', 
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                ✕
              </button>
            </div>
            
            {playlists.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                color: '#8b5cf6', 
                padding: '2rem 1rem' 
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                <div>No playlists found</div>
                <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#9c88d4' }}>
                  Create a playlist first to add songs
                </div>
              </div>
            ) : (
              <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                {playlists.map(playlist => (
                  <div 
                    key={playlist.playlist_id}
                    onClick={() => handleAddToPlaylist(playlist.playlist_id)}
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eae2f7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {/* Playlist Icon */}
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: '#6b21a8', 
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{ color: 'white', fontSize: '1.2rem' }}>📋</span>
                    </div>
                    
                    {/* Playlist Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        color: '#4a5568', 
                        fontWeight: 'bold', 
                        fontSize: '1rem',
                        marginBottom: '0.2rem'
                      }}>
                        {playlist.title}
                      </div>
                      <div style={{ 
                        color: '#8b5cf6', 
                        fontSize: '0.9rem' 
                      }}>
                        {playlist.description || 'No description'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {status && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: status.includes('Error') || status.includes('already') ? '#fef2f2' : '#f0fdf4', 
          color: status.includes('Error') || status.includes('already') ? '#dc2626' : '#16a34a', 
          border: `1px solid ${status.includes('Error') || status.includes('already') ? '#fecaca' : '#bbf7d0'}`, 
          borderRadius: 8, 
          fontWeight: 'bold' 
        }}>
          {status}
        </div>
      )}
    </div>
  );
}
