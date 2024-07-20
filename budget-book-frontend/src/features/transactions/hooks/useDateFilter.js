import {useDispatch, useSelector} from 'react-redux';
import {setDateFilter} from '../slices/dateFilterSlice';

const useDateFilter = () => {
    const dispatch = useDispatch();
    const selectedDateFilter = useSelector((state) => state.dateFilter.selectedDateFilter);

    const changeDateFilter = (dateFilter) => {
        dispatch(setDateFilter(dateFilter));
    };

    return {
        selectedDateFilter,
        changeDateFilter,
    };
};

export default useDateFilter;