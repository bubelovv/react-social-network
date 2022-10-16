import {IUser} from "../redux/usersReducer";
import {instance, IResponseWithFieldsErrors} from "./api";

interface IGetUsersResponse {
    error: null | string,
    totalCount: number,
    items: IUser[],
}

export let usersApi: { [key: string]: any } = {
    async getUsers(currentPage = 1, pageSize = 10, term = '', friend = '') {
        friend = !friend ? friend : (friend === 'true' ? 'true' : 'false')
        let response = await instance.get<IGetUsersResponse>(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`)
        return response.data;
    },
    async follow(userId: number) {
        let response = await instance.post<IResponseWithFieldsErrors>(`follow/${userId}`)
        return response.data.resultCode;
    },
    async unfollow(userId: number) {
        let response = await instance.delete<IResponseWithFieldsErrors>(`follow/${userId}`)
        return response.data.resultCode;
    },
}