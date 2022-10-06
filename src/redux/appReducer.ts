import {getAuthUserData} from "./authReducer";

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS'

interface initializedSuccessInterface {
    type: typeof SET_INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessInterface => ({type: SET_INITIALIZED_SUCCESS})

export const initializeApp = () => async (dispatch: any) => {
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

const appReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS: {
            return {...state, initialized: true}
        }
        default:
            return state
    }
}

export default appReducer;
