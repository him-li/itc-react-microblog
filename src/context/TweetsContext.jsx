import React from 'react';

const TweetsContext = React.createContext({
    tweets: '',
    setTweets: () => { },
    tweetsCount: 0,
    setTweetsCount: () => [],
});

export default TweetsContext;