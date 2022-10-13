import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '44b20f4c-ba47-458b-8963-b987c9ae7f33'},
})

export enum ResultCode {
    Success = 0,
    Error = 1,
}

export interface IDefaultResponse<D = {}, RC = ResultCode> {
    resultCode: RC,
    messages: string[],
    data: D,
}

export interface IResponseWithFieldsErrors extends IDefaultResponse {
    fieldsErrors: [],
}