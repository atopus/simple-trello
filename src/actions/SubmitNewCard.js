// This file is now unused and should be removed as needed.

import { SUBMIT_NEW_CARD } from './ActionTypes';
import uniqueId from 'lodash/uniqueId'

export default function submitNewCard(cardTitle,  listId, boardId) {
    return dispatch => {
        dispatch({ 
            type: SUBMIT_NEW_CARD,
            title: cardTitle,
            card : {
                id: uniqueId('card_'),
                title: cardTitle
            },
            listId: listId,
            boardId: boardId
        })
    }
}
