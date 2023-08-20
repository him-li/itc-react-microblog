import './App.css';
import { Container, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';

import Router from './Router';
import TweetsContext from './context/TweetsContext';

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [tweetsCount, setTweetsCount] = useState(0);
  const APIEndpoint = 'https://64bf87370d8e251fd110f72a.mockapi.io/microblog/tweets';

  useEffect(() => {
    fetch(APIEndpoint, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } throw new Error('Network response was not ok');
    }).then((tweets) => {
      setTweetsCount(tweets.length);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <TweetsContext.Provider value={{ tweets, setTweets, tweetsCount, setTweetsCount }}>
      <Container>
        <Nav className='sticky-top justify-content-start bg-card p-1 mb-5 w-100 rounded' activeKey='/home'>
          <Nav.Item>
            <OverlayTrigger
              key='bottom'
              placement='bottom'
              overlay={<Tooltip id={`tooltip-$'bottom'`}>{tweetsCount} tweets published</Tooltip>}>
              <Nav.Link
                href='/home'
                className='link-light link-opacity-100-hover link-opacity-50'>Home</Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href='/profile'
              className='link-light link-opacity-100-hover link-opacity-50'>Profile</Nav.Link>
          </Nav.Item>
        </Nav>
        <Router />
      </Container>
    </TweetsContext.Provider>
  );
}