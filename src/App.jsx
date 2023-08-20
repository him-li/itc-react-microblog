import './App.css';
import { BrowserRouter } from 'react-router-dom';

import React, { useState } from 'react';

import Router from './Router';
import TweetsContext from './context/TweetsContext';

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [tweetsCount, setTweetsCount] = useState(0);

  return (
    <TweetsContext.Provider value={{ tweets, setTweets, tweetsCount, setTweetsCount }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </TweetsContext.Provider>
  );
}