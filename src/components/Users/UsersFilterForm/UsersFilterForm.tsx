import React from 'react';
import {useForm} from 'react-hook-form';

interface IProps {
    onFilterChange: (term: string) => void
    term: string
}

const UsersFilterForm: React.FC<IProps> = ({onFilterChange, term}) => {

    interface FormValues {
        term: string
    }

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
        reset({})
        onFilterChange(data.term);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                defaultValue={term}
                placeholder={'search users'}
                {...register('term')}
            />
            <button>find</button>
        </form>
    );
};

export default UsersFilterForm;