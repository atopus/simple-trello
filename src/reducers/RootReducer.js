import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CreateBoardReducer from './CreateBoardReducer';
import boards from './boards';

const rootReducer = combineReducers({
    form: formReducer,
    boards
})

export default rootReducer;
