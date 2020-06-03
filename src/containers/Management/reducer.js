import { FETCH_DATA, SAVE_DATA } from "./actionTypes";

const dataReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return action.payload;
        case SAVE_DATA:
            return action.payload;
        default:
            return state;
    }
}

export default dataReducer;