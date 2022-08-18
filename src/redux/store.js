// import profileReducer from "./profileReducer";
// import dialogsReducer from "./dialogsReducer";
//
// let store = {
//     _state: {
//         sidebar: {
//             friends: [
//                 {
//                     id: '1',
//                     name: 'Bubelov',
//                     avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '2',
//                     name: 'Darinka',
//                     avatar: 'https://images.unsplash.com/photo-1643732994192-03856731da2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhciUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '3',
//                     name: 'Aleksey',
//                     avatar: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '4',
//                     name: 'Manga',
//                     avatar: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '5',
//                     name: 'Ilysha',
//                     avatar: 'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '6',
//                     name: 'Vanya',
//                     avatar: 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//             ],
//         },
//         profilePage: {
//             posts: [
//                 {id: 1, message: 'It\'s the last post', likesCount: 10},
//                 {id: 2, message: 'It\'s  the middle post', likesCount: 15},
//                 {id: 3, message: 'It\'s the first post', likesCount: 20},
//             ],
//             newPostText: '',
//         },
//         dialogsPage: {
//             dialogs: [
//                 {
//                     id: '1',
//                     name: 'Bubelov',
//                     avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '2',
//                     name: 'Darinka',
//                     avatar: 'https://images.unsplash.com/photo-1643732994192-03856731da2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhciUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '3',
//                     name: 'Aleksey',
//                     avatar: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '4',
//                     name: 'Manga',
//                     avatar: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//                 {
//                     id: '5',
//                     name: 'Ilysha',
//                     avatar: 'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
//                 },
//             ],
//             messages: [
//                 {id: '1', message: 'I will work in it-industry'},
//                 {id: '2', message: 'I wait you so much, Lybimka'},
//                 {id: '3', message: 'I do not know, we will go to the ocean or not...'},
//             ],
//             newMessageText: '',
//         },
//     },
//
//     _callSubscriber() {
//     },
//
//     getState() {
//         return this._state;
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },
//
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._callSubscriber(this);
//     },
// };
//
// export default store;