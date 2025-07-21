import React, { useState, useEffect } from 'react';
import UserPlaylists from './views/UserPlaylists';
import Login from './views/Login';
import Register from './views/Register';
import Albums from './views/Albums';
import AlbumSongs from './views/AlbumSongs';
import Profile from './views/Profile';
import CreatePlaylist from './views/CreatePlaylist';

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);
  return (
    <React.Fragment>
      {error && <div style={{ color: 'red', padding: 20, background: '#fee', border: '1px solid #f00' }}><strong>App Error:</strong> {error.toString()}</div>}
      <React.Suspense fallback={<div>Loading...</div>}>
        {React.Children.map(children, child =>
          React.cloneElement(child, { onError: setError })
        )}
      </React.Suspense>
    </React.Fragment>
  );
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
  const [view, setView] = useState(() => (localStorage.getItem('token') && localStorage.getItem('userId')) ? 'albums' : 'login');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [playlistRefresh, setPlaylistRefresh] = useState(0);

  const handleLogin = (tok, uid) => {
    setToken(tok);
    setUserId(uid);
    localStorage.setItem('token', tok);
    localStorage.setItem('userId', uid);
    setView('albums');
  };

  // Optional: Add logout function
  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setView('login');
  };

  if (view === 'login') {
    console.log('Rendering login view');
    return <Login onLogin={handleLogin} goToRegister={() => setView('register')} />;
  }
  if (view === 'register') {
    console.log('Rendering register view');
    return <Register goToLogin={() => setView('login')} />;
  }

  // Main app tabs
  if (token && userId) {
    console.log('Rendering main app tabs', { view, token, userId });
    return (
      <ErrorBoundary>
        <div style={{ fontFamily: 'sans-serif' }}>
          <nav style={{ display: 'flex', gap: 20, justifyContent: 'center', margin: '2rem 0' }}>
            <button onClick={() => { setView('albums'); setSelectedAlbum(null); }} style={{ padding: '0.5rem 1.2rem', borderRadius: 4, border: 'none', background: view === 'albums' ? '#1976d2' : '#eee', color: view === 'albums' ? '#fff' : '#333' }}>Albums</button>
            <button onClick={() => setView('profile')} style={{ padding: '0.5rem 1.2rem', borderRadius: 4, border: 'none', background: view === 'profile' ? '#1976d2' : '#eee', color: view === 'profile' ? '#fff' : '#333' }}>Profile</button>
            <button onClick={() => { setView('playlists'); setShowCreatePlaylist(false); }} style={{ padding: '0.5rem 1.2rem', borderRadius: 4, border: 'none', background: view === 'playlists' ? '#1976d2' : '#eee', color: view === 'playlists' ? '#fff' : '#333' }}>Playlists</button>
            <button onClick={handleLogout} style={{ padding: '0.5rem 1.2rem', borderRadius: 4, border: 'none', background: '#d32f2f', color: '#fff', marginLeft: 20 }}>Logout</button>
          </nav>
          {view === 'albums' && !selectedAlbum && <Albums token={token} onSelectAlbum={setSelectedAlbum} />}
          {view === 'albums' && selectedAlbum && <AlbumSongs albumId={selectedAlbum} token={token} userId={userId} onBack={() => setSelectedAlbum(null)} />}
          {view === 'profile' && <Profile token={token} />}
        {view === 'playlists' && !showCreatePlaylist && <>
          <button onClick={() => setShowCreatePlaylist(true)} style={{ margin: '1rem auto', display: 'block', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem' }}>Create Playlist</button>
          <UserPlaylists token={token} userId={userId} refresh={playlistRefresh} />
        </>}
        {view === 'playlists' && showCreatePlaylist && <CreatePlaylist token={token} userId={userId} onCreated={() => { setShowCreatePlaylist(false); setView('playlists'); setPlaylistRefresh(r => r + 1); }} />}
        </div>
      </ErrorBoundary>
    );
  }
  console.log('Rendering null (blank page)', { view, token, userId });
  return <div style={{ color: 'red', padding: 20 }}>Blank page: No view rendered. Check console for errors.</div>;
}

export default App;
