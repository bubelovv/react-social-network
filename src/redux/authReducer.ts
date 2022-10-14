import {ResultCode} from '../API/api'
import {ThunkAction} from "redux-thunk";
import {InferValueTypes, RootState} from "./reduxStore";
import {UseFormSetError} from "react-hook-form";
import {LoginFormValues} from "../components/Login/Login";
import {authApi, ResultCodeForCaptcha} from "../API/authApi";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const SET_CAPTCHA = 'SET_CAPTCHA'
const CLEAR_CAPTCHA = 'CLEAR_CAPTCHA'

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_AUTH_USER_DATA,
        payload: {id, email, login, isAuth},
    }) as const,
    setCaptcha: (urlCaptcha: string) => ({type: SET_CAPTCHA, urlCaptcha}) as const,
    clearCaptcha: () => ({type: CLEAR_CAPTCHA}) as const,
}

type ThunkType = ThunkAction<Promise<void>, RootState, undefined, ActionTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authApi.me()
    if (Object.keys(data).length) {
        dispatch(actions.setAuthUserData(data.id, data.email, data.login, true))
    }
}

export interface LoginData {
    email: string;
    password: string;
    checkbox: boolean;
    captcha: string | null;
}

export const login = (data: LoginData, setError: UseFormSetError<LoginFormValues>): ThunkType => {
    const {email, password, checkbox, captcha} = data;

    return async (dispatch) => {
        let data = await authApi.loginPost(email, password, checkbox, captcha)
        if (data.resultCode === ResultCode.Success) {
            await dispatch(getAuthUserData())
            dispatch(actions.clearCaptcha())
        } else if (data.resultCode === ResultCodeForCaptcha.captcha) {
            await dispatch(getCaptcha())
        } else {
            setError('email', {type: 'server', message: data.messages[0]});
            setError('password', {type: 'server', message: data.messages[0]});
        }
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authApi.logout()
    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => {
    let urlCaptcha = await authApi.getCaptcha()
    dispatch(actions.setCaptcha(urlCaptcha))
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
