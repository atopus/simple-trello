import {
    SUBMIT_NEW_BOARD,
    STORE_NEW_BOARD_TO_COLLECTION,
} from './ActionTypes';
// For testing reason & in order to use createStore
// from within testing unis, my guess is that store 
// should not used in action creators. + check Dan 
// answer to this: 
// https://stackoverflow.com/questions/35667249/accessing-redux-state-in-an-action-creator
// import Store from './../Store';
// Then use here the function uniqueId that was called in reducer createBoardReducer
import uniqueId from 'lodash/uniqueId';

export default function submitNewBoard(title) {
    return dispatch => {

        const id = uniqueId('');

        dispatch({ 
            type: SUBMIT_NEW_BOARD,
            id: id,
            title: title
        });

        dispatch({ 
            type: STORE_NEW_BOARD_TO_COLLECTION, 
            id: id,
            title : title  
        });

    }
}
