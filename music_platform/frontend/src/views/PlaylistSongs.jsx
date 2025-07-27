import React, { useState, useEffect } from 'react';
import { getPlaylistSongs, removeSongFromPlaylist, deletePlaylist, editPlaylist } from '../apis/playlistApi';

export default function PlaylistSongs({ playlistId, token, onClose, onPlaySong }) {
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [status, setStatus] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    // Fetch playlist songs
    getPlaylistSongs(playlistId, token).then(setSongs);
    
    // Fetch playlist details to get the title
    fetch(`http://localhost:3000/api/playlists/${playlistId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setPlaylist(data);
      setEditTitle(data.title || '');
      setEditDescription(data.description || '');
      document.title = `${data.title} - Music Platform`;
    })
    .catch(err => {
      console.error('Error fetching playlist:', err);
      // Set a fallback playlist object so the UI still works
      setPlaylist({ title: 'Unknown Playlist', description: '' });
      document.title = 'Playlist Songs - Music Platform';
    });
  }, [playlistId, token]);

  const handleRemove = async (songId) => {
    await removeSongFromPlaylist(playlistId, songId, token);
    setSongs(songs.filter(s => s.song_id !== songId));
    setStatus('Song removed from playlist!');
    setTimeout(() => setStatus(''), 2000);
  };

  const handleDeletePlaylist = async () => {
    await deletePlaylist(playlistId, token);
    setStatus('Playlist deleted!');
    setTimeout(() => onClose(), 1000);
  };

  const handleEditPlaylist = async () => {
    try {
      await editPlaylist(playlistId, {
        title: editTitle,
        description: editDescription
      }, token);
      setPlaylist(prev => ({
        ...prev,
        title: editTitle,
        description: editDescription
      }));
      setIsEditing(false);
      setStatus('Playlist updated successfully!');
      setTimeout(() => setStatus(''), 2000);
    } catch (error) {
      setStatus('Error updating playlist');
      setTimeout(() => setStatus(''), 2000);
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
        onClick={onClose} 
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
        ← Back to Playlists
      </button>
      
      {playlist && (
        <div style={{ 
          marginBottom: '1.5rem', 
          padding: '1rem', 
          background: '#f5f5f5', 
          borderRadius: 8,
          border: '1px solid #ddd'
        }}>
          {!isEditing ? (
            <>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {playlist.title}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {playlist.description || 'No description'}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => setIsEditing(true)}
                  style={{ 
                    background: '#1976d2', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 4, 
                    padding: '0.5rem 1rem',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  style={{ 
                    background: '#d32f2f', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 4, 
                    padding: '0.5rem 1rem',
                    cursor: 'pointer'
                  }}
                >
                  Delete Playlist
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Playlist Name:
                </label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem', 
                    borderRadius: 4, 
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Description:
                </label>
                <textarea 
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem', 
                    borderRadius: 4, 
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={handleEditPlaylist}
                  style={{ 
                    background: '#388e3c', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 4, 
                    padding: '0.5rem 1rem',
                    cursor: 'pointer'
                  }}
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(playlist.title || '');
                    setEditDescription(playlist.description || '');
                  }}
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
            </>
          )}
        </div>
      )}

      {songs.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: '#666',
          background: '#f9f9f9',
          borderRadius: 8,
          border: '1px solid #ddd'
        }}>
          No songs in this playlist yet.
        </div>
      ) : (
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
                    onClick={() => handleRemove(song.song_id)} 
                    style={{ 
                      background: '#d32f2f', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: 4, 
                      padding: '0.5rem 1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: 8,
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#d32f2f' }}>
              Delete Playlist
            </h3>
            <p style={{ margin: '0 0 1.5rem 0' }}>
              Are you sure you want to delete "{playlist?.title}"? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                style={{ 
                  background: '#666', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 4, 
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                No, Cancel
              </button>
              <button 
                onClick={handleDeletePlaylist}
                style={{ 
                  background: '#d32f2f', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 4, 
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {status && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: status.includes('deleted') || status.includes('Error') ? '#f8d7da' : '#d4edda', 
          color: status.includes('deleted') || status.includes('Error') ? '#721c24' : '#155724', 
          border: `1px solid ${status.includes('deleted') || status.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`, 
          borderRadius: 4, 
          fontWeight: 'bold' 
        }}>
          {status}
        </div>
      )}
    </div>
  );
}
