import {IUserInfoFormValues, IProfile, IPhotosProfile} from '../store/profile/types';
import {IDefaultResponse, instance} from './api';

export interface IResponseDataPhotos {
    photos: IPhotosProfile;
}

export const profileApi = {
    async getProfile(userId: number) {
        const response = await instance.get<IProfile>(`profile/${userId}`);
        return response.data;
    },
    async getStatus(userId: number) {
        const response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },
    async updateStatus(status: string) {
        const response = await instance.put<IDefaultResponse>(`profile/status`, {status});
        return response.data.resultCode;
    },
    async savePhoto(file: File) {
        const formData = new FormData();
        formData.append('image', file);
        const response = await instance.put<IDefaultResponse<IResponseDataPhotos>>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    },
    async saveInfo(profile: IUserInfoFormValues) {
        const response = await instance.put<IDefaultResponse>(`profile`, profile);
        return response.data;
    },
};