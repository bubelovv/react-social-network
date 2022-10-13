import {FormValues, IProfile, IPhotosProfile} from "../redux/profileReducer";
import {IDefaultResponse, instance} from "./api";

interface IResponseDataPhotos {
    photos: IPhotosProfile
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
        let response = await instance.put<IDefaultResponse>(`profile/status`, {status});
        return response.data.resultCode;
    },
    async savePhoto(file: File) {
        let formData = new FormData();
        formData.append('image', file);
        let response = await instance.put<IDefaultResponse<IResponseDataPhotos>>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        return response.data;
    },
    async saveInfo(profile: FormValues) {
        let response = await instance.put<IDefaultResponse>(`profile`, profile);
        return response.data
    },
}