import React, { useEffect, useState } from 'react';

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/users/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setProfile);
  }, [token]);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif', background: '#f9f9f9', borderRadius: 8, padding: '1rem' }}>
      <h2>Profile</h2>
      <div><strong>Username:</strong> {profile.username}</div>
      <div><strong>Email:</strong> {profile.email}</div>
      <div><strong>Name:</strong> {profile.name}</div>
      <div><strong>Date of Birth:</strong> {profile.dob}</div>
      <div><strong>Country:</strong> {profile.country}</div>
    </div>
  );
}
