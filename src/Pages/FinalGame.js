import React, { useState, useRef, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import './FinalGame.css';

function FinalGame() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Music state
  const [answer, setAnswer] = useState(null); // Track the answer ("Yes" or "No")
  const [confetti, setConfetti] = useState(false); // Confetti trigger state
  const [curtainOpen, setCurtainOpen] = useState(false); // Track curtain state
  const [isPromptVisible, setIsPromptVisible] = useState(true); // Show prompt to click curtain
  const noButtonRef = useRef(null); // Reference for the "No" button
  const audioRef = useRef(null); // Reference for audio element
  const navigate = useNavigate();

  // Handle the "Yes" and "No" responses
  const handleClick = (response) => {
    setAnswer(response);
    if (response) {
      setConfetti(true); // Trigger confetti if "Yes"
      setTimeout(() => navigate('/memories'), 10000);
    }
  };

  // Handle the "No" button moving away
  const handleNoMouseMove = () => {
    if (noButtonRef.current) {
      const button = noButtonRef.current;
      const moveX = Math.random() * 305;
      const moveY = Math.random() * 305;

      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  };

  // Function to open the curtain and trigger music
  const handleCurtainClick = () => {
    setCurtainOpen(true);
    setIsPromptVisible(false); // Hide the prompt once the curtain is opened

    // Play music after curtain opens (user interaction)
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error); // Log error if playback fails
      });
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="App">
      {/* Background music element */}
      <audio ref={audioRef} id="romantic-music" loop>
        <source src="/assets/Love Story.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {confetti && <Confetti />}

      <div className="valentine-container">
        {/* Curtain Effect */}
        <div
          className={`curtain ${curtainOpen ? 'open' : ''}`}
          onClick={handleCurtainClick}
        >
          {/* Show prompt if curtain is not opened */}
          {isPromptVisible && (
            <div className="curtain-prompt">
              <p>Click to open the curtain and see the surprise! 🎉</p>
            </div>
          )}
        </div>

        {/* This content will be revealed after the curtain is opened */}
        {curtainOpen && (
          <>
            <h1 className="title">🌹 Will you be my Valentine? 🌹</h1>

            <div className={`heart-container ${answer !== null ? 'zoom-in' : ''}`}>
              <FaHeart className="heart" />
            </div>

            {answer === null && (
              <div className="buttons">
                <button onClick={() => handleClick(true)} className="yes-button">
                  Yes 💖
                </button>
                <button
                  ref={noButtonRef}
                  onClick={() => handleClick(false)}
                  className="no-button"
                  onMouseMove={handleNoMouseMove}
                >
                  No 💔
                </button>
              </div>
            )}

            {answer !== null && (
              <div className="response">
                {answer ? (
                  <p className="response-text">Yay! 💖 You said YES! 💖</p>
                ) : (
                  <p className="response-text">Whyyyyyyy!! 💔 Fir se choose kro...</p>
                  
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FinalGame;
