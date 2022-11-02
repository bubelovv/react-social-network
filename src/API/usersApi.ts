import {IUser} from '../store/users/types';
import {instance, IResponseWithFieldsErrors} from './api';

export interface IGetUsersResponse {
    error: null | string,
    totalCount: number,
    items: IUser[],
}

export let usersApi = {
    async getUsers(currentPage = 1, pageSize = 10, term = '', friend = '') {
        friend = !friend ? friend : `${friend === 'true'}`;
        const filterUrl = (term ? '&term=' + term : '') + (friend ? '&friend=' + friend : '');
        return await instance.get<IGetUsersResponse>(`users?page=${currentPage}&count=${pageSize}${filterUrl}`);
    },
    async follow(userId: number) {
        const response = await instance.post<IResponseWithFieldsErrors>(`follow/${userId}`);
        return response.data.resultCode;
    },
    async unfollow(userId: number) {
        const response = await instance.delete<IResponseWithFieldsErrors>(`follow/${userId}`);
        return response.data.resultCode;
    },
};