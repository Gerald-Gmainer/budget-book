import React from 'react';
import {CCard, CCardBody} from "@coreui/react";
import {CChartDoughnut} from '@coreui/react-chartjs';
import CategoryBookingOverviewItem from "./CategoryBookingOverviewItem";
import "./CategoryGraph.scss";
import {CategoryBookingOverview} from "../../../types";

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
};

interface CategoryGraphProps {
    data: CategoryBookingOverview[];
}

const CategoryGraph: React.FC<CategoryGraphProps> = ({data}) => {
    const parentOverviews = data;
    const childOverviews = [...data.filter(overview => overview.children.length === 0), ...parentOverviews.flatMap(overview => overview.children)];

    const parentLabels = parentOverviews.map(overview => overview.category.name);
    const parentData = parentOverviews.map(overview => overview.amount);
    const parentColors = parentOverviews.map(overview => overview.category.colorCode);

    const childLabels = childOverviews.map(overview => overview.category.name)
    const childData = childOverviews.map(overview => overview.amount)
    const childColors = childOverviews.map(overview => overview.category.colorCode)

    const doughnutData = {
        labels: [...parentLabels, ...childLabels],
        datasets: [
            {
                label: 'Parent Categories',
                data: parentData,
                backgroundColor: parentColors,
                hoverBackgroundColor: parentColors,
                borderColor: parentColors,
                hoverBorderColor: parentColors,
                borderWidth: 0,
                cutout: '60%',
            },
            {
                label: 'Child Categories',
                data: childData,
                backgroundColor: childColors,
                hoverBackgroundColor: childColors,
                borderColor: childColors,
                hoverBorderColor: childColors,
                borderWidth: 0,
                weight: 1.5,
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
                    {data.map((overview, index) => (
                        <CategoryBookingOverviewItem key={index} overview={overview}/>
                    ))}
                </ul>
            </CCardBody>
        </CCard>
    );
};

export default CategoryGraph;
