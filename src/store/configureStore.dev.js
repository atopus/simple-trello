import throttle from 'lodash/throttle';

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

import { saveState, loadState } from '../utils/SyncBoardCollectionLocalStorage'
const persistedState = loadState();

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk),//, api, createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

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
