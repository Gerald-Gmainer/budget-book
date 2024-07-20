import React from 'react';
import {CCard, CCardBody} from "@coreui/react";
import {CChartDoughnut} from '@coreui/react-chartjs';
import {cilBasket, cilFastfood, cilHome, cilRestaurant, cilSpreadsheet, cilStar} from '@coreui/icons';
import CategoryBookingOverviewItem from "./CategoryBookingOverviewItem";
import {BudgetSummary} from "../../../types/budgetSummary";

const data2 = {
    labels: ['Food', 'House', 'Eating Out', 'Household', 'Cloth', 'Other'],
    datasets: [
        {
            data: [500, 1000, 300, 150, 200, 100], // Test data values for each category
            backgroundColor: [
                '#36A2EB',
                '#FF6384',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ], // Colors for each section
            hoverBackgroundColor: [
                '#36A2EB',
                '#FF6384',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ],
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

const icons = [cilFastfood, cilHome, cilRestaurant, cilBasket, cilSpreadsheet, cilStar];
const totalSum = data2.datasets[0].data.reduce((a, b) => a + b, 0);

interface CategoryGraphProps {
    data: BudgetSummary;
}

const CategoryGraph: React.FC<CategoryGraphProps> = ({data}) => {
    return (
        <CCard className="mb-3">
            <CCardBody>
                <div className="chart-wrapper" style={{position: 'relative', height: '250px', width: '250px', margin: 'auto'}}>
                    <CChartDoughnut data={data2} options={options}/>
                </div>

                <ul className="category-list" style={{listStyle: 'none', padding: 0}}>
                    {data.overviews.map((overview, index) => (
                        <CategoryBookingOverviewItem key={index} overview={overview}/>
                    ))}
                </ul>
            </CCardBody>
        </CCard>
    );
};

export default CategoryGraph;
