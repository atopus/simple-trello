// This file is now unused and should be removed as deemed necessary.

import {
    SELECT_ACTIVE_BOARD,
    SELECT_ACTIVE_BOARD_SUCCESS,
    LIST_EDIT_MODE_ENABLED,
    STOP_EDITING_LIST,
} from '../actions/ActionTypes';


const initialState = {
    title: null,
    id: null,
    isFetching: false,
    isEditingList: false,
}

export default function(state = initialState, action) {

    switch (action.type) {

        case SELECT_ACTIVE_BOARD:
            return {
                ...state,
                // title: action.payload.title,
                id:  action.id,
                // isFetching: true
            }

        case SELECT_ACTIVE_BOARD_SUCCESS:
            return {
                ...state,
                isFetching: false
            }

        case STOP_EDITING_LIST:
            return {
                ...state,
                isEditingList: action.payload
            }

        case LIST_EDIT_MODE_ENABLED:
            return {
                ...state,
                isEditingList: action.payload
            };


        default:
            return {
                ...state
            };

    }
}
