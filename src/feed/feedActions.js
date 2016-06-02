export const SET_TWEETS = 'SET_TWEETS'

export function requestTweets (username) {
  return dispatch => {
    fetch(`/api/tweets?username=${username}`)
      .then(res => res.json())
      .then(json => {
        dispatch(setTweets(json.tweets))
      })
  }
}

export function setTweets (tweets) {
  return {
    type: SET_TWEETS,
    tweets
  }
}

export function createTweet (tweet) {
  return dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify(tweet),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/tweets', options)
      .then(res => res.json())
      .then(json => {
        dispatch(setTweets(json.tweets))
      })
  }
}
