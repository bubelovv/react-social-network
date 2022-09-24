import {authApi} from '../API/api'

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth},
})

export const getAuthUserData = () => async dispatch => {
    let data = await authApi.auth()
    if (Object.keys(data).length) {
        let {id, email, login} = {...data}
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (data, setError) => {
    const {login, password, checkbox} = data;

    return async dispatch => {
        let data = await authApi.loginPost(login, password, checkbox)
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
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

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {...state, ...action.payload,}
        }
        default:
            return state
    }
}

export default authReducer
