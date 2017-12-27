import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import * as ActionTypes from '../actions'
import { reducer as formReducer } from 'redux-form' // Is redux form really useful ?
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

export default combineReducers({
  formReducer, // unsure whether it is necessary.
  boards, // Reducer from boards
  lists,
  cards,
  errorMessage,
})

export const getBoard = (state, id) => fromBoards.getBoard(state.boards, id)
export const getBoards = (state) => fromBoards.getBoards(state)
export const getSelectedBoard = (state) => fromBoards.getSelectedBoard(state)
export const getList = (state, id) => fromLists.getList(state.lists, id)
export const getLists = (state) => fromLists.getLists(state)
export const getCard = (state, id) => fromCards.getCard(state.cards, id)
export const getCards = (state) => fromCards.getCards(state)
