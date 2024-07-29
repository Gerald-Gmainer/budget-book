import React from 'react';
import {CCard, CCardBody} from '@coreui/react';
import ReactEcharts from 'echarts-for-react';
import './CategoryGraph.scss';
import {CategoryBookingOverview} from '../../../types';

const CategoryGraph: React.FC<{ data: CategoryBookingOverview[] }> = ({data}) => {
    const parentOverviews = data;
    const childOverviews = [
        ...data.filter((overview) => overview.children.length === 0),
        ...parentOverviews.flatMap((overview) => overview.children),
    ];

    const parentLabels = parentOverviews.map((overview) => overview.category.name);
    const parentData = parentOverviews.map((overview) => overview.amount);
    const parentColors = parentOverviews.map((overview) => overview.category.colorCode);

    const childLabels = childOverviews.map((overview) => overview.category.name);
    const childData = childOverviews.map((overview) => overview.amount);
    const childColors = childOverviews.map((overview) => overview.category.colorCode);

    const getOption = () => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
            },
            series: [
                {
                    name: 'Parent Categories',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
                    label: {
                        position: 'inner',
                        fontSize: 14,
                        rich: {
                            icon: {
                                lineHeight: 20,
                                align: 'center'
                            },
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: parentOverviews.map((overview, index) => ({
                        value: overview.amount,
                        name: overview.category.name,
                        itemStyle: {
                            color: parentColors[index],
                        },
                    })),
                },
                {
                    name: 'Child Categories',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    labelLine: {
                        length: 30,
                    },
                    label: {
                        backgroundColor: 'rgb(33, 38, 49)',
                        color: '#fff',
                        rich: {
                            a: {
                                color: '#6E7079',
                                lineHeight: 22,
                                align: 'center',
                            },
                            hr: {
                                borderColor: '#8C8D8E',
                                width: '100%',
                                borderWidth: 1,
                                height: 0,
                            },
                            b: {
                                color: '#ccc',
                                fontSize: 14,
                                fontWeight: 'bold',
                                lineHeight: 33,
                            },
                            per: {
                                color: '#fff',
                                backgroundColor: '#4C5058',
                                padding: [3, 4],
                                borderRadius: 4,
                            },
                        },
                    },
                    padAngle: 3,
                    data: childOverviews.map((overview, index) => ({
                        value: overview.amount,
                        name: overview.category.name,
                        itemStyle: {
                            color: childColors[index],
                        },
                    })),
                },
            ],
        };
    };

    return (
        <CCard className="mb-3">
            <CCardBody>
                <div className="chart-wrapper">
                    <ReactEcharts option={getOption()} style={{height: '500px', width: '100%'}}/>
                </div>
            </CCardBody>
        </CCard>
    );
};

export default CategoryGraph;
