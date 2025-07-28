import React, { useEffect, useState } from 'react';

export default function Profile({ token, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = 'Profile - Music Platform';

    fetch('http://localhost:3000/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Profile data:', data);
        setProfile(data);
      });
  }, [token]);

  const handleGoPremium = () => {
    alert('Redirecting to payment flow or upgrade API call here');
  };

  const handleDeactivate = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to deactivate your account? This action is permanent and cannot be undone.'
    );
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch('http://localhost:3000/api/users/deactivate', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert('Your account has been deactivated and deleted permanently.');
        onLogout(); // log the user out after deletion
      } else {
        const data = await res.json();
        alert('Failed to deactivate account: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error deactivating account: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!profile) {
    return (
      <div
        style={{
          padding: '2rem',
          fontFamily: 'sans-serif',
          backgroundColor: '#fff',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ color: '#7f8c8d', fontSize: '1.2rem' }}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        backgroundColor: '#fff',
        minHeight: '100vh',
      }}
    >
      <h2
        style={{
          color: '#2c3e50',
          marginBottom: '2rem',
          fontSize: '2rem',
        }}
      >
        My Profile
      </h2>

      <div
        style={{
          maxWidth: '600px',
          background: '#f8f9fa',
          borderRadius: 8,
          padding: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Username */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: '#fff',
              borderRadius: 6,
              border: '1px solid #ddd',
            }}
          >
            <div
              style={{
                minWidth: '120px',
                fontWeight: 'bold',
                color: '#2c3e50',
                fontSize: '1rem',
              }}
            >
              Username:
            </div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{profile.username}</div>
          </div>

          {/* Email */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: '#fff',
              borderRadius: 6,
              border: '1px solid #ddd',
            }}
          >
            <div
              style={{
                minWidth: '120px',
                fontWeight: 'bold',
                color: '#2c3e50',
                fontSize: '1rem',
              }}
            >
              Email:
            </div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{profile.email}</div>
          </div>

          {/* Full Name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: '#fff',
              borderRadius: 6,
              border: '1px solid #ddd',
            }}
          >
            <div
              style={{
                minWidth: '120px',
                fontWeight: 'bold',
                color: '#2c3e50',
                fontSize: '1rem',
              }}
            >
              Full Name:
            </div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{profile.name}</div>
          </div>

          {/* Birthday */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: '#fff',
              borderRadius: 6,
              border: '1px solid #ddd',
            }}
          >
            <div
              style={{
                minWidth: '120px',
                fontWeight: 'bold',
                color: '#2c3e50',
                fontSize: '1rem',
              }}
            >
              Birthday:
            </div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>
              {new Date(profile.dob).toLocaleDateString()}
            </div>
          </div>

          {/* Country */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: '#fff',
              borderRadius: 6,
              border: '1px solid #ddd',
            }}
          >
            <div
              style={{
                minWidth: '120px',
                fontWeight: 'bold',
                color: '#2c3e50',
                fontSize: '1rem',
              }}
            >
              Country:
            </div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>{profile.country}</div>
          </div>

          {/* Plan Type and Go Premium Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: '#fff',
              borderRadius: 6,
              border: '1px solid #ddd',
              gap: '1rem',
            }}
          >
            <div
              style={{
                minWidth: '120px',
                fontWeight: 'bold',
                color: '#2c3e50',
                fontSize: '1rem',
              }}
            >
              Plan Type:
            </div>
            <div style={{ color: '#34495e', fontSize: '1rem' }}>
              {profile.planType === 'premium' ? 'Premium' : 'Free'}
            </div>

            {profile.planType?.toLowerCase() === 'free' && (
              <button
                onClick={handleGoPremium}
                style={{
                  marginLeft: 'auto',
                  backgroundColor: '#3498db',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Go Premium
              </button>
            )}
          </div>
        </div>

        {/* Warning message */}
        <div
          style={{
            maxWidth: '600px',
            margin: '2rem auto 1rem',
            padding: '1rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: 6,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          ⚠️ Warning: Deactivating your account will permanently delete all your data and cannot be undone.
        </div>

        {/* Logout and Deactivate buttons */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button 
            onClick={onLogout}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '1rem'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
            disabled={isDeleting}
          >
            🚪 Logout
          </button>

          <button
            onClick={handleDeactivate}
            style={{
              background: '#a93226',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#922b21'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#a93226'}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : '🗑️ Deactivate Account'}
          </button>
        </div>

        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#e8f4fd',
            borderRadius: 6,
            border: '1px solid #bee5eb',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '0.5rem',
              fontSize: '1.1rem',
            }}
          >
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
