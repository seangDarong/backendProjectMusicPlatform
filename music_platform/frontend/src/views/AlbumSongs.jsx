import React, { useState, useEffect } from 'react';
import { getAlbumSongs } from '../apis/albumApi';
import { getUserPlaylists, addSongToPlaylist } from '../apis/playlistApi';

export default function AlbumSongs({ albumId, token, userId, onBack }) {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    getAlbumSongs(albumId, token).then(setSongs);
    getUserPlaylists(userId, token).then(setPlaylists);
  }, [albumId, token, userId]);

  const handleAddToPlaylist = async () => {
    if (selectedSong && selectedPlaylist) {
      await addSongToPlaylist(selectedPlaylist, selectedSong, token);
      setStatus('Song added to playlist!');
      setSelectedSong(null);
      setSelectedPlaylist('');
      setTimeout(() => setStatus(''), 1500);
    }
  };

  return (
    <div style={{ background: '#f9f9f9', borderRadius: 8, padding: '1rem', marginTop: '2rem' }}>
      <button onClick={onBack} style={{ marginBottom: '1rem', background: '#aaa', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 1rem' }}>Back to Albums</button>
      <h3>Songs in Album</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map(song => (
          <li key={song.song_id} style={{ marginBottom: '0.7rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold' }}>{song.title}</span> <span style={{ color: '#555' }}>({song.duration_in_sec}s)</span>
            <button onClick={() => setSelectedSong(song.song_id)} style={{ marginLeft: '1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '0.2rem 0.7rem' }}>Add to Playlist</button>
          </li>
        ))}
      </ul>
      {selectedSong && (
        <div style={{ marginTop: '1rem' }}>
          <select value={selectedPlaylist} onChange={e => setSelectedPlaylist(e.target.value)} style={{ padding: 8, borderRadius: 4 }}>
            <option value="">Select Playlist</option>
            {playlists.map(pl => (
              <option key={pl.playlist_id} value={pl.playlist_id}>{pl.title}</option>
            ))}
          </select>
          <button onClick={handleAddToPlaylist} style={{ marginLeft: 10, background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 1rem' }}>Add</button>
        </div>
      )}
      {status && <div style={{ marginTop: '1rem', color: '#388e3c', fontWeight: 'bold' }}>{status}</div>}
    </div>
  );
}
