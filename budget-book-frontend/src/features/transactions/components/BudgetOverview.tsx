import React from 'react';
import {CCard, CCardBody, CCol, CRow} from '@coreui/react';
import {BudgetSummary} from "../../../types/budgetSummary";
import './BudgetOverview.scss'

interface BudgetOverviewProps {
    data: BudgetSummary;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({data}) => {
    return (
        <CCard className="mb-3">
            <CCardBody>
                <CRow className="text-center">
                    <CCol>
                        <div className="budget-item">
                            <span>Income</span>
                            <p className="text-success">{data.income}</p>
                        </div>
                    </CCol>
                    <CCol>
                        <div className="budget-item">
                            <span>Outcome</span>
                            <p className="text-danger">{data.outcome}</p>
                        </div>
                    </CCol>
                    <CCol>
                        <div className="budget-item">
                            <span>Balance</span>
                            <p className="text-primary">{data.balance}</p>
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default BudgetOverview;