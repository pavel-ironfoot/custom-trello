import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OneCategory } from "../OneCategory";
import { Card } from "../../common/types-and-interfaces";
import { AddCategory } from "../AddCategory";
import { RootState } from "../../store";
import { checkSingleIdProperty, getRandomColor } from "../../common/useful-functions";
import { fetchDataMainBlocks, fetchMainUpdateCard } from "../../common/request-functions";

import './Main.scss';

export const Main = () => {
    const [dragCategoryLight, setDragCategoryLight] = useState<string>('');
    const [dragLight, setDragLight] = useState<string>('');
    const [wait, setWait] = useState<boolean>(false);
    const [cardList, setCardList] = useState<Card[] | []>([]);
    const [currentToDo, setCurrentToDo] = useState<any>({ id: 77777, text: '', topic: '', status: '' });
    const blockHelpRerender = useSelector((state: RootState) => state.block.blockRerender);

    let colorShadow = getRandomColor();


    useEffect(() => {
        fetchDataMainBlocks(setCardList, setWait)
    }, [blockHelpRerender]);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
        setCurrentToDo(card);
        setDragCategoryLight('one-category__header-drag');
    };

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (checkSingleIdProperty(currentToDo)) {
            e.currentTarget.style.boxShadow = `0 0 18px ${colorShadow},0 0 38px ${colorShadow},0 0 68px ${colorShadow}`;
        }
    };

    const dragLeaveCaptureHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        colorShadow = getRandomColor();
        if (checkSingleIdProperty(currentToDo)) {
            e.currentTarget.style.boxShadow = 'none';
        }
    }

    const dropHandler = async (e: React.DragEvent<HTMLDivElement>, card: Card) => {
        e.currentTarget.style.boxShadow = 'none';
        if (currentToDo.id === card.id) return;
        e.preventDefault();
        if (checkSingleIdProperty(currentToDo)) {
            await fetchMainUpdateCard(currentToDo.id, card.id, setCardList);
        }
    };

    const dragEndHandler = () => {
        setDragCategoryLight('');
    }

    return (
        <main className="main">
            {wait ? <>{cardList.map((elem, index) => (
                <div
                    key={elem.id}
                    onDragStart={(e) => dragStartHandler(e, elem)}
                    onDragLeaveCapture={(e) => dragLeaveCaptureHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, elem)}
                    onDragEnd={() => dragEndHandler()}
                    draggable={true}
                    className={`main__cards`}
                >
                    <OneCategory
                        dragLight={dragLight}
                        setDragLight={setDragLight}
                        dragCategoryLight={dragCategoryLight}
                        currentToDo={currentToDo}
                        setCurrentToDo={setCurrentToDo}
                        index={index}
                        status={elem.id} />
                </div>
            ))}
                <AddCategory
                />
            </> : <><h1>wait ... </h1></>
            }

        </main>
    );
};
