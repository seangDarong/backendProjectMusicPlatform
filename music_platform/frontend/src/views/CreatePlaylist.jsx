import React, { useState } from 'react';
import { editPlaylist } from '../apis/playlistApi';

export default function CreatePlaylist({ token, userId, onCreated }) {
  const [form, setForm] = useState({ title: '', description: '', is_public: true });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    // Use createPlaylist API (not editPlaylist)
    const res = await fetch('http://localhost:3000/api/playlists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...form })
    });
    const result = await res.json();
    if (result.playlist_id) {
      setStatus('Playlist created!');
      setTimeout(() => {
        setStatus('');
        onCreated();
      }, 1000);
    } else {
      setStatus(result.message || 'Error creating playlist');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif', background: '#f9f9f9', borderRadius: 8, padding: '1rem' }}>
      <h2>Create Playlist</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 10 }}>
          <input name="is_public" type="checkbox" checked={form.is_public} onChange={handleChange} /> Public
        </label>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Create</button>
      </form>
      {status && <div style={{ color: '#388e3c', marginTop: 10 }}>{status}</div>}
    </div>
  );
}
