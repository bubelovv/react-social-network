import {authApi} from '../API/api'

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const SET_CAPTCHA = 'SET_CAPTCHA'
const CLEAR_CAPTCHA = 'CLEAR_CAPTCHA'

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth},
})

export const setCaptcha = urlCaptcha => ({type: SET_CAPTCHA, urlCaptcha})

export const clearCaptcha = () => ({type: CLEAR_CAPTCHA})

export const getAuthUserData = () => async dispatch => {
    let data = await authApi.auth()
    if (Object.keys(data).length) {
        let {id, email, login} = {...data}
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (data, setError) => {
    const {login, password, checkbox, captcha} = data;

    return async dispatch => {
        let data = await authApi.loginPost(login, password, checkbox, captcha)
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
            dispatch(clearCaptcha())
        } else if(data.resultCode === 10) {
            dispatch(getCaptcha())
        } else {
            setError('login', {type: 'server', message: data.messages[0]});
            setError('password', {type: 'server', message: data.messages[0]});
        }
    }
}

export const logout = () => async dispatch => {
    let data = await authApi.loginDelete()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptcha = () => async dispatch => {
    let urlCaptcha = await authApi.getCaptcha()
    dispatch(setCaptcha(urlCaptcha))
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    urlCaptcha: null,
}

const authReducer = (state = initialState, action) => {
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
