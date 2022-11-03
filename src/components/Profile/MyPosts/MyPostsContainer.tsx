// import React from 'react';
// import {addPost, decrementLikes, incrementLikes} from '../../../store/profile/profileSlice';
// import {IPost} from "../../../store/profile/types";
// import MyPosts from "./MyPosts";
// import {connect} from "react-redux";
// import {RootState} from "../../../store/store";
//
// interface MapStateProps {
//     posts: IPost[]
// }
//
// type MapDispatchProps = {
//     addPost: (newPostText: string) => void
//     incrementLikes: (userId: number) => void
//     decrementLikes: (userId: number) => void
// }
//
// const mapStateToProps = (state: RootState): MapStateProps => {
//     return {
//         posts: state.profilePage.posts,
//     }
// };
//
// const MyPostsContainer = connect<MapStateProps, MapDispatchProps, {}, RootState>(mapStateToProps, {
//     addPost,
//     incrementLikes,
//     decrementLikes,
// })(MyPosts);
//
// export default MyPostsContainer;