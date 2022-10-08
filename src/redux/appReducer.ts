import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./reduxStore";

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS'

interface initializedSuccessInterface {
    type: typeof SET_INITIALIZED_SUCCESS
}
type ActionTypes = initializedSuccessInterface
type ThunkType = ThunkAction<Promise<void>, RootState, undefined, ActionTypes>

export const initializedSuccess = (): initializedSuccessInterface => ({type: SET_INITIALIZED_SUCCESS})

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = await dispatch(getAuthUserData())
    await Promise.all([promise])                           //Возможно здесь неправильно
    dispatch(initializedSuccess())
}

export interface InitialState {
    initialized: boolean
}

const initialState: InitialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS: {
            return {...state, initialized: true}
        }
        default:
            return state
    }
}

export default appReducer;
