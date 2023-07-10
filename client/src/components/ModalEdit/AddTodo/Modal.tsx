
import './Modal.scss';
import { EditToDo } from '../../EditToDo';

interface ModalTypes {
    active: boolean;
    setActive: (value:boolean) =>void;
    id:number;
}

export const Modal:React.FC<ModalTypes>= ({ active, setActive, id}) =>{

    return (
        <div onClick={()=>setActive(false)} className={active?'edit-modal-todo edit-modal-todo__active':'edit-modal-todo'}>
            <div onClick={(e)=>e.stopPropagation()} className='modal-edit__content'>
            <h1 className='close-modal-todo' onClick={()=>setActive(false)}>X</h1>
            <EditToDo setActive={setActive} id={id}/>
            </div>
        </div>
    );
}