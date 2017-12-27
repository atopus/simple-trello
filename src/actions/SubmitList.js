import { SUBMIT_LIST } from './ActionTypes'
import uniqueId from 'lodash/uniqueId'

export default function submitList(title, boardId) {
    return dispatch => {
        dispatch({ 
            type: SUBMIT_LIST, 
            title: title,
            id: uniqueId('list_'),
            boardId: boardId 
        })
    }
}
