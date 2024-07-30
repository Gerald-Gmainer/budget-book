import {useDispatch, useSelector} from 'react-redux';
import {setDate, setPeriod} from "../slices/dateFilterSlice";
import {format} from "date-fns";

const useDateFilter = () => {
    const dispatch = useDispatch();
    const selectedPeriod = useSelector((state) => state.dateFilter.period);
    const selectedDate = useSelector((state) => state.dateFilter.date);

    const changeSelectedPeriod = (period) => {
        dispatch(setPeriod(period));
    };

    const changeSelectedDate = (date) => {
        dispatch(setDate(format(date, 'yyyy-MM-dd')));
    }

    return {
        selectedPeriod,
        selectedDate,
        changeSelectedPeriod,
        changeSelectedDate,
    };
};

export default useDateFilter;