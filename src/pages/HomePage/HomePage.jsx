import moment from 'moment';
import { Container } from 'react-bootstrap';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import CreateTweet from './components/TweetFormReducerVer';
import TweetsList from './components/TweetsList';
import TweetsContext from '../../context/TweetsContext';
import NavBar from '../../components/NavBar';

export default function HomePage() {
  const { tweets, setTweets, setTweetsCount } = useContext(TweetsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const savedUsername = localStorage.getItem('username') || 'Xin';
  const APIEndpoint = 'https://64bf87370d8e251fd110f72a.mockapi.io/microblog/tweets';

  const fetchTweets = useCallback((page) => {
    const url = new URL(APIEndpoint);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', 10);
    url.searchParams.append('orderBy', 'date');
    url.searchParams.append('order', 'desc');

    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } throw new Error('Network response was not ok');
      })
      .then((tasks) => {
        const tweetsWithFormattedDates = tasks.map(task => ({
          ...task,
          date: moment(task.date).format('DD MMM YYYY, kk:mm:ss')
        }));

        setIsLoading(false);
        if (page === 1) {
          setTweets(tweetsWithFormattedDates);
        } else {
          setTweets((prevTweets) => [...prevTweets, ...tweetsWithFormattedDates]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [setTweets]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  })

  useEffect(() => {
    fetchTweets(page);
  }, [fetchTweets, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const addTweet = useCallback((user, text) => {
    const newTweet = {
      user: savedUsername || user,
      text: text,
      date: moment().unix(),
    };
    setIsLoading(true);

    fetch(APIEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTweet)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } throw new Error('Network response was not ok');
    }).then(task => {
      const receivedUnixTimestamp = task.date;
      const formattedDate = moment.unix(receivedUnixTimestamp).format('DD MMM YYYY, kk:mm:ss');
      const updatedTweet = { ...newTweet, date: formattedDate };
      setTweets((prevTweets) => [updatedTweet, ...prevTweets]);
      setTweetsCount((prevCount) => prevCount + 1);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error posting data:', error);
      setIsLoading(false);
    });
  }, [setTweets, setTweetsCount, savedUsername])

  return (
    <Container fluid='md' className='h-100'>
      <NavBar />
      <CreateTweet addTweet={addTweet} isLoading={isLoading} />
      <TweetsList tweets={tweets} isLoading={isLoading} />
    </Container>
  );
}