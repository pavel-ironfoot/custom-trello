
import './Modal.scss';
import { AddOneTodo } from '../../AddOneTodo';

interface ModalTypes {
    active: boolean;
    setActive: (value:boolean) =>void;
    status: string;
}

export const Modal:React.FC<ModalTypes>= ({ active, setActive, status}) =>{

    return (
        <div onClick={()=>setActive(false)} className={active?'add-modal-todo add-modal-todo__active':'add-modal-todo'}>
            <div onClick={(e)=>e.stopPropagation()} className='modal-add__content'>
                <h1 className='close-modal-todo' onClick={()=>setActive(false)}>X</h1>
            <AddOneTodo setActive={setActive} status={status}/>
            </div>
        </div>
    );
}