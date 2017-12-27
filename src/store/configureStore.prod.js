import throttle from 'lodash/throttle';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import { saveState, loadState } from './utils/SyncBoardCollectionLocalStorage'
const persistedState = loadState();

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
  )
  store.subscribe(throttle(() => {
    saveState({
        boards: store.getState().boards,
        lists : store.getState().lists,
        cards : store.getState().cards
    })
  }, 1000));

  return store
}
export default configureStore
