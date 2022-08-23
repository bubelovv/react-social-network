import React from 'react';
import styles from './Users.module.css';
import axios from "axios";
import avatar from '../../assets/images/avatar.jpg'

class UsersC extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            });
    };

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    };

    render() {

        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        let pagesLeft = this.props.currentPage - 5 < 0 ? 0 : this.props.currentPage - 5;
        let pagesRight = this.props.currentPage + 5 > pagesCount ? pagesCount : this.props.currentPage + 4;
        let pagesSlice = pages.slice(pagesLeft, pagesRight)
        return (
            <div className={styles.userArea}>
                <div className={styles.btnNumbersPage}>
                    {pagesSlice.map(page => {
                        return <span onClick={() => this.onPageChanged(page)}
                                     className={ this.props.currentPage === page ? styles.selectedPage : styles.pageNumber}>{page}</span>
                    })}
                </div>

                {this.props.users.map(user => <div className={styles.user} key={user.id}>
                    <div className={styles.followArea}>
                        <div>
                            <img alt='avatar' className={styles.avatar}
                                 src={user.photos.small !== null ? user.photos.small : avatar}/>
                        </div>
                        <button className={user.followed ? styles.btnFollow : styles.btnUnfollow}
                                onClick={() => user.followed ? this.props.unfollow(user.id) : this.props.follow(user.id)}>
                            {user.followed ? 'follow' : 'unfollow'}
                        </button>
                    </div>
                    <div className={styles.description}>
                        <div className={styles.userInfo}>
                            <span>{user.name}</span>
                            <span>{user.id}</span>
                        </div>
                        <div className={styles.location}>
                            <span>{user.name}</span>
                            <span>{user.name}</span>
                        </div>
                    </div>
                </div>)}
                {/*<button className={styles.getUsers} >Get users list</button>*/}
            </div>
        )
    }
}

export default UsersC;