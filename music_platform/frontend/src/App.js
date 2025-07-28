// import React, { useState, useEffect } from 'react';
// import UserPlaylists from './views/UserPlaylists';
// import Login from './views/Login';
// import Register from './views/Register';
// import Albums from './views/Albums';
// import AlbumSongs from './views/AlbumSongs';
// import PlaylistSongs from './views/PlaylistSongs';
// import Profile from './views/Profile';
// import CreatePlaylist from './views/CreatePlaylist';
// import MusicPlayer from './components/MusicPlayer';

// function ErrorBoundary({ children }) {
//   const [error, setError] = useState(null);
//   return (
//     <React.Fragment>
//       {error && <div style={{ color: 'red', padding: 20, background: '#fee', border: '1px solid #f00' }}><strong>App Error:</strong> {error.toString()}</div>}
//       <React.Suspense fallback={<div>Loading...</div>}>
//         {React.Children.map(children, child =>
//           React.cloneElement(child, { onError: setError })
//         )}
//       </React.Suspense>
//     </React.Fragment>
//   );
// }

// function App() {
//   const [token, setToken] = useState(() => localStorage.getItem('token'));
//   const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
//   const [view, setView] = useState(() => (localStorage.getItem('token') && localStorage.getItem('userId')) ? 'albums' : 'login');
//   const [selectedAlbum, setSelectedAlbum] = useState(null);
//   const [selectedPlaylist, setSelectedPlaylist] = useState(null);
//   const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
//   const [playlistRefresh, setPlaylistRefresh] = useState(0);

//   // Music player state
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentPlaylist, setCurrentPlaylist] = useState([]);
//   const [currentSongIndex, setCurrentSongIndex] = useState(0);
//   const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);

//   const handleLogin = (tok, uid) => {
//     setToken(tok);
//     setUserId(uid);
//     localStorage.setItem('token', tok);
//     localStorage.setItem('userId', uid);
//     setView('albums');
//   };

//   // Optional: Add logout function
//   const handleLogout = () => {
//     setToken(null);
//     setUserId(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     setView('login');
//     // Stop music on logout
//     setCurrentSong(null);
//     setIsPlaying(false);
//     setCurrentPlaylist([]);
//   };

//   // Music player functions
//   const handlePlaySong = (song, playlist = []) => {
//     setCurrentSong(song);
//     setCurrentPlaylist(playlist);
//     setCurrentSongIndex(playlist.findIndex(s => s.song_id === song.song_id) || 0);
//     setIsPlaying(true);
//   };

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleNext = () => {
//     if (currentPlaylist.length === 0) return;
//     const nextIndex = (currentSongIndex + 1) % currentPlaylist.length;
//     setCurrentSongIndex(nextIndex);
//     setCurrentSong(currentPlaylist[nextIndex]);
//     setIsPlaying(true);
//   };

//   const handlePrevious = () => {
//     if (currentPlaylist.length === 0) return;
//     const prevIndex = currentSongIndex === 0 ? currentPlaylist.length - 1 : currentSongIndex - 1;
//     setCurrentSongIndex(prevIndex);
//     setCurrentSong(currentPlaylist[prevIndex]);
//     setIsPlaying(true);
//   };

//   // Update document title based on current view
//   useEffect(() => {
//     const titles = {
//       login: 'Login - Music Platform',
//       register: 'Register - Music Platform',
//       albums: 'Albums - Music Platform',
//       playlists: 'Playlists - Music Platform',
//       profile: 'Profile - Music Platform'
//     };
    
//     if (selectedAlbum) {
//       document.title = 'Album Songs - Music Platform';
//     } else if (selectedPlaylist) {
//       document.title = 'Playlist Songs - Music Platform';
//     } else if (showCreatePlaylist) {
//       document.title = 'Create Playlist - Music Platform';
//     } else {
//       document.title = titles[view] || 'Music Platform';
//     }

//     // Reset scroll position when view changes
//     window.scrollTo(0, 0);
//   }, [view, selectedAlbum, selectedPlaylist, showCreatePlaylist]);

//   if (view === 'login') {
//     console.log('Rendering login view');
//     return <Login onLogin={handleLogin} goToRegister={() => setView('register')} />;
//   }
//   if (view === 'register') {
//     console.log('Rendering register view');
//     return <Register goToLogin={() => setView('login')} />;
//   }

//   // Main app with sidebar layout
//   if (token && userId) {
//     console.log('Rendering main app tabs', { view, token, userId });
//     return (
//       <ErrorBoundary>
//         <div style={{ fontFamily: 'sans-serif', display: 'flex', minHeight: '100vh' }}>
//           {/* Sidebar Navigation - Fixed Position */}
//           <nav style={{ 
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '250px',
//             height: '100vh',
//             backgroundColor: '#2c3e50',
//             padding: '1rem 0',
//             display: 'flex',
//             flexDirection: 'column',
//             boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
//             zIndex: 1000,
//             overflowY: 'auto'
//           }}>
//             {/* App Title */}
//             <div style={{ 
//               padding: '1rem 1.5rem', 
//               borderBottom: '1px solid #34495e', 
//               marginBottom: '1rem' 
//             }}>
//               <h2 style={{ 
//                 color: '#ecf0f1', 
//                 margin: 0, 
//                 fontSize: '1.5rem',
//                 fontWeight: 'bold'
//               }}>
//                 Music Platform
//               </h2>
//             </div>

//             {/* Navigation Links */}
//             <div style={{ flex: 1 }}>
//               <button 
//                 onClick={() => { setView('albums'); setSelectedAlbum(null); }} 
//                 style={{ 
//                   width: '100%',
//                   padding: '1rem 1.5rem', 
//                   border: 'none', 
//                   backgroundColor: view === 'albums' ? '#3498db' : 'transparent',
//                   color: '#ecf0f1',
//                   textAlign: 'left',
//                   fontSize: '1rem',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.2s',
//                   borderLeft: view === 'albums' ? '4px solid #3498db' : '4px solid transparent'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (view !== 'albums') e.target.style.backgroundColor = '#34495e';
//                 }}
//                 onMouseLeave={(e) => {
//                   if (view !== 'albums') e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 Albums
//               </button>
              
//               <button 
//                 onClick={() => { setView('playlists'); setShowCreatePlaylist(false); setSelectedPlaylist(null); }}
//                 style={{ 
//                   width: '100%',
//                   padding: '1rem 1.5rem', 
//                   border: 'none', 
//                   backgroundColor: view === 'playlists' ? '#3498db' : 'transparent',
//                   color: '#ecf0f1',
//                   textAlign: 'left',
//                   fontSize: '1rem',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.2s',
//                   borderLeft: view === 'playlists' ? '4px solid #3498db' : '4px solid transparent'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (view !== 'playlists') e.target.style.backgroundColor = '#34495e';
//                 }}
//                 onMouseLeave={(e) => {
//                   if (view !== 'playlists') e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 Playlists
//               </button>
              
//               <button 
//                 onClick={() => setView('profile')}
//                 style={{ 
//                   width: '100%',
//                   padding: '1rem 1.5rem', 
//                   border: 'none', 
//                   backgroundColor: view === 'profile' ? '#3498db' : 'transparent',
//                   color: '#ecf0f1',
//                   textAlign: 'left',
//                   fontSize: '1rem',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.2s',
//                   borderLeft: view === 'profile' ? '4px solid #3498db' : '4px solid transparent'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (view !== 'profile') e.target.style.backgroundColor = '#34495e';
//                 }}
//                 onMouseLeave={(e) => {
//                   if (view !== 'profile') e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 Profile
//               </button>
//             </div>
//           </nav>

//           {/* Main Content Area - Offset by Sidebar Width */}
//           <main style={{ 
//             marginLeft: '250px',
//             flex: 1, 
//             backgroundColor: '#fff',
//             minHeight: '100vh',
//             paddingBottom: isPlayerMinimized ? '20px' : '120px', // Adjust padding based on player state
//             overflow: 'auto'
//           }}>
//             {view === 'albums' && !selectedAlbum && <Albums token={token} onSelectAlbum={setSelectedAlbum} />}
//             {view === 'albums' && selectedAlbum && <AlbumSongs albumId={selectedAlbum} token={token} userId={userId} onBack={() => setSelectedAlbum(null)} onPlaySong={handlePlaySong} />}
//             {view === 'profile' && <Profile token={token} onLogout={handleLogout} />}
//             {view === 'playlists' && !showCreatePlaylist && !selectedPlaylist && (
//               <div>
//                 <div style={{ padding: '2rem 2rem 0 2rem', backgroundColor: '#fff' }}>
//                   <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '2rem' }}>My Playlists</h2>
//                   <button 
//                     onClick={() => setShowCreatePlaylist(true)} 
//                     style={{ 
//                       background: '#27ae60', 
//                       color: '#fff', 
//                       border: 'none', 
//                       borderRadius: 6, 
//                       padding: '0.75rem 1.5rem',
//                       fontSize: '1rem',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.2s',
//                       marginBottom: '1rem'
//                     }}
//                     onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
//                     onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
//                   >
//                     ➕ Create New Playlist
//                   </button>
//                 </div>
//                 <UserPlaylists token={token} userId={userId} refresh={playlistRefresh} onSelectPlaylist={setSelectedPlaylist} />
//               </div>
//             )}
//             {view === 'playlists' && selectedPlaylist && <PlaylistSongs playlistId={selectedPlaylist} token={token} onClose={() => setSelectedPlaylist(null)} onPlaySong={handlePlaySong} />}
//             {view === 'playlists' && showCreatePlaylist && <CreatePlaylist token={token} userId={userId} onCreated={() => { setShowCreatePlaylist(false); setView('playlists'); setPlaylistRefresh(r => r + 1); }} />}
//           </main>

//           {/* Music Player */}
//           <MusicPlayer 
//             currentSong={currentSong}
//             isPlaying={isPlaying}
//             onPlayPause={handlePlayPause}
//             onNext={handleNext}
//             onPrevious={handlePrevious}
//             playlist={currentPlaylist}
//             isMinimized={isPlayerMinimized}
//             onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
//           />
//         </div>
//       </ErrorBoundary>
//     );
//   }
//   console.log('Rendering null (blank page)', { view, token, userId });
//   return <div style={{ color: 'red', padding: 20 }}>Blank page: No view rendered. Check console for errors.</div>;
// }

// export default App;


import React, { useState, useEffect } from 'react';
import UserPlaylists from './views/UserPlaylists';
import Login from './views/Login';
import Register from './views/Register';
import Albums from './views/Albums';
import AlbumSongs from './views/AlbumSongs';
import PlaylistSongs from './views/PlaylistSongs';
import Profile from './views/Profile';
import CreatePlaylist from './views/CreatePlaylist';
import MusicPlayer from './components/MusicPlayer';
import ResetPassword from './views/ResetPassword';  // import your reset password view

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

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
  const [view, setView] = useState(() =>
    (localStorage.getItem('token') && localStorage.getItem('userId')) ? 'albums' : 'login'
  );
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [playlistRefresh, setPlaylistRefresh] = useState(0);

  // Music player state
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);

  const handleLogin = (tok, uid) => {
    setToken(tok);
    setUserId(uid);
    localStorage.setItem('token', tok);
    localStorage.setItem('userId', uid);
    setView('albums');
  };

  // Logout function
  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setView('login');
    setCurrentSong(null);
    setIsPlaying(false);
    setCurrentPlaylist([]);
  };

  // Music player functions
  const handlePlaySong = (song, playlist = []) => {
    setCurrentSong(song);
    setCurrentPlaylist(playlist);
    setCurrentSongIndex(playlist.findIndex(s => s.song_id === song.song_id) || 0);
    setIsPlaying(true);
  };
  const handlePlayPause = () => setIsPlaying(!isPlaying);
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

  // Navigation helpers
  const goToResetPassword = () => setView('resetPassword');
  const goToLogin = () => setView('login');

  // Update document title
  useEffect(() => {
    const titles = {
      login: 'Login - Music Platform',
      register: 'Register - Music Platform',
      albums: 'Albums - Music Platform',
      playlists: 'Playlists - Music Platform',
      profile: 'Profile - Music Platform',
      resetPassword: 'Reset Password - Music Platform'
    };

    if (selectedAlbum) {
      document.title = 'Album Songs - Music Platform';
    } else if (selectedPlaylist) {
      document.title = 'Playlist Songs - Music Platform';
    } else if (showCreatePlaylist) {
      document.title = 'Create Playlist - Music Platform';
    } else {
      document.title = titles[view] || 'Music Platform';
    }

    window.scrollTo(0, 0);
  }, [view, selectedAlbum, selectedPlaylist, showCreatePlaylist]);

  // Views
  if (view === 'login') {
    return <Login
      onLogin={handleLogin}
      goToRegister={() => setView('register')}
      goToResetPassword={goToResetPassword}  // pass to Login component!
    />;
  }
  if (view === 'register') {
    return <Register goToLogin={goToLogin} />;
  }
  if (view === 'resetPassword') {
    return <ResetPassword goToLogin={goToLogin} />;
  }

  // Main app view when logged in
  if (token && userId) {
    return (
      <ErrorBoundary>
        <div style={{ fontFamily: 'sans-serif', display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '250px',
            height: '100vh',
            backgroundColor: '#2c3e50',
            padding: '1rem 0',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            zIndex: 1000,
            overflowY: 'auto'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: '1px solid #34495e',
              marginBottom: '1rem'
            }}>
              <h2 style={{
                color: '#ecf0f1',
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                Music Platform
              </h2>
            </div>
            <div style={{ flex: 1 }}>
              <button
                onClick={() => { setView('albums'); setSelectedAlbum(null); }}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  border: 'none',
                  backgroundColor: view === 'albums' ? '#3498db' : 'transparent',
                  color: '#ecf0f1',
                  textAlign: 'left',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  borderLeft: view === 'albums' ? '4px solid #3498db' : '4px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (view !== 'albums') e.target.style.backgroundColor = '#34495e';
                }}
                onMouseLeave={(e) => {
                  if (view !== 'albums') e.target.style.backgroundColor = 'transparent';
                }}
              >
                Albums
              </button>
              <button
                onClick={() => { setView('playlists'); setShowCreatePlaylist(false); setSelectedPlaylist(null); }}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  border: 'none',
                  backgroundColor: view === 'playlists' ? '#3498db' : 'transparent',
                  color: '#ecf0f1',
                  textAlign: 'left',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  borderLeft: view === 'playlists' ? '4px solid #3498db' : '4px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (view !== 'playlists') e.target.style.backgroundColor = '#34495e';
                }}
                onMouseLeave={(e) => {
                  if (view !== 'playlists') e.target.style.backgroundColor = 'transparent';
                }}
              >
                Playlists
              </button>
              <button
                onClick={() => setView('profile')}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  border: 'none',
                  backgroundColor: view === 'profile' ? '#3498db' : 'transparent',
                  color: '#ecf0f1',
                  textAlign: 'left',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  borderLeft: view === 'profile' ? '4px solid #3498db' : '4px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (view !== 'profile') e.target.style.backgroundColor = '#34495e';
                }}
                onMouseLeave={(e) => {
                  if (view !== 'profile') e.target.style.backgroundColor = 'transparent';
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
            {view === 'albums' && !selectedAlbum && <Albums token={token} onSelectAlbum={setSelectedAlbum} />}
            {view === 'albums' && selectedAlbum && <AlbumSongs albumId={selectedAlbum} token={token} userId={userId} onBack={() => setSelectedAlbum(null)} onPlaySong={handlePlaySong} />}
            {view === 'profile' && <Profile token={token} onLogout={handleLogout} />}
            {view === 'playlists' && !showCreatePlaylist && !selectedPlaylist && (
              <div>
                <div style={{ padding: '2rem 2rem 0 2rem', backgroundColor: '#fff' }}>
                  <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '2rem' }}>My Playlists</h2>
                  <button
                    onClick={() => setShowCreatePlaylist(true)}
                    style={{
                      background: '#27ae60',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      marginBottom: '1rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
                  >
                    ➕ Create New Playlist
                  </button>
                </div>
                <UserPlaylists token={token} userId={userId} refresh={playlistRefresh} onSelectPlaylist={setSelectedPlaylist} />
              </div>
            )}
            {view === 'playlists' && selectedPlaylist && <PlaylistSongs playlistId={selectedPlaylist} token={token} onClose={() => setSelectedPlaylist(null)} onPlaySong={handlePlaySong} />}
            {view === 'playlists' && showCreatePlaylist && <CreatePlaylist token={token} userId={userId} onCreated={() => { setShowCreatePlaylist(false); setView('playlists'); setPlaylistRefresh(r => r + 1); }} />}
          </main>

          {/* Music Player */}
          <MusicPlayer
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            playlist={currentPlaylist}
            isMinimized={isPlayerMinimized}
            onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
          />
        </div>
      </ErrorBoundary>
    );
  }

  return <div style={{ color: 'red', padding: 20 }}>Blank page: No view rendered. Check console for errors.</div>;
}

export default App;

