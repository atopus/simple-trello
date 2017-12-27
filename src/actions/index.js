import uniqueId from 'lodash/uniqueId'

import * as types from '../constants/ActionTypes'

const generateId = () => Number(uniqueId())

export const createBoard = (title) => ({
  type: types.CREATE_BOARD,
  id: generateId(),
  title
})

export const createList = (title, boardId) => ({
  type: types.CREATE_LIST,
  id: generateId(),
  title,
  boardId
})

export const createCard = (title, listId, boardId) => ({
  type: types.CREATE_CARD,
  id: generateId(),
  title,
  boardId,
  listId
})

export const selectBoard = (id) => ({
  type: types.SELECT_BOARD,
  id
})