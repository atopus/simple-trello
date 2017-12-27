// This file is now unused and should be removed as deemed necessary.

import { combineReducers } from 'redux';
import {
    SUBMIT_LIST,
    SUBMIT_NEW_CARD,
    HANDLE_DROP,
    ARCHIVE_POST,
    SELECT_ACTIVE_BOARD
} from '../actions/ActionTypes';
import uniqueId from 'lodash/uniqueId';

// Ne devrait-il pas créer une initialisation avec listItems ?
// par défaut ?
const ListReducer = (state = {}, action) => {

    const listId = uniqueId("list_");

    switch (action.type) {

        case SELECT_ACTIVE_BOARD:
            return action.id;

        case SUBMIT_LIST:
            return {
                ...state,
                [listId]: { // the unique ID of the list
                    name: action.payload, // name of the list
                    id: listId, // list ID
                    cards: [] // card IDs go inside here
                }
            };

        case SUBMIT_NEW_CARD: {
            const { listId, cardName, cardId } = action.payload;
            const currentList = state[listId];
            currentList.cards.push({ name: cardName, cardId, listId, isArchived: false })
            return {
                ...state,
                [listId]: currentList,
            }
        }

        case HANDLE_DROP: {
            const { cardId, cardName, listId, newListId } = action.payload;
            const currentList = state[newListId]; // list that's going to be taking the new card
            currentList.cards.push({ name: cardName, cardId, listId: newListId }) // add the card to the list
            const removeCard = state[listId].cards.find(card => card.cardId === cardId); // find the card to remove
            const oldList = state[listId].cards.splice(removeCard, 1) // remove the card from the list

                return {
                    ...state,
                    [newListId]: currentList,
                }
        }

        case ARCHIVE_POST: {
            const { cardId, listId } = action.payload;
            const currentList = state[listId];
            const findCard = currentList.cards.find(card => card.cardId === cardId);

            if (findCard.isArchived === false) {
                findCard.isArchived = true;
            } else {
                findCard.isArchived = false;
            }

            return {
                ...state,
                [listId]: currentList
            }
        }

        default:
            return state;
    }
}


const ActiveBoardReducer = combineReducers({
    listItems: ListReducer,
})

export default ActiveBoardReducer;
