import { applyMiddleware, createStore } from 'redux';
import rootReducer from "./rootReducer";


// Logger with default options
import logger from 'redux-logger'
const store = createStore(
    rootReducer,
    applyMiddleware(logger)
)

export default store;