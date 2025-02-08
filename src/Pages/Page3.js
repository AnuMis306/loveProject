import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page3.css';

const MemoryMatch = () => {
  // Define 8 different smiley emojis for the cards
  const smileys = [
    '💋','🌹','🌻','☘️', '😍', '❤️','💘','💐'
  ];

  // Create 16 cards (8 pairs) by duplicating the smileys
  const [cards, setCards] = useState(
    [...smileys, ...smileys] // Create pairs
      .map((content, index) => ({ id: index, content, isFlipped: false }))
      .sort(() => Math.random() - 0.5) // Shuffle cards randomly
  );

  const [flippedCards, setFlippedCards] = useState([]); // To keep track of flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // To store matched cards
  const navigate = useNavigate(); // Navigate hook to handle game completion
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const flipCard = (id) => {
    // Do nothing if card is already flipped or it's matched
    if (flippedCards.length === 2 || matchedCards.includes(id) || cards.find(card => card.id === id).isFlipped) return;

    const newCards = [...cards];
    const cardIndex = newCards.findIndex(card => card.id === id);
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);

    // Add flipped card to the list
    setFlippedCards(prev => [...prev, id]);

    if (flippedCards.length === 1) {
      // Compare the last two flipped cards
      const firstCard = cards.find(card => card.id === flippedCards[0]);
      const secondCard = cards.find(card => card.id === id);

      if (firstCard.content === secondCard.content) {
        // Cards match, mark them as matched
        setMatchedCards(prev => [...prev, firstCard.id, secondCard.id]);
      } else {
        // If no match, flip them back after a delay
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[cardIndex].isFlipped = false;
          resetCards[cards.findIndex(card => card.id === flippedCards[0])].isFlipped = false;
          setCards(resetCards);
        }, 1000);
      }

      // Reset flipped cards
      setFlippedCards([]);
    }
  };

  // Check if the game is won
  if (matchedCards.length === cards.length) {
    // Redirect to next page when all pairs are matched
    setTimeout(() => navigate('/game'), 1000);
  }
  // Start the music on user interaction
    useEffect(() => {
      const handleUserInteraction = () => {
        const audioElement = document.getElementById('summer');
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
    
    <div className="game-container">
      {/* Background music element */} 
      <audio id="summer" loop>
        <source src="/assets/Summer breeze.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <h3>To prove that her heart has matched and she has fallen for him You need to help her to match the smileys!!</h3>
      <div className="card-grid">
        {cards.map(card => (
          <div
            className="card"
            key={card.id}
            onClick={() => flipCard(card.id)}
          >
            {card.isFlipped || matchedCards.includes(card.id) ? (
              card.content // Display the smiley when flipped or matched
            ) : (
              '❓' // Display a question mark when the card is not flipped
            )}
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default MemoryMatch;
