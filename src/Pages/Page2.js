// src/Pages/Page2.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Page2.css';

const Page2 = () => {
  return (
    <div className="page2-container">
      <div className="story-container">
        <div className="story-text">
          <h2>Once upon a time, a girl named Anusha met a boy named Adarsh ..</h2>
          <h2> It is a story where the she fell in love with the boy even before meeting him....</h2>
          
          <p>To prove her love and unlock the final surprise, you must help her to complete a few fun challenges!</p>
        </div>
        <div className="mystery-box">
          <Link to="/games">
            <button className="continue-btn">Let the adventure begin!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page2;
