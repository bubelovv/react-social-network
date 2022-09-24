import {getAuthUserData} from "./authReducer";

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS'

export const initializedSuccess = () => ({type: SET_INITIALIZED_SUCCESS})

export const initializeApp = () => async dispatch => {
    let promise = await dispatch(getAuthUserData())
    await Promise.all([promise])  //Возможно здесь неправильно
    dispatch(initializedSuccess())
}

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS: {
            return {...state, initialized: true}
        }
        default:
            return state
    }
}

export default appReducer;
