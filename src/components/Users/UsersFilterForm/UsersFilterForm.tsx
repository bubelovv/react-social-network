import React from 'react';
import {useForm} from 'react-hook-form';
import styles from './UsersFilterForm.module.css';
import MyButton from '../../../UI/MyButton/MyButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {IUsersFilterValues} from '../../../store/users/types';

interface IProps {
    onFilterChange: (term: string, friend: string) => void;
    filter: { term: string, friend: string };
}

const UsersFilterForm: React.FC<IProps> = ({onFilterChange, filter}) => {

    const {
        register,
        handleSubmit,
    } = useForm<IUsersFilterValues>();

    const onSubmit = (filter: IUsersFilterValues) => {
        onFilterChange(filter.term, filter.friend);
    };

    return (
        <form className={styles.filterForm} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.filterInput}
                   defaultValue={filter.term}
                   placeholder={'search users'}
                   {...register('term')}
            />
            <select className={styles.filterSelect}
                    defaultValue={filter.friend}
                    {...register('friend')}>
                <option value=''>All users</option>
                <option value='true'>Followed users</option>
                <option value='false'>Not followed users</option>
            </select>
            <MyButton>
                <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass}/>
                <p style={{fontSize: '16px'}}>find</p>
            </MyButton>
        </form>
    );
};

export default UsersFilterForm;