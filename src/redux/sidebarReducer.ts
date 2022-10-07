let avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'

export interface IFriend {
    id: number
    name: string
    avatar: string
}
interface InitialStateSidebar {
    friends: IFriend[]
}

let initialState: InitialStateSidebar = {
    friends: [
        {id: 1, name: 'Bubelov',avatar: avatar},
        {id: 2, name: 'Darinka', avatar: avatar},
        {id: 3, name: 'Aleksey', avatar: avatar},
        {id: 4, name: 'Manga', avatar: avatar},
        {id: 5, name: 'Ilysha', avatar: avatar},
        {id: 6, name: 'Vanya', avatar: avatar},
    ],
};

const sidebarReducer = (state = initialState, action: any) => {
    return state;
}

export default sidebarReducer;