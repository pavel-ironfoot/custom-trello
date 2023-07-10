import './ModalButton.scss';

interface ModalButtonProps {
    show:boolean;
    text:string;
}

export const ModalButton:React.FC<ModalButtonProps> = ({show, text}) =>{
    return (
        <button className='modal-page__custom-button' disabled={show} type='submit'>{text}</button>
    );
}