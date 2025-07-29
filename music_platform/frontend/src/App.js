import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import UserPlaylists from './views/UserPlaylists';
import Login from './views/Login';
import Register from './views/Register';
import Albums from './views/Albums';
import AlbumSongs from './views/AlbumSongs';
import PlaylistSongs from './views/PlaylistSongs';
import Profile from './views/Profile';
import CreatePlaylist from './views/CreatePlaylist';
import Artists from './views/Artists';
import ArtistAlbums from './views/ArtistAlbums';
import MusicPlayer from './components/MusicPlayer';
import ResetPassword from './views/ResetPassword';

// Error Boundary Component
function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);
  return (
    <React.Fragment>
      {error && <div style={{ color: 'red', padding: 20, background: '#fee', border: '1px solid #f00' }}>
        <strong>App Error:</strong> {error.toString()}
      </div>}
      <React.Suspense fallback={<div>Loading...</div>}>
        {React.Children.map(children, child =>
          React.cloneElement(child, { onError: setError })
        )}
      </React.Suspense>
    </React.Fragment>
  );
}

// Wrapper for Login with navigation
function LoginWithNavigation({ onLogin }) {
  const navigate = useNavigate();
  return (
    <Login 
      onLogin={(token, userId) => {
        onLogin(token, userId);
        navigate('/albums');
      }}
      goToRegister={() => navigate('/register')}
      goToResetPassword={() => navigate('/reset-password')}
    />
  );
}

// Wrapper for Register with navigation
function RegisterWithNavigation() {
  const navigate = useNavigate();
  return <Register goToLogin={() => navigate('/login')} />;
}

// Wrapper for Reset Password with navigation
function ResetPasswordWithNavigation() {
  const navigate = useNavigate();
  return <ResetPassword goToLogin={() => navigate('/login')} />;
}

// Wrapper for Albums with navigation
function AlbumsWithNavigation({ token }) {
  const navigate = useNavigate();
  return <Albums token={token} onSelectAlbum={(albumId) => navigate(`/albums/${albumId}`)} />;
}

// Wrapper for Artists with navigation
function ArtistsWithNavigation({ token }) {
  const navigate = useNavigate();
  return <Artists token={token} onSelectArtist={(artistId) => navigate(`/artists/${artistId}`)} />;
}

// Wrapper for Artist Albums with URL params
function ArtistAlbumsWrapper({ token }) {
  const { artistId } = useParams();
  const navigate = useNavigate();
  
  return (
    <ArtistAlbums 
      artistId={parseInt(artistId)} 
      token={token} 
      onBack={() => navigate('/artists')} 
      onSelectAlbum={(albumId) => navigate(`/albums/${albumId}`)} 
    />
  );
}

// Wrapper for Playlists with navigation
function PlaylistsWithNavigation({ token, userId, playlistRefresh }) {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ padding: '2rem 2rem 0 2rem', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#6b21a8', marginBottom: '1.5rem', fontSize: '2rem' }}>My Playlists</h2>
        <button
          onClick={() => navigate('/playlists/create')}
          style={{
            background: '#6b21a8',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginBottom: '1rem'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#5b1a8b'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b21a8'}
        >
          Create New Playlist
        </button>
      </div>
      <UserPlaylists 
        token={token} 
        userId={userId} 
        refresh={playlistRefresh} 
        onSelectPlaylist={(playlistId) => navigate(`/playlists/${playlistId}`)} 
      />
    </div>
  );
}

// Wrapper for Create Playlist with navigation
function CreatePlaylistWithNavigation({ token, userId, onCreated }) {
  const navigate = useNavigate();
  return (
    <CreatePlaylist 
      token={token} 
      userId={userId} 
      onCreated={() => {
        onCreated();
        navigate('/playlists');
      }} 
    />
  );
}

// Wrapper for Album Songs with URL params
function AlbumSongsWrapper({ token, userId, onPlaySong }) {
  const { albumId } = useParams();
  const navigate = useNavigate();
  
  return (
    <AlbumSongs 
      albumId={parseInt(albumId)} 
      token={token} 
      userId={userId} 
      onBack={() => navigate('/albums')} 
      onPlaySong={onPlaySong} 
    />
  );
}

// Wrapper for Playlist Songs with URL params
function PlaylistSongsWrapper({ token, onPlaySong }) {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  
  return (
    <PlaylistSongs 
      playlistId={parseInt(playlistId)} 
      token={token} 
      onClose={() => navigate('/playlists')} 
      onPlaySong={onPlaySong} 
    />
  );
}

// Main Layout Component with Sidebar
function MainLayout({ children, currentSong, isPlaying, onPlayPause, onNext, onPrevious, currentPlaylist, isPlayerMinimized, onToggleMinimize, userProfile }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => {
    if (path === '/albums') return location.pathname === '/albums' || location.pathname.startsWith('/albums/');
    if (path === '/playlists') return location.pathname === '/playlists' || location.pathname.startsWith('/playlists/');
    if (path === '/artists') return location.pathname === '/artists' || location.pathname.startsWith('/artists/');
    return location.pathname === path;
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '250px',
        height: '100vh',
        backgroundColor: '#f5f1fb',
        padding: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 5px rgba(234, 226, 247, 0.5)',
        zIndex: 1000,
        overflowY: 'auto',
        borderRight: '1px solid #eae2f7'
      }}>
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #eae2f7',
          marginBottom: '1rem'
        }}>
          <h2 style={{
            color: '#6b21a8',
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Music Platform
          </h2>
        </div>
        <div style={{ flex: 1 }}>
          <button
            onClick={() => navigate('/albums')}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: isActive('/albums') ? '#eae2f7' : 'transparent',
              color: isActive('/albums') ? '#6b21a8' : '#6b7280',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              borderLeft: isActive('/albums') ? '4px solid #6b21a8' : '4px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/albums')) e.target.style.backgroundColor = '#eae2f7';
            }}
            onMouseLeave={(e) => {
              if (!isActive('/albums')) e.target.style.backgroundColor = 'transparent';
            }}
          >
            Albums
          </button>
          <button
            onClick={() => navigate('/artists')}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: isActive('/artists') ? '#eae2f7' : 'transparent',
              color: isActive('/artists') ? '#6b21a8' : '#6b7280',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              borderLeft: isActive('/artists') ? '4px solid #6b21a8' : '4px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/artists')) e.target.style.backgroundColor = '#eae2f7';
            }}
            onMouseLeave={(e) => {
              if (!isActive('/artists')) e.target.style.backgroundColor = 'transparent';
            }}
          >
            Artists
          </button>
          <button
            onClick={() => navigate('/playlists')}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: isActive('/playlists') ? '#eae2f7' : 'transparent',
              color: isActive('/playlists') ? '#6b21a8' : '#6b7280',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              borderLeft: isActive('/playlists') ? '4px solid #6b21a8' : '4px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/playlists')) e.target.style.backgroundColor = '#eae2f7';
            }}
            onMouseLeave={(e) => {
              if (!isActive('/playlists')) e.target.style.backgroundColor = 'transparent';
            }}
          >
            Playlists
          </button>
          <button
            onClick={() => navigate('/profile')}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: isActive('/profile') ? '#eae2f7' : 'transparent',
              color: isActive('/profile') ? '#6b21a8' : '#6b7280',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              borderLeft: isActive('/profile') ? '4px solid #6b21a8' : '4px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/profile')) e.target.style.backgroundColor = '#eae2f7';
            }}
            onMouseLeave={(e) => {
              if (!isActive('/profile')) e.target.style.backgroundColor = 'transparent';
            }}
          >
            Profile
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        marginLeft: '250px',
        flex: 1,
        backgroundColor: '#fff',
        minHeight: '100vh',
        paddingBottom: isPlayerMinimized ? '20px' : '120px',
        overflow: 'auto'
      }}>
        {children}
      </main>

      {/* Music Player */}
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={onPlayPause}
        onNext={onNext}
        onPrevious={onPrevious}
        playlist={currentPlaylist}
        isMinimized={isPlayerMinimized}
        onToggleMinimize={onToggleMinimize}
        userProfile={userProfile}
      />
    </div>
  );
}

// Main App Component
function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
  const [playlistRefresh, setPlaylistRefresh] = useState(0);
  
  // User profile state for subscription plan
  const [userProfile, setUserProfile] = useState(null);

  // Music player state
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);

  const handleLogin = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setUserProfile(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setCurrentSong(null);
    setIsPlaying(false);
    setCurrentPlaylist([]);
  };

  // Fetch user profile to get subscription plan
  useEffect(() => {
    if (token && userId) {
      fetch('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setUserProfile(data);
          }
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [token, userId]);

  // Music player functions
  const handlePlaySong = (song, playlist = []) => {
    setCurrentSong(song);
    setCurrentPlaylist(playlist);
    setCurrentSongIndex(playlist.findIndex(s => s.song_id === song.song_id) || 0);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentPlaylist.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % currentPlaylist.length;
    setCurrentSongIndex(nextIndex);
    setCurrentSong(currentPlaylist[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentPlaylist.length === 0) return;
    const prevIndex = currentSongIndex === 0 ? currentPlaylist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(currentPlaylist[prevIndex]);
    setIsPlaying(true);
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    return token && userId ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            token && userId ? <Navigate to="/albums" replace /> : 
            <LoginWithNavigation onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            token && userId ? <Navigate to="/albums" replace /> : 
            <RegisterWithNavigation />
          } />
          <Route path="/reset-password" element={
            token && userId ? <Navigate to="/albums" replace /> : 
            <ResetPasswordWithNavigation />
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={<Navigate to={token && userId ? "/albums" : "/login"} replace />} />
          
          <Route path="/albums" element={
            <ProtectedRoute>
              <MainLayout 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentPlaylist={currentPlaylist}
                isPlayerMinimized={isPlayerMinimized}
                onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
                userProfile={userProfile}
              >
                <AlbumsWithNavigation token={token} />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/albums/:albumId" element={
            <ProtectedRoute>
              <MainLayout 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentPlaylist={currentPlaylist}
                isPlayerMinimized={isPlayerMinimized}
                onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
                userProfile={userProfile}
              >
                <AlbumSongsWrapper token={token} userId={userId} onPlaySong={handlePlaySong} />
              </MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/artists" element={
            <ProtectedRoute>
              <MainLayout 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentPlaylist={currentPlaylist}
                isPlayerMinimized={isPlayerMinimized}
                onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
                userProfile={userProfile}
              >
                <ArtistsWithNavigation token={token} />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/artists/:artistId" element={
            <ProtectedRoute>
              <MainLayout 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentPlaylist={currentPlaylist}
                isPlayerMinimized={isPlayerMinimized}
                onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
                userProfile={userProfile}
              >
                <ArtistAlbumsWrapper token={token} />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/playlists" element={
            <ProtectedRoute>
              <MainLayout 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentPlaylist={currentPlaylist}
                isPlayerMinimized={isPlayerMinimized}
                onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
                userProfile={userProfile}
              >
                <PlaylistsWithNavigation token={token} userId={userId} playlistRefresh={playlistRefresh} />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/playlists/create" element={
            <ProtectedRoute>
              <MainLayout 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentPlaylist={currentPlaylist}
                isPlayerMinimized={isPlayerMinimized}
                onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
                userProfile={userProfile}
              >
                <CreatePlaylistWithNavigation 
                  token={token} 
                  userId={userId} 
                  onCreated={() => setPlaylistRefresh(r => r + 1)} 
                />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/playlists/:playlistId" element={
            <ProtectedRoute>
              <MainLayout 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentPlaylist={currentPlaylist}
                isPlayerMinimized={isPlayerMinimized}
                onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
                userProfile={userProfile}
              >
                <PlaylistSongsWrapper token={token} onPlaySong={handlePlaySong} />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <MainLayout 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentPlaylist={currentPlaylist}
                isPlayerMinimized={isPlayerMinimized}
                onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
                userProfile={userProfile}
              >
                <Profile token={token} onLogout={handleLogout} />
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
