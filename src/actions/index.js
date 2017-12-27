import * as types from '../constants/ActionTypes'

export const createBoard = (title) => ({
  type: types.CREATE_BOARD,
  title
})

export const createList = (title, boardId) => ({
  type: types.CREATE_LIST,
  title,
  boardId
})

export const createCard = (title, listId, boardId) => ({
  type: types.CREATE_CARD,
  title,
  boardId,
  listId
})

export const selectBoard = (id) => ({
  type: types.SELECT_BOARD,
  id
})