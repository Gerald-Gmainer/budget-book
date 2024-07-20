import {useDispatch, useSelector} from 'react-redux';
import {setCategoryTypeFilter} from '../slices/categoryTypeFilterSlice';

const useCategoryTypeFilter = () => {
    const dispatch = useDispatch();
    const selectedCategoryTypeFilter = useSelector((state) => state.categoryTypeFilter.selectedCategoryTypeFilter);

    const changeCategoryTypeFilter = (filter) => {
        dispatch(setCategoryTypeFilter(filter));
    };

    return {
        selectedCategoryTypeFilter,
        changeCategoryTypeFilter,
    };
};

export default useCategoryTypeFilter;