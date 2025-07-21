import React, { useState } from 'react';
import { loginUser } from '../apis/userApi';

export default function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const result = await loginUser(email, password);
    if (result.token && result.message === 'Login successful.') {
      onLogin(result.token, result.id || result.userId || result.subscriber_id);
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', fontFamily: 'sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Login</button>
      </form>
      <button onClick={goToRegister} style={{ marginTop: 15, background: 'none', border: 'none', color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}>Register</button>
      {error && <div style={{ color: '#d32f2f', marginTop: 10 }}>{error}</div>}
    </div>
  );
}
