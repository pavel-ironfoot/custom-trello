import { AddOneTodoProps, FormData } from '../../common/types-and-interfaces';
import { useDispatch } from 'react-redux';
import { addOneToDoFetch } from '../../common/request-functions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ModalButton } from '../ModalButton';

import './AddOneTodo.scss';


export const AddOneTodo: React.FC<AddOneTodoProps> = ({ setActive, status, }) => {
    const dispatch = useDispatch();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm<FormData>({
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        await addOneToDoFetch(data, status, dispatch);
        setActive(false)
        reset();
    };

    return (
        <div className='add-todo' >
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='todoTitle'>
                    Title:
                </label>
                <input
                    id='todoTitle'
                    placeholder="title..."
                    type='text'
                    {...register('todoTitle', {
                        required: 'need to fill',
                        minLength: {
                            value: 2,
                            message: 'need more symbols',
                        },
                        maxLength: {
                            value: 12,
                            message: 'less symbols',
                        }
                    })}
                />
                <div className='login-form__title__errors'>
                    {<p>{errors?.todoTitle?.message}</p>}
                </div>

                <label htmlFor='duedate'>
                    Due date:
                </label>
                <input
                    id='duedate'
                    placeholder="min:hours:days:years"
                    type='text'
                    {...register("duedate", {
                        required: 'need to fill',
                        pattern: {
                            value: /^\d{1,2}:\d{1,2}:\d{1,2}:\d{1,2}$/,
                            message: 'only min:hours:days:years',
                        }
                    })}
                />
                <div className='login-form__title__errors'>
                    {<p>{errors?.duedate?.message}</p>}
                </div>

                <label htmlFor='description'>
                    Description:
                </label>
                <input
                    id='description'
                    placeholder="description..."
                    type='text'
                    {...register('description', {
                        required: false,
                        minLength: {
                            value: 5,
                            message: 'need more symbols',
                        },
                        maxLength: {
                            value: 150,
                            message: 'less symbols',
                        }
                    })}
                />
                <div className='login-form__title__errors'>
                    <p>{errors?.description?.message}</p>
                </div>

                <label htmlFor='members'>
                    Members:
                </label>
                <input
                    id='members'
                    placeholder="members..."
                    type='text'
                    {...register('members', {
                        required: false,
                        minLength: {
                            value: 2,
                            message: 'need more symbols',
                        },
                        maxLength: {
                            value: 32,
                            message: 'less symbols',
                        }
                    })}
                />
                <div className='login-form__title__errors'>
                    <p>{errors?.members?.message}</p>
                </div>

                <label htmlFor='comments'>
                    Comment:
                </label>
                <input
                    id='comments'
                    placeholder="comments..."
                    type='text'
                    {...register('comments', {
                        required: false,
                        minLength: {
                            value: 2,
                            message: 'need more symbols',
                        },
                        maxLength: {
                            value: 32,
                            message: 'less symbols',
                        }
                    })}
                />
                <div className='login-form__title__errors'>
                    <p>{errors?.comments?.message}</p>
                </div>

                <ModalButton
                    show={!isValid}
                    text={'create todo'}
                />
            </form>

        </div>
    );
}