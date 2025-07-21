export async function addSongToPlaylist(playlistId, songId, token) {
  const res = await fetch(`${API_BASE}/playlists/${playlistId}/songs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ song_id: songId })
  });
  return res.json();
}
// API functions for playlist endpoints

const API_BASE = 'http://localhost:3000/api';

export async function getUserPlaylists(subscriberId, token) {
  const res = await fetch(`${API_BASE}/playlists/user/${subscriberId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function getPlaylistSongs(playlistId, token) {
  const res = await fetch(`${API_BASE}/playlists/${playlistId}/songs`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function removeSongFromPlaylist(playlistId, songId, token) {
  const res = await fetch(`${API_BASE}/playlists/${playlistId}/songs/${songId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function deletePlaylist(playlistId, token) {
  const res = await fetch(`${API_BASE}/playlists/${playlistId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function editPlaylist(playlistId, data, token) {
  const res = await fetch(`${API_BASE}/playlists/${playlistId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
