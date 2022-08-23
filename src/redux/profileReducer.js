const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const INCREMENT_LIKES = 'INCREMENT_LIKES';
const DECREMENT_LIKES = 'DECREMENT_LIKES';

export const addPost = () => ({type: ADD_POST});
export const updateNewPostText = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newPostText: text}
};
export const incrementLikes = (id) => ({
    type: INCREMENT_LIKES,
    id: id,
});
export const decrementLikes = (id) => ({
    type: DECREMENT_LIKES,
    id: id,
});

let initialState = {
    posts: [
        {id: 1, message: 'It\'s the last post', likesCount: 10},
        {id: 2, message: 'It\'s  the middle post', likesCount: 15},
        {id: 3, message: 'It\'s the first post', likesCount: 20},
    ],
    newPostText: '',
};

const profileReducer = (state = initialState, action) => {
    let posts = state.posts;
    switch (action.type) {
        case ADD_POST: {
            if (state.newPostText.trim() === '') return state;

            return {
                ...state,
                posts: [...posts, {id: posts[posts.length - 1].id + 1, message: state.newPostText, likesCount: 0}],
                newPostText: '',
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newPostText,
            };
        }
        case INCREMENT_LIKES: {
            let newState = {
                ...state,
                posts: [...posts],
            };
            newState.posts[action.id - 1].likesCount++;
            return newState;
        }case DECREMENT_LIKES: {
            let newState = {
                ...state,
                posts: [...posts],
            };
            newState.posts[action.id - 1].likesCount--;
            return newState;
        }
        default:
            return state;
    }
}

export default profileReducer;