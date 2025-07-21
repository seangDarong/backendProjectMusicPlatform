import React, { useState } from 'react';
import { registerUser } from '../apis/userApi';

export default function Register({ goToLogin }) {
  const [form, setForm] = useState({ username: '', email: '', password: '', name: '', dob: '', country: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    <div style={{ maxWidth: 400, margin: '3rem auto', fontFamily: 'sans-serif' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="dob" type="date" placeholder="Date of Birth" value={form.dob} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4 }}>Register</button>
      </form>
      <button onClick={goToLogin} style={{ marginTop: 15, background: 'none', border: 'none', color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}>Back to Login</button>
      {error && <div style={{ color: '#d32f2f', marginTop: 10 }}>{error}</div>}
      {success && <div style={{ color: '#388e3c', marginTop: 10 }}>{success}</div>}
    </div>
  );
}
