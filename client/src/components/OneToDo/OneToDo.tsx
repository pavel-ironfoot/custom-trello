import { OneToDoProps } from '../../common/types-and-interfaces';
import { calculateTimeElapsed, calculateTimeRemaining, showCreationalDate } from '../../common/useful-functions';
import { useDispatch } from 'react-redux';
import { deleteOneTodo } from '../../common/request-functions';

import './OneToDo.scss';
import { ModalEdit } from '../ModalEdit';

export const OneToDo: React.FC<OneToDoProps> = ({
    id,
    status,
    title,
    description,
    members,
    comments,
    duedate,
    timeNow,
}) => {


    const dispatch = useDispatch();

    const deleteBlock = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        await deleteOneTodo(id, dispatch)
    }

    const remainingTimee = calculateTimeRemaining(timeNow, duedate);
    const spentTime = calculateTimeElapsed(timeNow);

    return (
        <div className='one-todo'>

            <p>{id}</p>
            <p>title: <span className='one-todo__value'>{title}</span></p>
            <p>description: <span className='one-todo__value'>{description}</span></p>
            <p>members: <span className='one-todo__value'>{members}</span></p>
            <p>comment: <span className='one-todo__value'>{comments}</span></p>
            <p>due date: <span className='one-todo__value'>{duedate}</span></p>
            <p>date of creation: <span className='one-todo__value'>{showCreationalDate(timeNow)}</span></p>
            <p>spent time: <span className='one-todo__value'>{spentTime}</span></p>
            <p>remaining time:<span className='one-todo__value'>{remainingTimee}</span></p>

            <ModalEdit
                id={id}
            />
            <button onClick={(e) => deleteBlock(e)} className='one-todo__button one-todo__delete'>X</button>


        </div>
    );
}