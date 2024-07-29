import React, {useCallback, useMemo} from 'react';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react';
import useAccount from '../hooks/useAccount';

const AccountDropdown = () => {
    const {accounts, selectedAccount, status, error, changeAccount} = useAccount();

    const selectedAccountName = useMemo(() => {
        if (selectedAccount === null) {
            return "All Accounts";
        }
        const account = accounts.find(x => x.id === selectedAccount);
        return account ? account.name : "All Accounts";
    }, [accounts, selectedAccount]);

    const handleAccountChange = useCallback((accountId) => {
        changeAccount(accountId);
    }, [changeAccount]);

    const renderDropdownItems = () => {
        switch (status) {
            case 'loading':
                return <CDropdownItem>Loading...</CDropdownItem>;
            case 'failed':
                return <CDropdownItem>Error: {error}</CDropdownItem>;
            case 'succeeded':
                return (
                    <>
                        <CDropdownItem key={null} onClick={() => handleAccountChange(null)}>
                            All Accounts
                        </CDropdownItem>
                        {accounts.map((account) => (
                            <CDropdownItem key={account.id} onClick={() => handleAccountChange(account.id)}>
                                {account.name}
                            </CDropdownItem>
                        ))}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <CDropdown variant="btn-group">
            <CDropdownToggle color="secondary" variant="outline">
                {selectedAccountName}
            </CDropdownToggle>
            <CDropdownMenu>
                {renderDropdownItems()}
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AccountDropdown;
