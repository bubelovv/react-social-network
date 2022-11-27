import {IAuthUserData, ILoginUserData, InitialStateAuth} from './types';
import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponseWithFieldsErrors, ResultCode} from '../../API/api';
import {authApi, ResultCodeForCaptcha} from '../../API/authApi';
import {LoginFormValues} from '../../components/Login/Login';
import {UseFormSetError} from 'react-hook-form';

const initialState: InitialStateAuth = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    urlCaptcha: null,
    error: '',
};

export const getAuthUserData = createAsyncThunk<IAuthUserData>(
    'auth.getAuthUserData',
    async () => {
        const authData = await authApi.me();
        if (Object.keys(authData).length) {
            return {id: authData.id, email: authData.email, login: authData.login, isAuth: true}
        }
        return {id: null, email: null, login: null, isAuth: false}
    }
);

export const login = createAsyncThunk<ILoginUserData,
    { data: LoginFormValues, setError: UseFormSetError<LoginFormValues> }>(
    'auth.login',
    async (args, {rejectWithValue}) => {
        const {email, password, checkbox, captcha} = args.data;
        const responseData = await authApi.loginPost(email, password, checkbox, captcha);

        if (responseData.resultCode === ResultCode.Success) {
            const authData = await authApi.me();
            return {id: authData.id, email: authData.email, login: authData.login, captchaUrl: null, isAuth: true};
        } else if (responseData.resultCode === ResultCodeForCaptcha.captcha) {
            const captchaUrl = await authApi.getCaptcha();
            return {id: null, email: null, login: null, captchaUrl, isAuth: false};
        } else {
            args.setError('email', {type: 'server', message: responseData.messages[0]});
            args.setError('password', {type: 'server', message: responseData.messages[0]});
            return rejectWithValue('Server Error!');
        }
    }
);

export const getCaptcha = createAsyncThunk<string>(
    'auth.getCaptcha',
    async () => {
        return await authApi.getCaptcha();
    });

export const logout = createAsyncThunk<IResponseWithFieldsErrors | void>(
    'auth.logout',
    async () => {
        const data = await authApi.logout();
        if (data.resultCode === ResultCode.Success) {
            return data;
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAuthUserData.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.login = action.payload.login;
                state.isAuth = action.payload.isAuth;
            })
            .addCase(logout.fulfilled, (state) => {
                state.id = null;
                state.email = null;
                state.login = null;
                state.isAuth = false;
            })
            .addCase(getCaptcha.fulfilled, (state, action) => {
                state.urlCaptcha = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.login = action.payload.login;
                state.isAuth = action.payload.isAuth;
                state.urlCaptcha = action.payload.captchaUrl;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
            });
    }
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}