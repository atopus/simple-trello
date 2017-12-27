// This file is now unused and should be removed as needed.

import find from 'lodash/find'
import {
    SELECT_ACTIVE_BOARD,
    SELECT_ACTIVE_BOARD_SUCCESS,
} from './ActionTypes'
// Store & getState() should not be called here.
// import Store from './../Store';

export default function selectActiveBoard(id) {
    return dispatch => {

        // const boardsCollection = Store.getState().boardsCollection;
        // const activeBoard = find(boardsCollection, board => board.id === id);

        dispatch({ 
            type: SELECT_ACTIVE_BOARD, 
            id: id // activeBoard 
        })

        dispatch({ 
            type: SELECT_ACTIVE_BOARD_SUCCESS 
        })

    }
}
