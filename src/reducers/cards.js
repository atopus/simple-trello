/**
 * A card must know the id of its parent list.
 */

import { combineReducers } from 'redux'

import { 
  CREATE_CARD 
} from '../constants/ActionTypes'
import boards, * as fromBoards from './boards'
import lists, * as fromLists from './lists'

/**
 * Reducer of the byId key.
 * 
 * @param {object} state 
 * @param {object} action 
 */
const byId = (state = {}, action) => {
  switch(action.type) {
    case CREATE_CARD:
      const { id } = action
      return {
        ...state,
        [id] : {
          id: id,
          listId : action.listId,
          title: action.title
        } 
      }
    default:
      const { cardId } = action
        if (cardId) {
          return {
            ...state,
            [cardId]: lists(state[cardId], action)
          }
        }
			return state
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case CREATE_CARD:
      return [
        ...state,
        action.id
      ]
    default:
      return state
  }
}

export default combineReducers({
  byId,
  allIds
})

export const getCards = (state) => state.byId
export const getCardsIds = (state) => state.allIds
export const getCard = (state, id) => state.byId[id]