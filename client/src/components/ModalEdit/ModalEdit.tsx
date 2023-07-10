import { useState } from 'react';
import { Modal } from './AddTodo';

import './ModalEdit.scss';

interface ModalEditProps {
    id: number;
}

export const ModalEdit: React.FC<ModalEditProps> = ({ id }) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <div draggable={false} className='modal-page-call'>
            <button className='modal-page-call__edit-button' onClick={() => setActive(true)}>edit todo</button>
            <Modal
                active={active}
                setActive={setActive}
                id={id}
            />
        </div>
    );
}