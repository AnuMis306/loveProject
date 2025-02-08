import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PuzzleGame.css';

const PuzzleGame = () => {
  const navigate = useNavigate(); // Navigate hook to handle game completion
  const [showHowToPlay, setShowHowToPlay] = useState(true);
  const [gameStatus, setGameStatus] = useState(""); // 'win' or 'lose'
  const [grid, setGrid] = useState(generatePuzzle()); // Initialize with a valid puzzle
  const [showSolution, setShowSolution] = useState(false); // Track whether to show the solution
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Function to generate a solvable 3x3 Sudoku puzzle
  function generatePuzzle() {
    return [
      [1, 0, 3],
      [0, 3, 0],
      [0, 0, 2],
    ];
  }

  // Function to generate the solved puzzle
  function generateSolution() {
    return [
      [1, 2, 3],
      [2, 3, 1],
      [3, 1, 2],
    ];
  }

  // Toggle visibility of the How to Play instructions
  const toggleHowToPlay = () => {
    setShowHowToPlay(!showHowToPlay);
  };

  // Handle changes to the grid cells, but prevent editing pre-filled cells
  const handleChange = (e, row, col) => {
    const value = e.target.value;
  
    // Only allow values 1, 2, or 3 (valid Sudoku values)
    if (/^[1-3]$/.test(value) || value === '') { // Allow empty input to clear a cell
      if (grid[row][col] === 0) {
        const newGrid = grid.map((rowArray, rowIndex) =>
          rowIndex === row
            ? rowArray.map((cellValue, colIndex) =>
                colIndex === col ? (value === '' ? 0 : parseInt(value)) : cellValue
              )
            : rowArray
        );
        setGrid(newGrid);
      }
    }
  };
  

  // Check if the current grid is a valid solved puzzle
  const checkSolution = () => {
    const isValid = checkRows() && checkColumns();
    if (isValid) {
      setGameStatus("win");
      setTimeout(() => {
        
        setTimeout(() => navigate('/game3'), 1000);
      },1000);
    } else if (isGridFilled()) {
      setGameStatus("lose");
      setTimeout(() => {
        const retry = window.confirm("You lost! Do you want to try again?");
        if (retry) {
          resetGame();
        }
      }, 500);
    }
  };

  // Check if the grid is completely filled with numbers
  const isGridFilled = () => {
    return grid.every(row => row.every(cell => cell !== 0));
  };

  // Check if rows contain numbers 1 to 3 with no repetition
  const checkRows = () => {
    return grid.every(row => {
      const uniqueValues = new Set(row);
      return uniqueValues.size === row.length && !row.includes(0);
    });
  };

  // Check if columns contain numbers 1 to 3 with no repetition
  const checkColumns = () => {
    for (let col = 0; col < 3; col++) {
      const column = [grid[0][col], grid[1][col], grid[2][col]];
      const uniqueValues = new Set(column);
      if (uniqueValues.size !== column.length || column.includes(0)) {
        return false;
      }
    }
    return true;
  };

  // Reset the game grid to a new puzzle
  const resetGame = () => {
    setGameStatus(""); // Reset game status
    setGrid(generatePuzzle()); // Reset grid with a new valid puzzle
  };

  // Function to toggle showing the solution
  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, colIndex) => (
          <input
            key={colIndex}
            type="text"
            min="1"
            max="3"
            value={showSolution && cell === 0 ? generateSolution()[rowIndex][colIndex] : cell === 0 ? '' : cell}
            onChange={(e) => handleChange(e, rowIndex, colIndex)}
            className={`cell ${cell !== 0 ? 'disabled' : ''}`}
            disabled={cell !== 0 || showSolution} // Disable editing for pre-filled cells or when showing the solution
          />
        ))}
      </div>
    ));
  };

  // Automatically check the solution when grid is filled
  useEffect(() => {
    if (isGridFilled()) {
      checkSolution();
    }
  }, [grid]);

  // Start the music on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      const audioElement = document.getElementById('romantic-music');
      if (audioElement) {
        audioElement.play();
        setIsMusicPlaying(true);
        window.removeEventListener('click', handleUserInteraction); // Remove the listener after it triggers once
      }
    };

    window.addEventListener('click', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction); // Cleanup event listener when the component unmounts
    };
  }, []);

  return (
    <div className="puzzle-wrapper">
      {/* Background music element */} 
      <audio id="romantic-music" loop>
        <source src="/assets/Sway.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="left-side">
        <button className="how-to-play-btn" onClick={toggleHowToPlay}>
          {showHowToPlay ? 'Hide How to Play' : 'How to Play'}
        </button>

        {showHowToPlay && (
          <div className="how-to-play">
            <h4>How to Play:</h4>
            <p>
            Every number you place is like a step closer to completing our love story—beautiful, puzzling, and meant to be.
            </p>
            <ul>
              <li>Each row should contain the numbers 1 through 3 (without repeating).</li>
              <li>Each column should contain the numbers 1 through 3 (without repeating).</li>
            </ul>
            <p>So Place the numbers carefully and help me get closer to the love of my life</p>
          </div>
        )}
      </div>

      <div className="right-side">
        <h1 className="title">3x3 Sudoku</h1>
        <div className="puzzle-container">{renderGrid()}</div>
        {gameStatus === "win" && <div className="win-message">You did it my friend 💖! Onto the next quest...</div>}
        {gameStatus === "lose" && <div className="lose-message">Try again! You can do it my friend 💖!</div>}
      </div>
    </div>
  );
};

export default PuzzleGame;
