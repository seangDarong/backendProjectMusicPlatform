    import React, { useState, useEffect } from 'react';
    import { resetPasswordUser } from '../apis/userApi'; // You need to create this API call

    export default function ResetPassword({ goToLogin }) {
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');
    const [name, setName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        document.title = 'Reset Password - Music Platform';
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic client-side validation
        if (!username || !dob || !name || !newPassword) {
        setError('Please fill all fields.');
        return;
        }
        if (newPassword.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
        }

        const result = await resetPasswordUser({ username, dob, name, newPassword });
        if (result.message === 'Password reset successfully.') {
        setSuccess('Password reset successfully. You can now log in.');
        setUsername('');
        setDob('');
        setName('');
        setNewPassword('');
        } else {
        setError(result.message || 'Password reset failed.');
        }
    };

    return (
        <div style={{
        maxWidth: 400,
        margin: '3rem auto',
        fontFamily: 'sans-serif',
        background: '#f8f9fa',
        borderRadius: 8,
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '1.8rem', textAlign: 'center' }}>
            Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={inputStyle}
            />
            <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={e => setDob(e.target.value)}
            required
            style={inputStyle}
            />
            <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={inputStyle}
            />
            <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
            Reset Password
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
            padding: '0.5rem',
            }}
        >
            Back to Login
        </button>

        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
        </div>
    );
    }

    const inputStyle = {
    width: '100%',
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: 6,
    border: '1px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box'
    };

    const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#e67e22',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
    };

    const errorStyle = {
    color: '#e74c3c',
    marginTop: '1rem',
    padding: '0.75rem',
    background: '#fdf2f2',
    border: '1px solid #fecaca',
    borderRadius: 4,
    textAlign: 'center'
    };

    const successStyle = {
    color: '#27ae60',
    marginTop: '1rem',
    padding: '0.75rem',
    background: '#d4f5d4',
    border: '1px solid #a3dca3',
    borderRadius: 4,
    textAlign: 'center'
    };
