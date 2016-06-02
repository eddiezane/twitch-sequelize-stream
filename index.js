const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const { join } = require('path')
const Sequelize = require('sequelize')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require(join(__dirname, 'webpack.config.js'))

const app = express()
const webpackCompiler = webpack(webpackConfig)

const db = new Sequelize('twitchdb', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const User = db.define('user', {
  username: {
    type: Sequelize.STRING
  }
})

const Tweet = db.define('tweet', {
  text: {
    type: Sequelize.STRING
  }
})

User.hasMany(Tweet)
Tweet.belongsTo(User)

app.use(webpackDevMiddleware(webpackCompiler))
app.use(webpackHotMiddleware(webpackCompiler))
app.use(express.static(join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
  res.send(', World!')
})

app.get('/api/users', (req, res) => {
  User.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: Tweet }]
  })
  .then(users => {
    res.json({
      users
    })
  })
})

app.get('/api/tweets', (req, res) => {
  Tweet.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User }]
  })
  .then(tweets => {
    res.json({
      tweets
    })
  })
})

app.post('/api/tweets', (req, res) => {
  const { text, username } = req.body
  if (!text || !username) {
    return res.status(400).json({ message: 'Text and username are required' })
  }

  User.findOrCreate({ where: { username }, defaults: { username } })
    .then(([user, create]) => {
      return user.createTweet({ text })
    })
    .then(() => {
      return Tweet.findAll({
        order: [['createdAt', 'DESC']],
        include: [{ model: User }]
      })
    })
    .then(tweets => {
      res.json({
        tweets
      })
    })
})

db.sync({ force: true })
  .then(() => {
    app.listen(3000)
    User.create({
      username: 'eddiezane'
    })
    .then(user => {
      user.createTweet({
        text: 'Hello, World!'
      })
      user.createTweet({
        text: 'I like tacos'
      })
    })
    User.create({
      username: 'tacomaster'
    })
    .then(user => {
      user.createTweet({
        text: 'Hello, World!'
      })
      user.createTweet({
        text: 'I like tacos'
      })
    })
  })
