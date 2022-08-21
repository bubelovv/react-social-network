const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';

export const followAC = userId => ({type: FOLLOW_USER, userId});
export const unfollowAC = userId => ({type: UNFOLLOW_USER, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});

let initialState = {
    users: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER: {
            let newState = {...state, users: [...state.users]};
            newState.users[action.userId - 1].follow = true;
            return newState;
        }
        case UNFOLLOW_USER: {
            let newState = {...state, users: [...state.users]};
            newState.users[action.userId - 1].follow = false;
            return newState;
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state;
    }
}

export default usersReducer;