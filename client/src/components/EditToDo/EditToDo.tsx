import { EditToDoProps, FormDataEdit } from '../../common/types-and-interfaces';
import { useDispatch } from 'react-redux';
import { editOneTodoFetch } from '../../common/request-functions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ModalButton } from '../ModalButton';

import './EditToDo.scss';


export const EditToDo: React.FC<EditToDoProps> = ({ id, setActive }) => {
    const dispatch = useDispatch();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm<FormDataEdit>({
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<FormDataEdit> = async (data) => {
        await editOneTodoFetch(data, id, dispatch);
        setActive(false);
        reset();
    };

    return (
        <div className="edit-todo">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='todoTitleEdit'>
                    new Title:
                </label>
                <input
                    id='todoTitleEdit'
                    placeholder="new title..."
                    type='text'
                    {...register('todoTitleEdit', {
                        required: false,
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
                    {<p>{errors?.todoTitleEdit?.message}</p>}
                </div>

                <label htmlFor='descriptionEdit'>
                    New Description:
                </label>
                <input
                    id='descriptionEdit'
                    placeholder="description..."
                    type='text'
                    {...register('descriptionEdit', {
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
                    <p>{errors?.descriptionEdit?.message}</p>
                </div>

                <label htmlFor='membersEdit'>
                    New Members:
                </label>
                <input
                    id='membersEdit'
                    placeholder="members..."
                    type='text'
                    {...register('membersEdit', {
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
                    <p>{errors?.membersEdit?.message}</p>
                </div>

                <label htmlFor='commentsEdit'>
                    Comment:
                </label>
                <input
                    id='commentsEdit'
                    placeholder="comment..."
                    type='text'
                    {...register('commentsEdit', {
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
                    <p>{errors?.commentsEdit?.message}</p>
                </div>

                <ModalButton
                    show={!isValid}
                    text={'edit todo'}
                />
            </form>

        </div>
    );
}