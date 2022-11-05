import {InitialStateProfile} from './types';
import {profileSlice, deletePost} from './profileSlice';

test('post should be deleted', () => {
    // 1. test data
    let state: InitialStateProfile = {
        posts: [
            {id: 1, message: 'It\'s the old post', likesCount: 10},
            {id: 2, message: 'It\'s  the middle post', likesCount: 15},
            {id: 3, message: 'It\'s the last post', likesCount: 20},
        ],
        profile: null,
        status: '',
        error: null,
    };
    let action = deletePost({id: 1});
    // 2. change state
    let newState = profileSlice.reducer(state, action);
    // 3. check result
    expect(newState.posts.length).toBe(2);
});