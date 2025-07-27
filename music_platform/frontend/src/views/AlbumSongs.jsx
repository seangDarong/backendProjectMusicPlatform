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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
      <button 
        onClick={onBack} 
        style={{ 
          marginBottom: '2rem', 
          background: '#95a5a6', 
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
          marginBottom: '1.5rem', 
          padding: '1rem', 
          background: '#f5f5f5', 
          borderRadius: 8,
          border: '1px solid #ddd'
        }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {album.title}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            Released: {album.release_date}
          </div>
        </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map(song => (
          <li 
            key={song.song_id} 
            style={{ 
              marginBottom: '1rem', 
              border: '1px solid #ccc', 
              borderRadius: 8, 
              padding: '1rem' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                  {song.title}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                  by {song.Artist?.name || 'Unknown Artist'}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  Duration: {formatDuration(song.duration_in_sec)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => onPlaySong && onPlaySong(song, songs)} 
                  style={{ 
                    background: '#27ae60', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 4, 
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  ▶ Play
                </button>
                <button 
                  onClick={() => setSelectedSong(song.song_id)} 
                  style={{ 
                    background: '#1976d2', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 4, 
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
          padding: '1rem', 
          background: '#f0f8ff', 
          borderRadius: 8, 
          border: '1px solid #cce7ff' 
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Add to Playlist</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select 
              value={selectedPlaylist} 
              onChange={e => setSelectedPlaylist(e.target.value)} 
              style={{ 
                padding: '0.5rem', 
                borderRadius: 4, 
                border: '1px solid #ccc',
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
                background: selectedPlaylist ? '#388e3c' : '#ccc', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 4, 
                padding: '0.5rem 1rem',
                cursor: selectedPlaylist ? 'pointer' : 'not-allowed'
              }}
            >
              Add Song
            </button>
            <button 
              onClick={() => setSelectedSong(null)}
              style={{ 
                background: '#666', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 4, 
                padding: '0.5rem 1rem',
                cursor: 'pointer'
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
          background: status.includes('Error') || status.includes('already') ? '#f8d7da' : '#d4edda', 
          color: status.includes('Error') || status.includes('already') ? '#721c24' : '#155724', 
          border: `1px solid ${status.includes('Error') || status.includes('already') ? '#f5c6cb' : '#c3e6cb'}`, 
          borderRadius: 4, 
          fontWeight: 'bold' 
        }}>
          {status}
        </div>
      )}
    </div>
  );
}
