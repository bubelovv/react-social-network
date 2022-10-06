import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '44b20f4c-ba47-458b-8963-b987c9ae7f33'},
});

export let usersApi: {[index: string]: any} = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
        return response.data;
    },
    async follow(userId: number) {
        let response = await instance.post(`follow/${userId}`)
        return response.data.resultCode;
    },
    async unfollow(userId: number) {
        let response = await instance.delete(`follow/${userId}`)
        return response.data.resultCode;
    },
};

export let authApi = {
    async auth() {
        let response = await instance.get(`auth/me`)
        return response.data.data;
    },
    async loginPost(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        let response = await instance.post(`auth/login`, {email, password, rememberMe, captcha})
        return response.data;
    },
    async loginDelete() {
        let response = await instance.delete(`auth/login`)
        return response.data;
    },
    async getCaptcha() {
        let response = await instance.get(`/security/get-captcha-url`)
        return response.data.url;
    },
};

export let profileApi = {
    async getProfile(userId: number) {
        let response = await instance.get(`profile/${userId}`)
        return response.data;
    },
    async getStatus(userId: number) {
        return await instance.get(`profile/status/${userId}`);
    },
    async updateStatus(status: string) {
        return await instance.put(`profile/status`, {status});
    },
    async savePhoto(file: any) {
        let formData = new FormData();
        formData.append('image', file);
        return await instance.put(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    },
    async saveInfo(profile: any) {
        return await instance.put(`profile`, profile);
    },
};