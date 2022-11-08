export interface IUserInfoFormValues extends Omit<IProfile, 'photos'> {}

export interface IPost {
    id: number
    name: string
    date: string
    message: string
    likesCount: number
}

export interface IPhotosProfile {
    large: string | null
    small: string | null
}

export interface IContactsProfile {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}

export interface IProfile {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    userId: number
    contacts: IContactsProfile
    photos: IPhotosProfile
}

export interface InitialStateProfile {
    posts: IPost[];
    profile: IProfile | null;
    status: string;
    error: string | null,
}