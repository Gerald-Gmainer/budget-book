import React from 'react';
import {CCard, CCardBody} from "@coreui/react";
import {CChartDoughnut} from '@coreui/react-chartjs';
import CategoryBookingOverviewItem from "./CategoryBookingOverviewItem";
import "./CategoryGraph.scss";
import {CategoryBookingOverview} from "../../../types/categoryBookingOverview";

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
    data: { overviews: CategoryBookingOverview[] };
}

const CategoryGraph: React.FC<CategoryGraphProps> = ({data}) => {
    const parentOverviews = data.overviews;

    // Filter child overviews (exclude overviews that have children)
    const childOverviews = data.overviews.flatMap(overview =>
        overview.children.length > 0 ? overview.children : [overview]
    ).filter(overview => overview.children.length === 0);

    const parentLabels = parentOverviews.map(overview => overview.category.name);
    const parentData = parentOverviews.map(overview => overview.amount);
    const parentColors = parentOverviews.map(overview => overview.category.colorCode);

    const childLabels = childOverviews.map(overview => overview.category.name);
    const childData = childOverviews.map(overview => overview.amount);
    const childColors = childOverviews.map(overview => overview.category.colorCode);

    const totalParentAmount = parentOverviews.reduce((sum, overview) => sum + overview.amount, 0);
    const totalChildAmount = childOverviews.reduce((sum, overview) => sum + overview.amount, 0);

    console.log(totalParentAmount, parentData);
    console.log(totalChildAmount, childData);
    const doughnutData = {
        labels: [...parentLabels, ...childLabels],
        datasets: [
            {
                data: parentData,
                backgroundColor: parentColors,
                hoverBackgroundColor: parentColors,
                borderColor: ["#000"]
            },
            {
                data: childData,
                backgroundColor: childColors,
                hoverBackgroundColor: childColors,
                weight: 1,
                borderColor: ["#000"]
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
