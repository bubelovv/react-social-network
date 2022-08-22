import React from 'react';
import styles from './Users.module.css';
import axios from "axios";
import avatar from '../../assets/images/avatar.jpg'

const Users = props => {

    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    props.setUsers(response.data.items);
                })
        }
    }

    // [
    //     {
    //         id: '1',
    //         avatarURL: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    //         follow: true, name: 'Sergey', status: 'I learn React', location: {country: 'Russia', city: 'Khabarovsk'},
    //     },
    //     {
    //         id: '2',
    //         avatarURL: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    //         follow: false, name: 'Daria', status: 'I slept all day', location: {country: 'Russia', city: 'Svobodny'},
    //     },
    //     {
    //         id: '3',
    //         avatarURL: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    //         follow: true, name: 'Ilysha', status: 'My army love me', location: {country: 'USA', city: 'Magdagachi'},
    //     },
    // ]

    return (
        <div className={styles.userArea}>
            {
                props.users.map(user => <div className={styles.user} key={user.id}>
                    <div className={styles.followArea}>
                        <div>
                            <img alt='avatar' className={styles.avatar}
                                 src={user.photos.small !== null ? user.photos.small : avatar}/>
                        </div>
                        <button className={styles.btn}
                                onClick={() => user.followed ? props.unfollow(user.id) : props.follow(user.id)}>
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
                </div>)
            }
            <button className={styles.getUsers} onClick={getUsers}>Get users list</button>
        </div>
    )
};

export default Users;