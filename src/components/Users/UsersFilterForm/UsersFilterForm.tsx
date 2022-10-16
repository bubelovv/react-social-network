import React from 'react';
import {useForm} from 'react-hook-form';

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                defaultValue={filter.term}
                placeholder={'search users'}
                {...register('term')}
            />
            <select
                defaultValue={filter.friend}
                {...register('friend')}>
                <option value="">All users</option>
                <option value="true">Followed users</option>
                <option value="false">Not followed users</option>
            </select>
            <button>find</button>
        </form>
    );
};

export default UsersFilterForm;