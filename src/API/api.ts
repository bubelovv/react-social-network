import axios from 'axios';
import {FormValues, IProfile, PhotosProfile} from "../redux/profileReducer";
import {IUser} from "../redux/usersReducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '44b20f4c-ba47-458b-8963-b987c9ae7f33'},
})

interface GetUsersResponseType {
    error: null | string,
    totalCount: number,
    items: IUser[],
}

interface DefaultResponseType {
    resultCode: ResultCode,
    messages: string[],
    data: {},
    fieldsErrors: [],
}

export enum ResultCode {
    Success = 0,
    Error = 1,
}

export let usersApi: { [key: string]: any } = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data;
    },
    async follow(userId: number) {
        let response = await instance.post<DefaultResponseType>(`follow/${userId}`)
        return response.data.resultCode;
    },
    async unfollow(userId: number) {
        let response = await instance.delete<DefaultResponseType>(`follow/${userId}`)
        return response.data.resultCode;
    },
}

interface MeResponseType {
    resultCode: ResultCode,
    messages: string[],
    data: {
        id: number,
        email: string,
        login: string
    },
}

export enum ResultCodeForCaptcha {
    captcha = 10,
}

interface LoginPostResponseType {
    resultCode: ResultCode | ResultCodeForCaptcha,
    messages: string[],
    data: {
        userId: number,
    },
}

interface LogoutResponseType {
    resultCode: ResultCode,
    messages: string[],
    data: {},
}

interface CaptchaResponseType {
    url: string,
}

export let authApi = {
    async me() {
        let response = await instance.get<MeResponseType>(`auth/me`)
        return response.data.data;
    },
    async loginPost(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        let response = await instance.post<LoginPostResponseType>(`auth/login`, {email, password, rememberMe, captcha})
        return response.data;
    },
    async logout() {
        let response = await instance.delete<LogoutResponseType>(`auth/login`)
        return response.data;
    },
    async getCaptcha() {
        let response = await instance.get<CaptchaResponseType>(`/security/get-captcha-url`)
        return response.data.url;
    },
}

interface SavePhotoResponseType {
    data: { photos: PhotosProfile },
    messages: string[],
    resultCode: ResultCode,
}

export let profileApi = {
    async getProfile(userId: number) {
        let response = await instance.get<IProfile>(`profile/${userId}`)
        return response.data;
    },
    async getStatus(userId: number) {
        let response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },
    async updateStatus(status: string) {
        let response = await instance.put<DefaultResponseType>(`profile/status`, {status});
        return response.data.resultCode;
    },
    async savePhoto(file: string) {
        let formData = new FormData();
        formData.append('image', file);
        let response = await instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        console.log(response)
        return response.data;
    },
    async saveInfo(profile: FormValues) {
        let response = await instance.put<DefaultResponseType>(`profile`, profile);
        return response.data
    },
}