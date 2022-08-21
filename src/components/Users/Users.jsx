import React from 'react';
import s from './Users.module.css';

const Users = props => {

    if (props.users.length === 0) {
        props.setUsers( [
                {
                    id: '1',
                    avatarURL: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    follow: true, name: 'Sergey', status: 'I learn React', location: {country: 'Russia', city: 'Khabarovsk'},
                },
                {
                    id: '2',
                    avatarURL: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
                    follow: false, name: 'Daria', status: 'I slept all day', location: {country: 'Russia', city: 'Svobodny'},
                },
                {
                    id: '3',
                    avatarURL: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
                    follow: true, name: 'Ilysha', status: 'My army love me', location: {country: 'USA', city: 'Magdagachi'},
                },
            ] )
    }

    return (
        <div className={s.userArea}>
            {
                props.users.map(user => <div className={s.user} key={user.id}>
                    <div className={s.followArea}>
                        <div>
                            <img className={s.avatar} src={user.avatarURL}/>
                        </div>
                        <button className={s.btn}
                                onClick={() => user.follow ? props.unfollow(user.id) : props.follow(user.id)}>
                            {user.follow ? 'follow' : 'unfollow'}
                        </button>
                    </div>
                    <div className={s.description}>
                        <div className={s.userInfo}>
                            <span>{user.name}</span>
                            <span>{user.status}</span>
                        </div>
                        <div className={s.location}>
                            <span>{user.location.country}</span>
                            <span>{user.location.city}</span>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
};

export default Users;