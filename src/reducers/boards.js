import { combineReducers } from 'redux'
import { 
    LOAD_BOARDS,
    SELECT_BOARD 
} from '../constants/ActionTypes'

const initialState = {};

const boards = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const byId = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOARDS:
            return {
                ...state,
                ...action.boards.reduce((obj, board) => {
                    obj[board.id] = board
                    return obj
                }, {})
            }
        default:
            const { boardId } = action
            if (boardId) {
                return {
                    ...state,
                    [boardId]: boards(state[boardId], action)
                }
            } 
            return state || initialState
    }
}

const selectedId = ( state = null, action) => {
    switch(action.type) {
        case SELECT_BOARD:
            return action.boardId
        default:
            return state
    }
}

export default combineReducers({
    byId,
    selectedId
})

export const getSelectedBoard = state =>
    state.byId[state.selectedId]

/**
 * Returns the board by id, populated with its data.
 * 
 * @param {*} state 
 * @param {*} id 
 */
export const getBoard = (state, id) =>
    state.byId[id]

/**
 * Returns the list of boards.
 * @param {*} state 
 */
// Not very useful, only for test & selector 
// coherence.
export const getBoards = state => 
    state.byId

// export const getList = (state, id, boardId) =>
//     state.byId[boardId].lists.map(list => {
//         //FIXME : va me remplir le tableau avec des undefined.
//         (list.id === id) ? list : undefined
//     })