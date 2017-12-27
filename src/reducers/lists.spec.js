import * as actions from '../constants/ActionTypes'
import reducer, * as lists from './lists'

describe('reducers', () => {
  describe('lists', () => {
    let state

    describe('when a list is added', () => {

      const listTitle = 'New list to be added.'

      beforeEach(() => {
        state = reducer(state, {
          type: actions.CREATE_LIST,
          id : 1,
          boardId: 1,
          title: listTitle
        })
      })
      
      it('the active board contains the list', () => {
        expect(lists.getLists(state)).toEqual({
            '1' : {
              id: 1,
              boardId: 1,
              title: listTitle
          }
        })
      })

      it('the list can be selected from the active board', () => {
        expect(lists.getList(state, 1, 1)).toMatchObject({
          id: 1,
          boardId: 1,
          title: listTitle
        })
      })
    })
  })
})