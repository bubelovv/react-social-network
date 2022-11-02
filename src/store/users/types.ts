import {IPhotosProfile} from '../profileReducer';

export interface IUser {
    id: number,
    name: string,
    status: string | null,
    photos: IPhotosProfile,
    followed: boolean,
}

export interface IUsersFilterValues {
    term: string;
    friend: string;
}

export interface InitialStateUsers {
    users: IUser[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    followingInProgress: number[], // array of users id
    filter: IUsersFilterValues,
    isFetching: boolean,
    error: string | null,
}

export interface IGetUsersRequest {
    currentPage: number,
    pageSize: number,
    term: string,
    friend: string,
}