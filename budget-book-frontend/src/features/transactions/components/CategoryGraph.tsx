import React from 'react';
import {CCard, CCardBody} from "@coreui/react";
import {CChartDoughnut} from '@coreui/react-chartjs';
import CategoryBookingOverviewItem from "./CategoryBookingOverviewItem";
import "./CategoryGraph.scss"
import {CategoryBookingOverview} from "../../../types/categoryBookingOverview";

const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

interface CategoryGraphProps {
    data: { overviews: CategoryBookingOverview[] };
}

const CategoryGraph: React.FC<CategoryGraphProps> = ({data}) => {
    const filteredOverviews = data.overviews.flatMap(overview =>
        overview.children.length > 0 ? overview.children : [overview]
    );
    const labels = filteredOverviews.map(overview => overview.category.name);
    const chartData = filteredOverviews.map(overview => overview.amount);
    const backgroundColors = filteredOverviews.map(overview => overview.category.colorCode);

    const doughnutData = {
        labels: labels,
        datasets: [
            {
                data: chartData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors,
            },
        ],
    };

    return (
        <CCard className="mb-3">
            <CCardBody>
                <div className="chart-wrapper">
                    <CChartDoughnut data={doughnutData} options={options}/>
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
