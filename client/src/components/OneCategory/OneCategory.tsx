import { useEffect, useState } from 'react';
import { OneToDo } from '../OneToDo';
import { BlockArea } from '../BlockArea';
import { OneCategoryProps, OnePost } from '../../common/types-and-interfaces';
import { DeleteCategory } from '../DeleteCategory';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { calculateAllEstimated, calculateAllRemaining, calculateTimeElapsed, calculateTimeRemaining, calculateTotalTime, checkSingleIdProperty } from '../../common/useful-functions';
import { fetchCategoryPosts, updateStatusPost } from '../../common/request-functions';
import { ModalPageAdd } from '../ModalPagesAdd';

import './OneCategory.scss';

export const OneCategory: React.FC<OneCategoryProps> = ({ dragLight, setDragLight, dragCategoryLight, index, currentToDo, setCurrentToDo, status }) => {
  const [categoryPosts, setCategoryPosts] = useState<OnePost[] | []>([]);
  const selectHelpRerender = useSelector((state: RootState) => state.help.helpRerender);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategoryPosts(index, setCategoryPosts);
  }, [selectHelpRerender]);


  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, elem: any) => {
    e.stopPropagation();
    setCurrentToDo({ ...elem });
    setDragLight('one-category__one-todo__drop')
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = async (e: React.DragEvent<HTMLDivElement>, card: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!checkSingleIdProperty(currentToDo)) {
      await updateStatusPost(currentToDo.id, card.id, dispatch);
    }
  };

  const dragEndHandler = () => {
    setDragLight('');
  }

  const alltime = calculateAllRemaining(categoryPosts);
  const allestimatedTime = calculateAllEstimated(categoryPosts);

  const showPosts = categoryPosts.map((elem, index) => <div
    className={`one-category__one-todo ${dragLight}`}
    key={elem.title + elem.status + elem.description + index}
    draggable={true}
    onDragStart={(e) => dragStartHandler(e, elem)}
    onDragOver={(e) => dragOverHandler(e)}
    onDrop={(e) => dropHandler(e, elem)}
    onDragEnd={() => dragEndHandler()}
  >
    <OneToDo
      status={elem.status}
      id={elem.id}
      title={elem.title}
      description={elem.description}
      members={elem.members}
      comments={elem.comments}
      duedate={elem.duedate}
      timeNow={elem.timeNow}
    />
  </div>);

  return (
    <div className='one-category'>
      <header className={`one-category__header ${dragCategoryLight}`}>
        <p>{allestimatedTime == '0:NaN:NaN:NaN' ? <>total spended time 0</> : <> total spended time <span className='one-category__header__value'>{allestimatedTime}</span></>}</p>
        <p>{alltime == '0:NaN:NaN:NaN' ? <>total remaining time 0</> : <> total remaining time <span className='one-category__header__value'>{alltime}</span></>}</p>
        <h1>{status}</h1>
        <p>In this block you can add blocks </p>
        <p> with task that you need to </p>
        <h3>{status}</h3>
        <p>number of tasks: <span className='one-category__header__value'>{categoryPosts.length}</span></p>
      </header>

      {showPosts}

      <BlockArea
        dragLight={dragLight}
        setDragLight={setDragLight}
        currentToDo={currentToDo}
        status={status}
      />
      <ModalPageAdd
        status={status}
      />
      <DeleteCategory
        status={status}
      />
    </div>
  );
}