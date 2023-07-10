import { useDispatch } from 'react-redux';
import { BlockAreaProps } from '../../common/types-and-interfaces';
import { checkSingleIdProperty } from '../../common/useful-functions';
import { addOneTodoArea } from '../../common/request-functions';

import './BlockArea.scss';


export const BlockArea: React.FC<BlockAreaProps> = ({ dragLight, setDragLight, currentToDo, status }) => {

  const dispatch = useDispatch();

  const dropAreaHandler = async (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!checkSingleIdProperty(currentToDo)) {
      await addOneTodoArea(currentToDo.id, status, dispatch);
      setDragLight('');
    }
  }
  return (
    <div
      className={`one-category__in-area ${dragLight}`}
      onDragOver={(e) => (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault() }}
      onDrop={(e) => dropAreaHandler(e, status)}
    >
      <h1>drag todo here...</h1>
    </div>
  );
}