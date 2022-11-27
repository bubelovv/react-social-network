export interface InitialStateAuth {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    urlCaptcha: string | null,
    error: string,
}

export interface IAuthUserData {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

export interface ILoginUserData extends IAuthUserData {
    captchaUrl: string | null,
}