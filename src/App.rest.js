import { createStore, applyMiddleware } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import 'cross-fetch/polyfill';

import * as types from './actions/ActionTypes';
import * as actions from './actions'
import * as reducers from './reducers';
// import createBoardReducer from './reducers/CreateBoardReducer';

import realStore from './Store';

// it('works with thunk middleware', done => {
//   const store = applyMiddleware(thunk)(createStore)(reducers.todos)

//   store.dispatch(addTodoIfEmpty('Hello'))
//   expect(store.getState()).toEqual([
//     {
//       id: 1,
//       text: 'Hello'
//     }
//   ])

//   store.dispatch(addTodoIfEmpty('Hello'))
//   expect(store.getState()).toEqual([
//     {
//       id: 1,
//       text: 'Hello'
//     }
//   ])

//   store.dispatch(addTodo('World'))
//   expect(store.getState()).toEqual([
//     {
//       id: 1,
//       text: 'Hello'
//     },
//     {
//       id: 2,
//       text: 'World'
//     }
//   ])

//   store.dispatch(addTodoAsync('Maybe')).then(() => {
//     expect(store.getState()).toEqual([
//       {
//         id: 1,
//         text: 'Hello'
//       },
//       {
//         id: 2,
//         text: 'World'
//       },
//       {
//         id: 3,
//         text: 'Maybe'
//       }
//     ])
//     done()
//   })
// })

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  activeBoard: null,
  boardsCollection: [],
  newBoard: null,
  activeBoardData: null
});

// Sync test
describe('actions', () => {

  var boardId = null;
  var listId = null;
  var cardId = null;

  it('handles a CREATE_BOARD action', () => {

    const store = applyMiddleware(thunk)(createStore)(reducers.boards);
    
    const title = "Test simple-trello";

    store.dispatch(actions.createBoard(title));
    expect(store.getState()).toContainEqual({
      id: "1",
      title: title,
      // Pourquoi faudrait-il ajouter isBoardOpen / success ? C'est de l'interprétation à faire au niveau
      // des container ou des components, pas du state.
      // isBoardOpen: false,
      // success: false
    });
  });

  it('handle a SELECT_BOARD action', () => {

    const initialState = [{
        title: "board to select",
        id: 1
    }]

    const store = applyMiddleware(thunk)(createStore)(reducers.boards, initialState)

    store.dispatch(actions.selectBoard(1))
    const res = store.getState()
    expect(store.getState()).toContainEqual({
      title: "board to select",
      id: 1,
      isSelected : true
    })
  })

  it('handles a CREATE_LIST action', () => {

    const initialBoard = {
      title: "board to populate",
      id: "1"
    }
    const initialState = [initialBoard]

    const listTitle = "Title of the newly created list"

    const store = applyMiddleware(thunk)(createStore)(reducers.boards, initialState)

    store.dispatch(actions.createList(listTitle, initialBoard.id))
    expect(store.getState()).toContainEqual({
      ...initialBoard,
      lists: [{
        id: "list_2",
        title: listTitle 
      }] 
    })
  })

  it('handles a CREATE_CARD action', () => {

    const initialList = {
      title: "list to populate with card",
      id: "list_2"
    }

    const initialBoard = {
      title: "board to populate",
      id: "1",
      lists : [ initialList ]
    }

    const initialState = [ initialBoard ]

    const cardTitle = "Title of the newly created card"
    const store = applyMiddleware(thunk)(createStore)(reducers.boards, initialState)
    store.dispatch(actions.createCard())
    expect(store.getState()).toContainEqual({
      ...initialBoard,
      lists : [{
        ...initialList,
        cards: [{
          id: 'card_3',
          cardTitle: cardTitle,
        }]
      }]
    })
  })
})
