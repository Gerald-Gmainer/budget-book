import React from 'react';
import {CCard, CCardBody} from "@coreui/react";
import {CChartDoughnut} from '@coreui/react-chartjs';
import CIcon from "@coreui/icons-react";
import {cilBasket, cilFastfood, cilHome, cilRestaurant, cilSpreadsheet, cilStar} from '@coreui/icons';

const data = {
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
const totalSum = data.datasets[0].data.reduce((a, b) => a + b, 0);

const CategoryGraph = () => {
    return (
        <CCard className="mb-3">
            <CCardBody>
                <div className="chart-wrapper" style={{position: 'relative', height: '250px', width: '250px', margin: 'auto'}}>
                    <CChartDoughnut data={data} options={options}/>
                </div>

                <ul className="category-list" style={{listStyle: 'none', padding: 0}}>
                    {data.labels.map((label, index) => {
                        const percentage = ((data.datasets[0].data[index] / totalSum) * 100).toFixed(2);
                        return (
                            <li key={label} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                <CIcon icon={icons[index]} style={{color: data.datasets[0].backgroundColor[index], marginRight: '10px'}}/>
                                <span style={{flex: 1}}>{label}</span>
                                <span style={{marginRight: '10px'}}>{percentage}%</span>
                                <span>{data.datasets[0].data[index]}</span>
                            </li>
                        );
                    })}
                </ul>
            </CCardBody>
        </CCard>
    );
};

export default CategoryGraph;
