const API_BASE = 'http://localhost:3000/api/albums';

export async function getAllAlbums(token) {
  const res = await fetch(`${API_BASE}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export async function getAlbumSongs(albumId, token) {
  const res = await fetch(`http://localhost:3000/api/albums/${albumId}/songs`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}
