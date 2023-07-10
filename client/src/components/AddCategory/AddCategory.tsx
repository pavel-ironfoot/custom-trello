import { AddCategoryProps } from '../../common/types-and-interfaces';
import { useDispatch } from 'react-redux';
import { addCategoryFetch } from '../../common/request-functions';
import { changeBlockValue } from '../../store/blockSliceRerender';
import { useForm, SubmitHandler } from 'react-hook-form';

import './AddCategory.scss'


type AddCategoryFormData = {
    category: string;
};

export const AddCategory: React.FC<AddCategoryProps> = ({ }) => {
    const dispatch = useDispatch();
    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm<AddCategoryFormData>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<AddCategoryFormData> = (data) => {
        addCategoryFetch(data.category);
        dispatch(changeBlockValue());
        reset();
    }

    return (
        <div className="add-category">
            <h1>add new category</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="category">
                    Category status:
                </label>
                <input
                    id={"category"}
                    placeholder='category...'
                    type="text"
                    {...register('category', {
                        required: 'need to fill',
                        minLength: {
                            value: 2,
                            message: 'need more symbols'
                        },
                        maxLength: {
                            value: 12,
                            message: 'less symbols',
                        }
                    })
                    }
                />
                <div className='add-category__errors'>
                    <p>{errors.category?.message}</p>
                </div>
                <button className="add-category__button" disabled={!isValid} type="submit">
                    <span className="add-category__button-border__top add-category__button-border"></span>
                    <span className="add-category__button-border__right add-category__button-border"></span>
                    <span className="add-category__button-border__bottom add-category__button-border"></span>
                    <span className="add-category__button-border__left add-category__button-border"></span>
                    add category
                </button>
            </form>
        </div>
    );
}