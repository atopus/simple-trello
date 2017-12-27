import * as actions from '../constants/ActionTypes'
import reducer, * as boards from './boards'
import listReducer, * as fromLists from './lists'

describe('reducers', () => {
  describe('boards', () => {
    let state

    describe('when the app starts', () => {

      it('the byId state contains no board', () => {
        //FIXME: Seems like the state start with one
        // object { "1" : {}}. Can't see how... 
        expect(boards.getBoards(state)).toEqual({})
      })

      it('the allIds state boards is empty', () => {
        expect(boards.getBoardsIds(state)).toEqual([])
      })
    })

    describe('when boards are loaded', () => {

      beforeEach(() => {
        state = reducer({}, {
          type: actions.LOAD_BOARDS,
          boards: [
            {
              id: 1,
              title: 'Board 1'
            },
            {
              id: 2,
              title: 'Board 2'
            }
          ]
        })
      })

      it('contains the boards from the action', () => {
        expect(boards.getBoard(state, 1)).toEqual({
          id: 1,
          title: 'Board 1'
        })
        expect(boards.getBoard(state, 2)).toEqual({
          id: 2,
          title: 'Board 2'
        })
      })

      it('contains no other boards', () => {
        expect(boards.getBoard(state, 3)).toEqual(undefined)
      })

      it('contains no selected board', () => {
        expect(boards.getSelectedBoard(state)).toEqual(undefined)
      })

      describe('when a board is selected', () => {

        beforeEach(() => {
          state = reducer(state, { 
            type: actions.SELECT_BOARD, 
            boardId: 1 
          })
        })

        it('returns as the selected one and with the full data', () => {
          expect(boards.getSelectedBoard(state)).toEqual(
            {
              id: 1,
              title: 'Board 1'
          })
        })

        describe('when a new list is created', () => {
          state = reducer(state, {
            type: actions.CREATE_LIST,
            boardId: 1,
            title: "New list created"
          })

          // it('is associated with the active board', () => {
          //   expect(boards.getLists(state).toContainEqual({
          //     id: 1,
          //     boardId: 1,
          //     title: "New list created"
          //   }))
          // })
        })
      })

      describe('when a new board is created', () => {

        beforeEach(() => {
          state = reducer(state, {
            type: 'CREATE_BOARD',
            id: 3,
            title: 'Board 3'
          })
        })
        
        it('the state contains the new board', () => {
          expect(boards.getBoard(state, 3)).toMatchObject({
            id: 3,
            title: 'Board 3',
          })
        })

        it('the state also contains the previous boards', () => {
          expect(boards.getBoard(state, 1)).toEqual({
            id: 1,
            title: 'Board 1'
          })
          expect(boards.getBoard(state, 2)).toEqual({
            id: 2,
            title: 'Board 2'
          })
        })

        it('the board is set as the active board', () => {
          expect(boards.getSelectedBoard(state, 3)).toMatchObject({
            id: 3,
            title: 'Board 3'
          })
        })
      })
    })
  })
})
