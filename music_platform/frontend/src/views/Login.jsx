import React, { useState, useEffect } from 'react';
import { loginUser } from '../apis/userApi';

export default function Login({ onLogin, goToRegister, goToResetPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Login - Music Platform';
  }, []);

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
    <div
      style={{
        maxWidth: 400,
        margin: '3rem auto',
        fontFamily: 'sans-serif',
        background: '#f8f9fa',
        borderRadius: 8,
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <h2
        style={{
          color: '#2c3e50',
          marginBottom: '1.5rem',
          fontSize: '1.8rem',
          textAlign: 'center'
        }}
      >
        Music Platform
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            marginBottom: '0.25rem', // smaller margin for closer forgot link
            padding: '0.75rem',
            borderRadius: 6,
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        {/* Forgot password link */}
        <button
          type="button"
          onClick={goToResetPassword}
          style={{
            background: 'none',
            border: 'none',
            color: '#6b21a8',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '0.9rem',
            padding: 0,
            marginBottom: '1.5rem',
            display: 'block',
            textAlign: 'right',
            width: '100%'
          }}
        >
          Forgot password?
        </button>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#6b21a8',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
          onMouseLeave={e => (e.target.style.backgroundColor = '#6b21a8')}
        >
          Login
        </button>
      </form>
      <button
        onClick={goToRegister}
        style={{
          marginTop: '1rem',
          background: 'none',
          border: 'none',
          color: '#6b21a8',
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: '1rem',
          width: '100%',
          padding: '0.5rem'
        }}
      >
        Don't have an account? Register here
      </button>
      {error && (
        <div
          style={{
            color: '#e74c3c',
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#fdf2f2',
            border: '1px solid #fecaca',
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
