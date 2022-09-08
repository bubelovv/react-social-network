import React from 'react';
import {
    getUsers,
    setCurrentPage,
    follow,
    unfollow,
} from '../../redux/usersReducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from "./Preloader/Preloader";
import {compose} from "redux";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    };

    onPageChanged = (currentPage) => {
        this.props.setCurrentPage(currentPage);
        this.props.getUsers(currentPage, this.props.pageSize)
    };

    render() {

        return (
            this.props.isFetching ?
                <Preloader/> :
                <Users users={this.props.users}
                       currentPage={this.props.currentPage}
                       pageSize={this.props.pageSize}
                       totalCount={this.props.totalCount}
                       followingInProgress={this.props.followingInProgress}
                       onPageChanged={this.onPageChanged}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};

// withAuthRedirect,
export default compose(
    connect(mapStateToProps, {getUsers, setCurrentPage, follow, unfollow}),
)(UsersContainer)
