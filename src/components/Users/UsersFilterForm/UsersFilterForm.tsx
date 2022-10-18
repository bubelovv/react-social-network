import React from 'react';
import {useForm} from 'react-hook-form';
import styles from './UsersFilterForm.module.css';

interface IProps {
    onFilterChange: (term: string, friend: string) => void;
    filter: { term: string, friend: string };
}

const UsersFilterForm: React.FC<IProps> = ({onFilterChange, filter}) => {

    interface FormValues {
        term: string;
        friend: string;
    }

    const {
        register,
        handleSubmit,
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        onFilterChange(data.term, data.friend);
    };

    return (
        <form className={styles.filterForm}
              onSubmit={handleSubmit(onSubmit)}>
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
            <button className={styles.filterButton}>find</button>
        </form>
    );
};

export default UsersFilterForm;