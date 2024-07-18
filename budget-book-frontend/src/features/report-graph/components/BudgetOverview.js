import React from 'react';
import {CCard, CCardBody, CCol, CRow} from '@coreui/react';

const BudgetOverview = () => {
    const data = {
        income: 1000,
        outcome: 500,
        balance: 500,
    };

    return (
        <CCard className="mb-3">
            <CCardBody>
                <CRow className="text-center">
                    <CCol>
                        <div className="budget-item">
                            <h5>Income</h5>
                            <p className="text-success">${data.income}</p>
                        </div>
                    </CCol>
                    <CCol>
                        <div className="budget-item">
                            <h5>Outcome</h5>
                            <p className="text-danger">${data.outcome}</p>
                        </div>
                    </CCol>
                    <CCol>
                        <div className="budget-item">
                            <h5>Balance</h5>
                            <p className="text-primary">${data.balance}</p>
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default BudgetOverview;
