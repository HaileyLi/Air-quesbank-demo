import data from "../../Data/data.json";
import { FETCH_DATA, SAVE_DATA } from "./actionTypes";

export const doFetchData = () => {
    return {
        type: FETCH_DATA,
        payload: data
    }
}
export const doSaveData = data => {
    return {
        type: SAVE_DATA,
        payload: data
    }
}