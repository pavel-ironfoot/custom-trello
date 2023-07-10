import { useDispatch } from 'react-redux';
import { AddCategoryProps } from '../../common/types-and-interfaces';
import { deleteCategoryFetch } from '../../common/request-functions';
import { changeBlockValue } from '../../store/blockSliceRerender';

import './DeleteCategory.scss';

export const DeleteCategory: React.FC<AddCategoryProps> = ({ status }) => {

    const dispatch = useDispatch();

    const deleteCategory = async () => {
        await deleteCategoryFetch(status);
        dispatch(changeBlockValue())
    }

    return (
        <div className='delete-category'>
            <h1 onClick={deleteCategory}>X</h1>
        </div>
    );
}