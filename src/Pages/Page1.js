import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Howl } from 'howler';
import './Page1.css';

const Page1 = () => {
  const [musicPlaying, setMusicPlaying] = useState(false); // Start with music paused
  const [sound, setSound] = useState(null); // The sound will be created on user interaction

  const toggleMusic = () => {
    if (!sound) {
      // Initialize sound only after the user clicks (only once)
      const music = new Howl({
        src: [
          '/assets/romantic-music.mp3', // MP3 format
          '/assets/romantic-music.ogg', // OGG fallback format
        ],
        volume: 0.5,
        loop: true, // Optional: makes the music loop
        onplay: () => {
          console.log('Music started playing');
        },
        onloaderror: (id, error) => {
          console.error('Error loading the music file:', error);
        },
        onplayerror: (id, error) => {
          console.error('Error playing the music:', error);
        },
      });
      setSound(music); // Store the Howl instance
      music.play(); // Play the music after initialization
    } else {
      if (musicPlaying) {
        sound.stop(); // Stop the existing instance
      } else {
        sound.play(); // Play the existing instance
      }
    }
    setMusicPlaying(!musicPlaying); // Toggle play/pause state
  };
  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop();
      }
    };
  }, [sound]);
  return (
    <div className="page1-container">
      <div className="welcome-message">
        <h1 className="animated-text">Welcome, My Love, Adarsh ❤️</h1>
        <p className="animated-heartfelt-message">
          This is a journey made just for you, my love. Follow your heart, and let’s relive our story together.
        </p>
      </div>
      <div className="floating-hearts"></div>
      <button className="music-toggle" onClick={toggleMusic}>
        {musicPlaying ? 'Mute' : 'Play'} Music
      </button>
      <Link to="/story">
        <button className="start-btn">Begin Our Love Story</button>
      </Link>
    </div>
  );
};

export default Page1;
