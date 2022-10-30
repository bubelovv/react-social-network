import {getAuthUserData} from "./authReducer";
import {BaseThunkType, InferValueTypes} from "./store";

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS'

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export const actions = {
    initializedSuccess: () => ({type: SET_INITIALIZED_SUCCESS}) as const
}

type ThunkType = BaseThunkType<ActionTypes>

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = await dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(actions.initializedSuccess())
}

const initialState = {
    initialized: false,
}

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS: {
            return {...state, initialized: true}
        }
        default:
            return state
    }
}

export default appReducer;
