import reducer, * as boards from './boards'

describe('reducers', () => {
  describe('boards', () => {
    let state

    // For now, there is no specific action for 
    // a starting app.
    describe('when the app starts', () => {
      state = reducer({}, { type: 'LOAD_BOARDS', boards : [] })

      it('the state contains no board', () => {
        expect(boards.getBoards(state)).toEqual({})
      })
    })

    describe('when boards are loaded', () => {

      beforeEach(() => {
        state = reducer({}, {
          type: 'LOAD_BOARDS',
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
            type: 'SELECT_BOARD', 
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
      })
    })
  })
})
