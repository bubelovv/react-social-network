import React from 'react';
import Users from './Users';
import Preloader from './Preloader/Preloader';
import {useAppSelector} from '../../store/store';

const UsersContainer: React.FC = () => {
    const isFetching = useAppSelector(state => state.usersPage.isFetching);

    return <>
        {isFetching ?
            <Preloader/>
             : null}
        <Users/>
    </>;
};

export default UsersContainer;
