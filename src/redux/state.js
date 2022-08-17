let store = {
    _state: {
        sidebar: {
            friends: [
                {
                    id: '1',
                    name: 'Bubelov',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '2',
                    name: 'Darinka',
                    avatar: 'https://images.unsplash.com/photo-1643732994192-03856731da2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhciUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '3',
                    name: 'Aleksey',
                    avatar: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '4',
                    name: 'Manga',
                    avatar: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '5',
                    name: 'Ilysha',
                    avatar: 'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '6',
                    name: 'Vanya',
                    avatar: 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
                },
            ],
            getFriends() {
                return this.friends;
            }
        },
        getSidebar() {
            return this.sidebar;
        },
        profilePage: {
            posts: [
                {id: 1, message: 'It\'s the last post', likesCount: 10},
                {id: 2, message: 'It\'s  the middle post', likesCount: 15},
                {id: 3, message: 'It\'s the first post', likesCount: 20},
            ],
            newPostText: '',
        },
        dialogsPage: {
            dialogs: [
                {
                    id: '1',
                    name: 'Bubelov',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '2',
                    name: 'Darinka',
                    avatar: 'https://images.unsplash.com/photo-1643732994192-03856731da2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhciUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '3',
                    name: 'Aleksey',
                    avatar: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '4',
                    name: 'Manga',
                    avatar: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
                },
                {
                    id: '5',
                    name: 'Ilysha',
                    avatar: 'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
                },
            ],
            messages: [
                {id: '1', message: 'I will work in it-industry'},
                {id: '2', message: 'I wait you so much, Lubimka'},
                {id: '3', message: 'I do not know, we will in the ocean or not...'},
            ],
            newMessageText: '',
        },
    },

    _callSubscriber() {
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            if (this._state.profilePage.newPostText.trim() === '') return;
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0,
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newPostText;
            this._callSubscriber(this);
        } else if (action.type === 'ADD-MESSAGE') {
            if (this._state.dialogsPage.newMessageText.trim() === '') return;
            let newMassage = {
                id: '4',
                message: this._state.dialogsPage.newMessageText,
            };
            this._state.dialogsPage.messages.push(newMassage);
            this._state.dialogsPage.newMessageText = '';
            this._callSubscriber(this);
        } else if (action.type === 'UPDATE-NEW-POST-MESSAGE') {
            this._state.dialogsPage.newMessageText = action.newMessageText;
            this._callSubscriber(this);
        }
    },
}

export default store;