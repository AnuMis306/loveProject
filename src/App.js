import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
import Page4 from './Pages/Page4';
import Page5 from './Pages/Page5';
import PuzzleGame from './Pages/PuzzleGame';
import FinalGame from './Pages/FinalGame';
import { Helmet } from "react-helmet";

function App() {


  return (
    <Router>
      <Helmet>
          {/* Set meta tag for viewport */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Adarsh</title>
          {/* Additional head tags can be added here */}
        </Helmet>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/story" element={<Page2 />} />
        <Route path="/games" element={<Page3 />} />
        <Route path="/confession" element={<Page4 />} />
        <Route path="/memories" element={<Page5 />} />
        <Route path="/game" element={<PuzzleGame />} /> 
        <Route path="/game3" element={<FinalGame />} /> 
      </Routes>
    </Router>
  );
}

export default App;
