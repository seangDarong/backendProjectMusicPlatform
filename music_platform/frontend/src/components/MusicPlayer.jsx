import React, { useState, useRef, useEffect, useMemo } from 'react';

const MusicPlayer = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious, playlist = [], userProfile }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // Add local playing state to avoid App.js conflicts
  const [localIsPlaying, setLocalIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => {
      setIsLoading(true);
    };
    const handleCanPlay = () => {
      setIsLoading(false);
    };
    const handleWaiting = () => {
      setIsLoading(true);
    };
    const handlePlaying = () => {
      setIsLoading(false);
    };
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onNext);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onNext);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
    };
  }, [onNext]);

  // Reset audio when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    // Reset time and duration when song changes
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    
    // Load the new audio source
    audio.load();
    
    // If it should be playing, start playback once loaded
    if (isPlaying) {
      const playWhenLoaded = () => {
        audio.play().catch(console.error);
        setLocalIsPlaying(true); // Update local state
        audio.removeEventListener('canplaythrough', playWhenLoaded);
      };
      audio.addEventListener('canplaythrough', playWhenLoaded);
    } else {
      setLocalIsPlaying(false); // Sync local state
    }
  }, [currentSong?.song_id]); // Only run when song actually changes

  // Remove this useEffect to avoid conflicts with direct audio control
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;

  //   if (isPlaying) {
  //     audio.play().catch(console.error);
  //   } else {
  //     audio.pause();
  //   }
  // }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Prevent seeking for free users
    if (!canSeek) {
      alert('Seeking is only available for Premium users. Upgrade to Premium to unlock this feature!');
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * duration;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // For demo purposes, we'll use different test audio files based on song ID
  // In a real app, you'd have actual audio file URLs from your server
  const audioFiles = [
    // 'https://www.w3schools.com/html/horse.mp3',
    'https://files.catbox.moe/ctusuv.mp3'
  ];
  const audioSrc = currentSong ? audioFiles[currentSong.song_id % audioFiles.length] || audioFiles[0] : '';
  
  // Use useMemo to prevent excessive re-renders - only pulse when actually loading
  const shouldPulse = useMemo(() => {
    return isLoading;
  }, [isLoading]);

  // Check if user is on free plan (disable skip and seek for free users)
  const isFreeUser = userProfile?.planType === 'free';
  
  // Free users can't skip songs
  const canSkip = !isFreeUser;
  
  // Free users can't seek in songs
  const canSeek = !isFreeUser;

  // Wrapper functions to handle premium restrictions
  const handleNext = () => {
    if (!canSkip) {
      alert('Song skipping is only available for Premium users. Upgrade to Premium to unlock unlimited skips!');
      return;
    }
    onNext();
  };

  const handlePrevious = () => {
    if (!canSkip) {
      alert('Song skipping is only available for Premium users. Upgrade to Premium to unlock unlimited skips!');
      return;
    }
    onPrevious();
  };

  // Completely self-contained play/pause without App.js involvement
  const handleDirectPlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    console.log('Direct play/pause clicked, audio.paused:', audio.paused, 'currentTime:', audio.currentTime);
    
    if (audio.paused) {
      audio.play().catch(console.error);
      setLocalIsPlaying(true);
    } else {
      audio.pause();
      setLocalIsPlaying(false);
    }
    // Don't call onPlayPause() to avoid App.js conflicts
  };

  if (!currentSong) {
    return null;
  }

  return (
    <>
      {/* Audio element should persist across minimize/maximize */}
      <audio ref={audioRef} src={audioSrc} />
      
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#181818',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 -4px 15px rgba(0,0,0,0.2)',
        zIndex: 1000
      }}>
        
        {/* Album Cover & Song Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', minWidth: '250px' }}>
          {/* Album Cover */}
          <div style={{ 
            width: '60px', 
            height: '60px', 
            backgroundColor: '#333', 
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            {currentSong.cover_image_url || currentSong.Album?.cover_image_url ? (
              <img 
                src={currentSong.cover_image_url || currentSong.Album?.cover_image_url} 
                alt={`${currentSong.title} cover`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              />
            ) : (
              <div style={{ color: '#666', fontSize: '1.5rem' }}>🎵</div>
            )}
          </div>
          
          {/* Song Info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{currentSong.title}</div>
            <div style={{ opacity: 0.8, fontSize: '12px' }}>
              {currentSong.Artist?.name || 'Unknown Artist'}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={handlePrevious}
            disabled={!playlist.length || !canSkip}
            title={!canSkip ? "Upgrade to Premium to skip songs" : ""}
            style={{
              background: !canSkip ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              color: !canSkip ? 'rgba(255,255,255,0.5)' : 'white',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: (!playlist.length || !canSkip) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ⏮
          </button>
          
          <button
            onClick={handleDirectPlayPause} // Direct control
            disabled={shouldPulse} // Disable while pulsing
            style={{
              background: shouldPulse ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
              border: 'none',
              color: shouldPulse ? 'rgba(255,255,255,0.5)' : 'white',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: shouldPulse ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}
          >
            {localIsPlaying ? '⏸' : '▶'}
          </button>
          
          <button
            onClick={handleNext}
            disabled={!playlist.length || !canSkip}
            title={!canSkip ? "Upgrade to Premium to skip songs" : ""}
            style={{
              background: !canSkip ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              color: !canSkip ? 'rgba(255,255,255,0.5)' : 'white',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: (!playlist.length || !canSkip) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ⏭
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', minWidth: '40px' }}>{formatTime(currentTime)}</span>
          <div
            onClick={handleSeek}
            title={!canSeek ? "Upgrade to Premium to seek in songs" : ""}
            style={{
              flex: 1,
              height: '6px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '3px',
              cursor: canSeek ? 'pointer' : 'not-allowed',
              position: 'relative',
              opacity: canSeek ? 1 : 0.6
            }}
          >
            <div
              style={{
                width: shouldPulse ? '100%' : `${duration ? (currentTime / duration) * 100 : 0}%`,
                height: '100%',
                background: shouldPulse ? '#B0B0B0' : 'white', // Light grey instead of green
                borderRadius: '3px',
                transition: shouldPulse ? 'none' : 'width 0.1s',
                animation: shouldPulse ? 'subtlePulse 1.5s ease-in-out infinite' : 'none' // Slower animation
              }}
            />
            <style>
              {`
                @keyframes subtlePulse {
                  0% { 
                    background: #B0B0B0;
                    opacity: 0.7;
                  }
                  50% { 
                    background: #D0D0D0;
                    opacity: 0.5;
                  }
                  100% { 
                    background: #B0B0B0;
                    opacity: 0.7;
                  }
                }
              `}
            </style>
          </div>
          <span style={{ fontSize: '12px', minWidth: '40px' }}>{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '120px' }}>
          <span style={{ fontSize: '16px' }}>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{
              flex: 1,
              height: '4px',
              background: 'rgba(255,255,255,0.3)',
              outline: 'none',
              borderRadius: '2px'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
