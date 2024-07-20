import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {fetchAccounts, setAccount} from '../slices/accountSlice';

const useAccount = () => {
    const dispatch = useDispatch();
    const {accounts, selectedAccount, status, error} = useSelector((state) => state.account);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAccounts());
        }
    }, [status, dispatch]);

    const changeAccount = (account) => {
        dispatch(setAccount(account));
    };

    return {
        accounts,
        selectedAccount,
        status,
        error,
        changeAccount,
    };
};

export default useAccount;