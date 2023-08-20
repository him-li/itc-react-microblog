import moment from 'moment';
import { Container } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';

import CreateTweet from './components/TweetFormReducerVer';
import TweetsList from './components/TweetsList';
import TweetsContext from '../../context/TweetsContext';

export default function HomePage() {
  const tweetsContext = useContext(TweetsContext);
  const { tweets, setTweets, tweetsCount, setTweetsCount } = tweetsContext;
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const savedUsername = localStorage.getItem('username') || 'Xin';
  const APIEndpoint = 'https://64bf87370d8e251fd110f72a.mockapi.io/microblog/tweets';

  const fetchTweets = (page) => {
    const url = new URL(APIEndpoint);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', 10);
    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      } throw new Error('Network response was not ok');
    }).then(tasks => {
      setIsLoading(false);
      if (page === 1) {
        const sortedTweets = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTweets(sortedTweets);
      } else {
        setTweets((prevTweets) => {
          const sortedTweets = [...prevTweets, ...tasks].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          return sortedTweets;
        });
      }
    }).catch(error => {
      console.error('Error fetching data:', error);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    fetchTweets(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addTweet = (user, text) => {
    const newTweet = {
      user: savedUsername || user,
      text: text,
      date: new moment().format('DD MMM YYYY, kk:mm:ss')
    };
    setIsLoading(true);

    setTweets((prevTweets) => {
      const sortedTweets = [...prevTweets, newTweet].sort((a, b) => new Date(b.date) - new Date(a.date));
      return sortedTweets;
    });

    setTweetsCount((prevCount) => prevCount + 1);

    fetch(APIEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTweet)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } throw new Error('Network response was not ok');
    }).then(task => {
      const sortedTweets = [...tweets, newTweet].sort((a, b) => new Date(b.date) - new Date(a.date));
      setTweets(sortedTweets);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error posting data:', error);
      setIsLoading(false);
    })
  };

  return (
    <Container fluid='md' className='h-100'>
      <CreateTweet addTweet={addTweet} isLoading={isLoading} />
      <TweetsList tweets={tweets} isLoading={isLoading} />
    </Container>
  );
}