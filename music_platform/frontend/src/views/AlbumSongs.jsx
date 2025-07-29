import React, { useState, useEffect } from 'react';
import { getAlbumSongs } from '../apis/albumApi';
import { getUserPlaylists, addSongToPlaylist } from '../apis/playlistApi';

export default function AlbumSongs({ albumId, token, userId, onBack, onPlaySong }) {
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
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

  const handleAddToPlaylist = async () => {
    if (selectedSong && selectedPlaylist) {
      try {
        await addSongToPlaylist(selectedPlaylist, selectedSong, token);
        setStatus('Song added to playlist!');
        setSelectedSong(null);
        setSelectedPlaylist('');
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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#181818', minHeight: '100vh', color: 'white' }}>
      <button 
        onClick={onBack} 
        style={{ 
          marginBottom: '2rem', 
          background: '#333', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 6, 
          padding: '0.5rem 1rem',
          cursor: 'pointer'
        }}
      >
        ← Back to Albums
      </button>
      
      {album && (
        <div style={{ 
          marginBottom: '2rem', 
          padding: '2rem', 
          background: '#282828', 
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Large Album Cover */}
          <div style={{ 
            width: '200px', 
            height: '200px', 
            backgroundColor: '#333', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0
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
              <div style={{ color: '#666', fontSize: '4rem' }}>🎵</div>
            )}
          </div>
          
          {/* Album Info */}
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>
              {album.title}
            </div>
            <div style={{ color: '#b3b3b3', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              by {album.Artist?.name || 'Unknown Artist'}
            </div>
            <div style={{ color: '#888', fontSize: '1rem' }}>
              Released: {album.release_date}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Songs</h3>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map((song, index) => (
          <li 
            key={song.song_id} 
            style={{ 
              marginBottom: '0.5rem', 
              backgroundColor: '#282828', 
              borderRadius: 4, 
              padding: '0.75rem 1rem',
              transition: 'background-color 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#383838'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#282828'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                {/* Track Number */}
                <div style={{ 
                  width: '20px', 
                  color: '#888', 
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  {index + 1}
                </div>
                
                {/* Song Cover (smaller) */}
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#333', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0
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
                    <div style={{ color: '#666', fontSize: '1rem' }}>🎵</div>
                  )}
                </div>
                
                {/* Song Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.2rem', color: 'white' }}>
                    {song.title}
                  </div>
                  <div style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>
                    {song.Artist?.name || 'Unknown Artist'}
                  </div>
                </div>
                
                {/* Duration */}
                <div style={{ color: '#888', fontSize: '0.9rem', minWidth: '50px', textAlign: 'right' }}>
                  {formatDuration(song.duration_in_sec)}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => onPlaySong && onPlaySong(song, songs)} 
                  style={{ 
                    background: '#1DB954', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 20, 
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}
                >
                  ▶ Play
                </button>
                <button 
                  onClick={() => setSelectedSong(song.song_id)} 
                  style={{ 
                    background: '#535353', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 20, 
                    padding: '0.5rem 1rem',
                    cursor: 'pointer'
                  }}
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
          marginTop: '1.5rem', 
          padding: '1.5rem', 
          background: '#282828', 
          borderRadius: 8, 
          border: '1px solid #383838' 
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: 'white' }}>Add to Playlist</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select 
              value={selectedPlaylist} 
              onChange={e => setSelectedPlaylist(e.target.value)} 
              style={{ 
                padding: '0.5rem', 
                borderRadius: 4, 
                border: '1px solid #535353',
                backgroundColor: '#181818',
                color: 'white',
                flex: 1
              }}
            >
              <option value="">Select a playlist...</option>
              {playlists.map(pl => (
                <option key={pl.playlist_id} value={pl.playlist_id}>
                  {pl.title}
                </option>
              ))}
            </select>
            <button 
              onClick={handleAddToPlaylist}
              disabled={!selectedPlaylist}
              style={{ 
                background: selectedPlaylist ? '#1DB954' : '#535353', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 20, 
                padding: '0.5rem 1rem',
                cursor: selectedPlaylist ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              Add Song
            </button>
            <button 
              onClick={() => setSelectedSong(null)}
              style={{ 
                background: '#535353', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 20, 
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {status && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: status.includes('Error') || status.includes('already') ? '#5e2129' : '#1e4620', 
          color: status.includes('Error') || status.includes('already') ? '#f5c6cb' : '#d4edda', 
          border: `1px solid ${status.includes('Error') || status.includes('already') ? '#842029' : '#2ea043'}`, 
          borderRadius: 4, 
          fontWeight: 'bold' 
        }}>
          {status}
        </div>
      )}
    </div>
  );
}
