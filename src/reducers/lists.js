/**
 * A list must "know" the id of its parent board.
 * Toggle list is like a list selection.
 */
import { combineReducers } from 'redux'

import { 
	CREATE_LIST 
} from '../constants/ActionTypes'
import cards, * as fromCards from './cards'
import boards, * as fromBoards from './boards'

const lists = (state, action) => {
	switch(action.type) {
		// case CREATE_LIST:
		// 	const { id } = action 
		// 	return {
		// 		...state,
		// 		lists: lists.byId(
		// 			state.lists || {},
		// 			action
		// 		)
		// 	}
		default:
			return state
	}
}

const initialState = {}

/**
 * Reducer of the byId key.
 * 
 * @param {object} state 
 * @param {object} action 
 */
const byId = (state = initialState, action) => {

  switch(action.type) {
		case CREATE_LIST:
			const { id } = action
			return {
				...state,
				[id] : {
					id: id,
					boardId : action.boardId,
					title: action.title
				} 
			}
		default:
			const { listId } = action
			if (listId) {
				return {
					...state,
					[listId]: lists(state[listId], action)
				}
			}
			return state
  }
}

const allIds = (state = [], action) => {
	switch(action.type) {
		case CREATE_LIST:
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

export const getLists = (state, id) =>
	state.byId || {} // Not sure this is the best way.
	// Should initialization occur here ?

export const getList = (state, id) =>
	state.byId[id]

export const getCard = (state, id, listId) =>
  fromCards.getCard(state, id)