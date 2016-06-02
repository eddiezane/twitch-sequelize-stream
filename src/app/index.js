import React from 'react'
import store from './store'
import { Provider } from 'react-redux'
import Feed from '../feed/Feed'

const App = function app() {
  return (
    <Provider store={store}>
      <Feed />
    </Provider>
  )
}

export default App
