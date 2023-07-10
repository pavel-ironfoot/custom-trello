import { useState } from 'react';
import { Modal } from './AddTodo';

import './ModalPage.scss';

interface ModalPageAddProps {
    status: string;
}

export const ModalPageAdd: React.FC<ModalPageAddProps> = ({ status }) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <div draggable={false} className='modal-page-call'>
            <button className='modal-page-call__button-add' onClick={() => setActive(true)}>
                <span>
                    add new todo
                </span>
                <i></i>
            </button>
            <Modal
                active={active}
                setActive={setActive}
                status={status}
            />
        </div>
    );
}