import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '44b20f4c-ba47-458b-8963-b987c9ae7f33'},
});

export let usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data.resultCode)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`, {})
            .then(response => response.data.resultCode)
    },
};

export let authApi = {
    auth() {
        return instance.get(`auth/me`)
            .then(response => response.data.data)
    },
};

export let profileApi = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
};

export let myProfileApi = {
    getProfile() {
        return instance.get(`profile/2`)
            .then(response => response.data)
    },
};
