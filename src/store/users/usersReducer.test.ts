import {followSuccessful, unfollowSuccessful, usersSlice} from './usersSlice';
import {InitialStateUsers} from './types';

let state: InitialStateUsers;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Ilya', status: 'status 0', followed: true, photos: {small: null, large: null},
            },
            {
                id: 1, name: 'Daria', status: 'status 1', followed: true, photos: {small: null, large: null},
            },
            {
                id: 2, name: 'Maria', status: 'status 2', followed: false, photos: {small: null, large: null},
            },
            {
                id: 3, name: 'Alex', status: 'status 3', followed: false, photos: {small: null, large: null},
            },
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        error: null,
        followingInProgress: [],
        filter: {
            term: '',
            friend: '',
        }
    };
});

test('follow user success', () => {

    let action = followSuccessful(3);

    let newState = usersSlice.reducer(state, action);

    expect(newState.users[3].followed).toBeTruthy();
    expect(newState.users[2].followed).toBeFalsy();
});

test('unfollow user success', () => {

    let action = unfollowSuccessful(1);

    let newState = usersSlice.reducer(state, action);

    expect(newState.users[0].followed).toBeTruthy();
    expect(newState.users[1].followed).toBeFalsy();
});