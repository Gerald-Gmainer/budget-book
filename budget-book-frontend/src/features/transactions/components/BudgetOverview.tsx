import React from 'react';
import {CCard, CCardBody, CCol, CRow} from '@coreui/react';
import {BudgetSummary} from "../../../types";
import './BudgetOverview.scss'
import {formatCurrency} from "../../../utils/formatCurrency";

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
                            <p className="text-success">{formatCurrency(data.income)}</p>
                        </div>
                    </CCol>
                    <CCol>
                        <div className="budget-item">
                            <span>Outcome</span>
                            <p className="text-danger">{formatCurrency(data.outcome)}</p>
                        </div>
                    </CCol>
                    <CCol>
                        <div className="budget-item">
                            <span>Balance</span>
                            <p className="text-primary">{formatCurrency(data.balance)}</p>
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default BudgetOverview;