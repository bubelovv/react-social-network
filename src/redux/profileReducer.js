const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newPostText: text}
};

let initialState = {
        posts: [
            {id: 1, message: 'It\'s the last post', likesCount: 10},
            {id: 2, message: 'It\'s  the middle post', likesCount: 15},
            {id: 3, message: 'It\'s the first post', likesCount: 20},
        ],
        newPostText: '',
    };

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText.trim() === '') return;
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText;
            return state;
        default:
            return state;
    }
}

export default profileReducer;