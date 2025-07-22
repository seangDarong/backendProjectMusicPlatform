import React, { useEffect, useState } from 'react';

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    document.title = 'Profile - Music Platform';
    
    fetch('http://localhost:3000/api/users/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setProfile);
  }, [token]);

  if (!profile) return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ color: '#7f8c8d', fontSize: '1.2rem' }}>Loading profile...</div>
    </div>
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '2rem', fontSize: '2rem' }}>My Profile</h2>
      
      <div style={{ maxWidth: '600px', background: '#f8f9fa', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: 6, border: '1px solid #ddd' }}>
            <div style={{ minWidth: '120px', fontWeight: 'bold', color: '#2c3e50', fontSize: '1rem' }}>Username:</div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{profile.username}</div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: 6, border: '1px solid #ddd' }}>
            <div style={{ minWidth: '120px', fontWeight: 'bold', color: '#2c3e50', fontSize: '1rem' }}>Email:</div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{profile.email}</div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: 6, border: '1px solid #ddd' }}>
            <div style={{ minWidth: '120px', fontWeight: 'bold', color: '#2c3e50', fontSize: '1rem' }}>Full Name:</div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{profile.name}</div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: 6, border: '1px solid #ddd' }}>
            <div style={{ minWidth: '120px', fontWeight: 'bold', color: '#2c3e50', fontSize: '1rem' }}>Birthday:</div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{new Date(profile.dob).toLocaleDateString()}</div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: 6, border: '1px solid #ddd' }}>
            <div style={{ minWidth: '120px', fontWeight: 'bold', color: '#2c3e50', fontSize: '1rem' }}>Country:</div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{profile.country}</div>
          </div>
        </div>
        
        {/* Optional: Add some profile stats or actions */}
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e8f4fd', borderRadius: 6, border: '1px solid #bee5eb' }}>
          <div style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            🎵 Welcome to Music Platform!
          </div>
          <div style={{ color: '#5a6c7d', fontSize: '0.95rem' }}>
            Discover new music, create playlists, and enjoy your favorite songs.
          </div>
        </div>
      </div>
    </div>
  );
}
