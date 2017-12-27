/**
 * Only one board is active (selected) at a given time.
 */
import { combineReducers } from 'redux'

import { 
	LOAD_BOARDS,
	CREATE_BOARD,
	SELECT_BOARD,
	CREATE_LIST,
	CREATE_CARD
} from '../constants/ActionTypes'
import lists from './lists'

const initialState = {};

/**
 * Complement reducer of the "boards".
 * Seems to be the reducer of just one
 * item of the boards collection.
 * 
 * Should be remaned board ? rather the boards ?
 * 
 * @param {object} state 
 * @param {object} action 
 */
const boards = (state = {}, action) => {
	switch (action.type) {
		default:
			return state
	}
}

/**
 * Reducer of the byId key.
 * 
 * @param {object} state 
 * @param {object} action 
 */
const byId = (state = initialState, action) => {

	switch (action.type) {
		case LOAD_BOARDS:
			return action.boards ? {
				...state,
				...action.boards.reduce((obj, board) => {
					obj[board.id] = board
					return obj
				}, {})
			} : state

		case CREATE_BOARD:
			const { id } = action
			return {
				...state,
				[id] : {
					id: action.id,
					title: action.title,
					lists: lists
				} 
			}
		default:
			// If a boardId is provided in the action,
			// then return the 
			const { boardId } = action
			if (boardId) {
				return {
					...state,
					[boardId]: boards(state[boardId], action)
				}
			} 
			return state
	}
}

const allIds = (state = [], action) => {
	switch(action.type) {
		case LOAD_BOARDS:
			return action.boards.map( board => board.id)
		case CREATE_BOARD:
			return [
				...state,
				action.id
			] 
		default:
			return state 
	}
}

/**
 * Reducer of the selectedId key.
 * 
 * @param {object} state 
 * @param {object} action 
 */
const selectedId = ( state = null, action) => {
	switch(action.type) {
		case SELECT_BOARD:
			return action.boardId
		case CREATE_BOARD:
			return action.id
		default:
			return state
	}
}

export default combineReducers({
	byId,
	allIds,
	selectedId
})

/**
 * 
 * @param {object} state 
 */
export const getSelectedBoard = state =>
	state.byId[state.selectedId]

/**
 * Returns the board by id, populated with its data.
 * 
 * @param {object} state 
 * @param {number} id 
 */
export const getBoard = (state, id) =>
	state.byId[id]
export const getBoards = state => 
	state.byId
export const getBoardsIds = state => 
	state.allIds

/**
 * Returns the lists of the currently selected board.
 * If no board is currently selected, returns {}.
 * 
 * @param {object} state 
 */
export const getLists = (state) =>
	state.byId[state.selectedId].lists || {}

/**
 * 
 * @param {object} state Current state 
 * @param {number} id 
 * @param {number} boardId Id of the parent board. Default to the state selected board.
 */
export const getList = (state, id, boardId = state.selectedId) =>
	state.byId[boardId].lists.map(list => {
		//FIXME : not appropriate - will populate list with undefined
		(list.id === id) ? list : undefined
	})

// export const getCard = (state, id, listId, boardId) =>
//   fromLists.getCard(state, id, listId, boardId)