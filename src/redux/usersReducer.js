const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';

export const followAC = userId => ({type: FOLLOW_USER, userId});
export const unfollowAC = userId => ({type: UNFOLLOW_USER, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCountAC = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount});

let initialState = {
    users: [],
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER: {
            let newState = {...state, users: [...state.users]};
            newState.users.find(item => item.id === action.userId).followed = true;
            return newState;
        }
        case UNFOLLOW_USER: {
            let newState = {...state, users: [...state.users]};
            newState.users.find(item => item.id === action.userId).followed = false;
            return newState;
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalCount: action.totalCount}
        }
        default:
            return state;
    }
}

export default usersReducer;