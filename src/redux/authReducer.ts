import {authApi} from '../API/api'
import {ThunkAction} from "redux-thunk";
import {RootState} from "./reduxStore";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const SET_CAPTCHA = 'SET_CAPTCHA'
const CLEAR_CAPTCHA = 'CLEAR_CAPTCHA'

interface SetAuthUserDataPayload {
    id: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
}

interface SetAuthUserData {
    type: typeof SET_AUTH_USER_DATA;
    payload: SetAuthUserDataPayload;
}

interface SetCaptcha {
    type: typeof SET_CAPTCHA;
    urlCaptcha: string;
}

interface ClearCaptcha {
    type: typeof CLEAR_CAPTCHA;
}

type ActionTypes = SetAuthUserData | SetCaptcha | ClearCaptcha
type ThunkType = ThunkAction<Promise<void>, RootState, undefined, ActionTypes>

export const setAuthUserData = (id: number | null, email: string | null,
                                login: string | null, isAuth: boolean): SetAuthUserData => ({
    type: SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth},
})

export const setCaptcha = (urlCaptcha: string): SetCaptcha => ({type: SET_CAPTCHA, urlCaptcha})

export const clearCaptcha = (): ClearCaptcha => ({type: CLEAR_CAPTCHA})

// interface ApiData {
//     id: number | null;
//     email: string | null;
//     login: string | null;
// }

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authApi.auth()
    if (Object.keys(data).length) {
        // let {id, email, login} = {...data}
        dispatch(setAuthUserData(data.id, data.email, data.login, true))
    }
}

export interface LoginData {
    email: string;
    password: string;
    checkbox: boolean;
    captcha: string | null;
}

export const login = (data: LoginData, setError: any): ThunkType => {
    const {email, password, checkbox, captcha} = data;

    return async (dispatch) => {
        let data = await authApi.loginPost(email, password, checkbox, captcha)
        if (data.resultCode === 0) {
            await dispatch(getAuthUserData())
            await dispatch(clearCaptcha())
        } else if(data.resultCode === 10) {
            await dispatch(getCaptcha())
        } else {
            setError('login', {type: 'server', message: data.messages[0]});
            setError('password', {type: 'server', message: data.messages[0]});
        }
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authApi.loginDelete()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => {
    let urlCaptcha = await authApi.getCaptcha()
    dispatch(setCaptcha(urlCaptcha))
}

export interface InitialState {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    urlCaptcha: string | null,
}

let initialState: InitialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    urlCaptcha: null,
}

const authReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {...state, ...action.payload,}
        }
        case SET_CAPTCHA: {
            return {...state, urlCaptcha: action.urlCaptcha}
        }
        case CLEAR_CAPTCHA: {
            return {...state, urlCaptcha: null}
        }
        default:
            return state
    }
}

export default authReducer
