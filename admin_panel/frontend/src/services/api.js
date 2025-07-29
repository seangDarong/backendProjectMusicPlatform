import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3002',
});

export const fetchRoles = async () => {
    const res = await api.get('/roles');
    return res.data;
};

export const fetchRoleById = async (id) => {
    const res = await api.get(`/roles/${id}`);
    return res.data;
};

export const fetchRolesWithPrivileges = async () => {
    return axios.get('http://localhost:3002/roles')
                .then(res => res.data)
                .catch(err => console.error('Error fetching roles.', err));
};

export const createRole = async (roledata) => {
    const res = await api.post('/roles', roledata);
    return res.data;
};

export const updateRole = async (id, roledata) => {
    const res = await api.put(`/roles/${id}`, roledata);
    return res.data;
};

export const deleteRole = async (id) => {
    const res = await api.delete(`/roles/${id}`);
    return res.data;
};

export const fetchUsers = async () => {
    const res= await api.get('/users');
    return res.data;
};

export const fetchUserById = async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};

export const createUser = async (userdata) => {
    const res = await api.post('/users', userdata);
    return res.data;
};

export const updateUser = async (id, userdata) => {
    const res = await api.put(`/users/${id}`, userdata);
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
};

export const fetchSongs = async () => {
    const res = await api.get('/songs');
    return res.data;
};

export const fetchSongById = async (id) => {
    const res = await api.get(`/songs/${id}`);
    return res.data;
};

export const createSong = async (songdata) => {
    const res = await api.post('/songs', songdata);
    return res.data;
};

export const updateSong = async (id, songdata) => {
    const res = await api.put(`/songs/${id}`, songdata);
    return res.data;
};

export const deleteSong = async (id) => {
    const res = await api.delete(`/songs/${id}`);
    return res.data;
};

export const fetchAlbumDetail = async (id) => {
    const response = await fetch(`http://localhost:3002/albums/${id}`);
    if (!response.ok) throw new Error("Failed to fetch album details");
    return response.json();
};

export const fetchAlbums = async () => {
    const res = await api.get('/albums');
    return res.data;
};

export const fetchAlbumById = async (id) => {
    const res = await api.get(`/albums/${id}`);
    return res.data;
};

export const createAlbum = async (albumdata) => {
    const res = await api.post('/albums', albumdata);
    return res.data;
};

export const updateAlbum = async (id, albumdata) => {
    const res = await api.put(`/albums/${id}`, albumdata);
    return res.data;
};

export const deleteAlbum = async (id) => {
    const res = await api.delete(`/albums/${id}`);
    return res.data;
};

export const fetchArtistDetail = async (id) => {
    const response = await fetch(`http://localhost:3002/artists/${id}`);
    if (!response.ok) throw new Error("Failed to fetch artist details");
    return response.json();
};

export const fetchArtists = async () => {
    const res = await api.get('/artists');
    return res.data;
};

export const fetchArtistById = async (id) => {
    const res = await api.get(`/artists/${id}`);
    return res.data;
};

export const createArtist = async (artistdata) => {
    const res = await api.post('/artists', artistdata);
    return res.data;
};

export const updateArtist = async (id, artistdata) => {
    const res = await api.put(`/artists/${id}`, artistdata);
    return res.data;
};

export const deleteArtist = async (id) => {
    const res = await api.delete(`/artists/${id}`);
    return res.data;
};

export default api;