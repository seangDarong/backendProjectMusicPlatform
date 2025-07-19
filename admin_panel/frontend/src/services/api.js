import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
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
    return axios.get('http://localhost:3000/roles')
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

export default api;