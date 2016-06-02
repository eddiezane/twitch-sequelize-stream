import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestTweets, createTweet } from './feedActions'

export default class Feed extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.requestTweets()
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(e)
    const username = this.refs.username.value
    const text = this.refs.text.value
    if (text && username) {
      this.props.createTweet({
        text,
        username
      })
    this.refs.username.value = ''
    this.refs.text.value = ''
    }
  }

  render () {
    const tweets = this.props.tweets.map((tweet, index) => {
      return <li key={index}><b>{tweet.user.username}</b>: {tweet.text}</li>
    })
    return (
      <div>
        <h1>I am the feed component</h1>
        <form onSubmit={this.handleSubmit}>
          <label for='username'>
            <input ref='username' id='username' type='text' placeholder='amy smith' />
          </label>
          <label for='text'>
            <input ref='text' id='text' type='text' placeholder='Today I...' />
          </label>
          <button type='submit'>Submit</button>
        </form>
        <ul>
          {tweets}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tweets: state.feed.tweets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestTweets () {
      dispatch(requestTweets())
    },
    createTweet (tweet) {
      dispatch(createTweet(tweet))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
