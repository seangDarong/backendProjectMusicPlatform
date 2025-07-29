const API_BASE = 'http://localhost:3000/api/artists';

export async function getAllArtists(token) {
  const res = await fetch(`${API_BASE}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export async function getArtistById(artistId, token) {
  const res = await fetch(`${API_BASE}/${artistId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export async function getArtistAlbums(artistId, token) {
  const res = await fetch(`http://localhost:3000/api/albums/artist/${artistId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}
