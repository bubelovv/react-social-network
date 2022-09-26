import profileReducer, {deletePost} from "./profileReducer";

// test deleted post
test('post should be deleted', () => {
    // 1. test data
    let state = {
        posts: [
            {id: 1, message: "It's the old post", likesCount: 10},
            {id: 2, message: "It's  the middle post", likesCount: 15},
            {id: 3, message: "It's the last post", likesCount: 20},
        ]
    }
    let action = deletePost(1)
    // 2. change state
    let newState = profileReducer(state, action)
    // 3. check result
    expect(newState.posts.length).toBe(2)
})