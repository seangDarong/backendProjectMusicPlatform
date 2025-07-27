import React, { useState, useEffect } from 'react';
import { registerUser } from '../apis/userApi';

export default function Register({ goToLogin }) {
  const [form, setForm] = useState({ username: '', email: '', password: '', name: '', dob: '', country: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    document.title = 'Register - Music Platform';
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const result = await registerUser(form);
    if (result.message === 'User registered successfully.') {
      setSuccess('Registration successful! Please login.');
      setTimeout(goToLogin, 1500);
    } else {
      setError(result.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', fontFamily: 'sans-serif', background: '#f8f9fa', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '1.8rem', textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="username" 
          placeholder="Username" 
          value={form.username} 
          onChange={handleChange} 
          required 
          style={{ 
            width: '100%', 
            marginBottom: '1rem', 
            padding: '0.75rem', 
            borderRadius: 6, 
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }} 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          style={{ 
            width: '100%', 
            marginBottom: '1rem', 
            padding: '0.75rem', 
            borderRadius: 6, 
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }} 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          required 
          style={{ 
            width: '100%', 
            marginBottom: '1rem', 
            padding: '0.75rem', 
            borderRadius: 6, 
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }} 
        />
        <input 
          name="name" 
          placeholder="Name" 
          value={form.name} 
          onChange={handleChange} 
          required 
          style={{ 
            width: '100%', 
            marginBottom: '1rem', 
            padding: '0.75rem', 
            borderRadius: 6, 
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }} 
        />
        <input 
          name="dob" 
          type="date" 
          placeholder="Date of Birth" 
          value={form.dob} 
          onChange={handleChange} 
          required 
          style={{ 
            width: '100%', 
            marginBottom: '1rem', 
            padding: '0.75rem', 
            borderRadius: 6, 
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }} 
        />
        <input 
          name="country" 
          placeholder="Country" 
          value={form.country} 
          onChange={handleChange} 
          required 
          style={{ 
            width: '100%', 
            marginBottom: '1.5rem', 
            padding: '0.75rem', 
            borderRadius: 6, 
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }} 
        />
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            background: '#27ae60', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 6,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
        >
          Register
        </button>
      </form>
      <button 
        onClick={goToLogin} 
        style={{ 
          marginTop: '1rem', 
          background: 'none', 
          border: 'none', 
          color: '#3498db', 
          textDecoration: 'underline', 
          cursor: 'pointer',
          fontSize: '1rem',
          width: '100%',
          padding: '0.5rem'
        }}
      >
        Already have an account? Login here
      </button>
      {error && <div style={{ color: '#e74c3c', marginTop: '1rem', padding: '0.75rem', background: '#fdf2f2', border: '1px solid #fecaca', borderRadius: 4, textAlign: 'center' }}>{error}</div>}
      {success && <div style={{ color: '#27ae60', marginTop: '1rem', padding: '0.75rem', background: '#f0f9f4', border: '1px solid #a7f3d0', borderRadius: 4, textAlign: 'center' }}>{success}</div>}
    </div>
  );
}
