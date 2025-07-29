import React, { useState, useEffect } from 'react';
import { editPlaylist } from '../apis/playlistApi';

export default function CreatePlaylist({ token, userId, onCreated }) {
  const [form, setForm] = useState({ title: '', description: '', is_public: true });
  const [status, setStatus] = useState('');

  useEffect(() => {
    document.title = 'Create Playlist - Music Platform';
  }, []);

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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '2rem', fontSize: '2rem' }}>Create New Playlist</h2>
      
      <div style={{ maxWidth: '600px', background: '#f8f9fa', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50', fontSize: '1rem' }}>
              Playlist Title *
            </label>
            <input 
              name="title" 
              placeholder="Enter playlist title" 
              value={form.title} 
              onChange={handleChange} 
              required 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: 6, 
                border: '1px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }} 
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50', fontSize: '1rem' }}>
              Description
            </label>
            <textarea 
              name="description" 
              placeholder="Describe your playlist (optional)" 
              value={form.description} 
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: 6, 
                border: '1px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box',
                minHeight: '80px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }} 
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1rem', color: '#2c3e50' }}>
              <input 
                name="is_public" 
                type="checkbox" 
                checked={form.is_public} 
                onChange={handleChange}
                style={{ marginRight: '0.5rem', transform: 'scale(1.2)' }}
              /> 
              <span style={{ fontWeight: 'bold' }}>Make this playlist public</span>
            </label>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7f8c8d', marginLeft: '1.5rem' }}>
              Public playlists can be discovered and viewed by other users
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              style={{ 
                flex: 1,
                padding: '0.75rem 1.5rem', 
                background: '#6b21a8', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 6,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#8b5cf6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6b21a8'}
            >
              Create Playlist
            </button>
            <button 
              type="button"
              onClick={() => onCreated()}
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: '#8b5cf6', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 6,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7f8c8d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8b5cf6'}
            >
              Cancel
            </button>
          </div>
        </form>
        
        {status && (
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '0.75rem', 
            background: status.includes('Error') ? '#fdf2f2' : '#f0f9f4', 
            color: status.includes('Error') ? '#dc2626' : '#6b21a8', 
            border: `1px solid ${status.includes('Error') ? '#fecaca' : '#a7f3d0'}`, 
            borderRadius: 6, 
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
