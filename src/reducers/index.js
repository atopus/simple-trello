import merge from 'lodash/merge'

import { combineReducers } from 'redux'

import * as ActionTypes from '../actions'
// import paginate from './paginate'
// Is redux form really useful ?
import { reducer as formReducer } from 'redux-form'

import boards, * as fromBoards from './boards'
import lists, * as fromLists from './lists'
import cards, * as fromCards from './cards'

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

// Pas sûr que ce soit la bonne solution.
const getBoard = (state, id) => fromBoards.getBoard(state.boards, id)
const getList = (state, id) => fromLists.getList(state.lists, id)
const getCard = (state, id) => fromCards.getCard(state.cards, id)

export default combineReducers({
    formReducer, // unsure whether it is necessary.
    boards, // Reducer from boards
    errorMessage,
})
