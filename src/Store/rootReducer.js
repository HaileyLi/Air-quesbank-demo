import { combineReducers } from 'redux'
import todos from '../containers/HomePage/reducers/todos'
import visibilityFilter from '../containers/HomePage/reducers/visibilityFilter'
import dataReducer from "../containers/Management/reducer";

export default combineReducers({
    todos,
    visibilityFilter,
    data: dataReducer
})