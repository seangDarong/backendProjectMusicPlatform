import React, { useState, useEffect } from 'react';
import { getPlaylistSongs, removeSongFromPlaylist, deletePlaylist } from '../apis/playlistApi';

export default function PlaylistSongs({ playlistId, token, onClose }) {
  const [songs, setSongs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    getPlaylistSongs(playlistId, token).then(setSongs);
  }, [playlistId, token]);

  const handleRemove = async (songId) => {
    await removeSongFromPlaylist(playlistId, songId, token);
    setSongs(songs.filter(s => s.song_id !== songId));
    setStatus('Song removed!');
  };

  const handleDeletePlaylist = async () => {
    await deletePlaylist(playlistId, token);
    setStatus('Playlist deleted!');
    onClose();
  };

  return (
    <div style={{ background: '#f9f9f9', borderRadius: 8, padding: '1rem', marginTop: '2rem' }}>
      <h3>Songs in Playlist</h3>
      <button onClick={onClose} style={{ float: 'right', marginBottom: '1rem', background: '#aaa', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 1rem' }}>Close</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map(song => (
          <li key={song.song_id} style={{ marginBottom: '0.7rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold' }}>{song.title}</span> <span style={{ color: '#555' }}>({song.duration_in_sec}s)</span>
            <button onClick={() => handleRemove(song.song_id)} style={{ marginLeft: '1rem', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.2rem 0.7rem' }}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleDeletePlaylist} style={{ marginTop: '1rem', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem' }}>Delete Playlist</button>
      {status && <div style={{ marginTop: '1rem', color: '#388e3c', fontWeight: 'bold' }}>{status}</div>}
    </div>
  );
}
