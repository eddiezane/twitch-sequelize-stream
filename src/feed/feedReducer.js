import { SET_TWEETS } from './feedActions'

const initialState = {
  tweets: []
}

export default function feed (state = initialState, action) {
  switch (action.type) {
    case SET_TWEETS:
      const nextState = Object.assign({}, state, { tweets: action.tweets })
      return nextState
    default:
      return state
  }
}
