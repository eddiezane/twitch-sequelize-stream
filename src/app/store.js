import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import feed from '../feed/feedReducer'

const rootReducer = combineReducers({
  feed
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store
