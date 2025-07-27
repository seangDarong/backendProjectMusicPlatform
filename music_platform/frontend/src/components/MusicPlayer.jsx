import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious, playlist = [], isMinimized, onToggleMinimize }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onNext);
    };
  }, [onNext]);

  // Reset audio when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    // Reset time and duration when song changes
    setCurrentTime(0);
    setDuration(0);
    
    // Load the new audio source
    audio.load();
    
    // If it should be playing, start playback once loaded
    if (isPlaying) {
      const playWhenLoaded = () => {
        audio.play().catch(console.error);
        audio.removeEventListener('loadeddata', playWhenLoaded);
      };
      audio.addEventListener('loadeddata', playWhenLoaded);
    }
  }, [currentSong?.song_id, isPlaying]); // Include isPlaying to satisfy ESLint

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Only try to play if audio is loaded
      if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        audio.play().catch(console.error);
      } else {
        // Wait for audio to load before playing
        const playWhenReady = () => {
          audio.play().catch(console.error);
          audio.removeEventListener('canplay', playWhenReady);
        };
        audio.addEventListener('canplay', playWhenReady);
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    
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

  if (!currentSong) {
    return null;
  }

  // For demo purposes, we'll use different test audio files based on song ID
  // In a real app, you'd have actual audio file URLs from your server
  const audioFiles = [
    'https://www.w3schools.com/html/horse.mp3'
  ];
  const audioSrc = audioFiles[currentSong.song_id % audioFiles.length] || audioFiles[0];

  if (isMinimized) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: 1000,
        cursor: 'pointer',
        minWidth: '200px'
      }}
      onClick={onToggleMinimize}
    >
      <audio ref={audioRef} src={audioSrc} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlayPause();
        }}
        style={{
          background: 'rgba(255,255,255,0.3)',
          border: 'none',
          color: 'white',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div style={{ flex: 1, fontSize: '12px' }}>
        <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {currentSong.title}
        </div>
        <div style={{ opacity: 0.8, fontSize: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {currentSong.Artist?.name || 'Unknown Artist'}
        </div>
      </div>
    </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 -4px 15px rgba(0,0,0,0.2)',
      zIndex: 1000
    }}>
      <audio ref={audioRef} src={audioSrc} />
      
      {/* Song Info */}
      <div style={{ minWidth: '200px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{currentSong.title}</div>
        <div style={{ opacity: 0.8, fontSize: '12px' }}>
          {currentSong.Artist?.name || 'Unknown Artist'}
        </div>
      </div>

      {/* Minimize Button */}
      <button
        onClick={onToggleMinimize}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          borderRadius: '4px',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}
      >
        ⬇
      </button>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={onPrevious}
          disabled={!playlist.length}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ⏮
        </button>
        
        <button
          onClick={onPlayPause}
          style={{
            background: 'rgba(255,255,255,0.3)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <button
          onClick={onNext}
          disabled={!playlist.length}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
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
          style={{
            flex: 1,
            height: '6px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '3px',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              height: '100%',
              background: 'white',
              borderRadius: '3px',
              transition: 'width 0.1s'
            }}
          />
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
  );
};

export default MusicPlayer;
