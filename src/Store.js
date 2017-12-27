// This file is now unused and should be removed as needed.

import throttle from 'lodash/throttle';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import RootReducer from './reducers/RootReducer'

import { loadState, saveState } from './utils/SyncBoardCollectionLocalStorage'

const middleware = applyMiddleware(thunk);
const persistedState = loadState();

const Store =  createStore(
    RootReducer,
    persistedState,
    composeWithDevTools(middleware),
);

Store.subscribe(throttle(() => {
    saveState({
        boardsCollection: Store.getState().boardsCollection,
        activeBoard: Store.getState().activeBoard,
        newBoard: Store.getState().newBoard,
        activeBoardData: Store.getState().activeBoardData,
    })
}, 1000));

export default Store;
