import {IDefaultResponse, IResponseWithFieldsErrors, instance, ResultCode} from "./api";

export enum ResultCodeForCaptcha {
    captcha = 10,
}

interface IMeDataResponse {
    id: number,
    email: string,
    login: string
}

interface ILoginDataResponse {
    userId: number,
}

interface ICaptchaResponse {
    url: string,
}

export let authApi = {
    async me() {
        let response = await instance.get<IDefaultResponse<IMeDataResponse>>(`auth/me`)
        return response.data.data;
    },
    async loginPost(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        let response = await instance.post<
            IDefaultResponse<ILoginDataResponse, ResultCode | ResultCodeForCaptcha>
            >(`auth/login`, {email, password, rememberMe, captcha})
        return response.data;
    },
    async logout() {
        let response = await instance.delete<IResponseWithFieldsErrors>(`auth/login`)
        return response.data;
    },
    async getCaptcha() {
        let response = await instance.get<ICaptchaResponse>(`/security/get-captcha-url`)
        return response.data.url;
    },
}