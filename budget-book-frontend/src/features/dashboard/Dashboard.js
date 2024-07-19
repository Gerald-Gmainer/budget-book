import React, {useEffect, useRef} from 'react'
import classNames from 'classnames'

import {CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CProgress, CRow, CWidgetStatsA,} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilArrowBottom, cilArrowTop, cilCloudDownload, cilOptions,} from '@coreui/icons'
import MainChart from './MainChart'
import {CChartBar, CChartLine} from "@coreui/react-chartjs";
import {getStyle} from "@coreui/utils";

const Dashboard = () => {
    const progressExample = [
        {title: 'Fixed Costs', value: '29.703 Users', percent: 40, color: 'success'},
        {title: 'Food Costs', value: '24.093 Users', percent: 20, color: 'info'},
        {title: 'Variable Costs', value: '78.706 Views', percent: 60, color: 'warning'},
        {title: 'Other costs', value: '22.123 Users', percent: 80, color: 'danger'},
        {title: 'Income', value: 'Average Rate', percent: 40.15, color: 'primary'},
    ]

    const widgetChartRef1 = useRef(null)
    const widgetChartRef2 = useRef(null)

    useEffect(() => {
        document.documentElement.addEventListener('ColorSchemeChange', () => {
            if (widgetChartRef1.current) {
                setTimeout(() => {
                    widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
                    widgetChartRef1.current.update()
                })
            }

            if (widgetChartRef2.current) {
                setTimeout(() => {
                    widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
                    widgetChartRef2.current.update()
                })
            }
        })
    }, [widgetChartRef1, widgetChartRef2])

    return (
        <>
            <CRow className="mb-4" xs={{gutter: 4}}>
                <CCol sm={6} xl={4} xxl={3}>
                    <CWidgetStatsA
                        color="primary"
                        value={
                            <>
                                26K{' '}
                                <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom}/>)
              </span>
                            </>
                        }
                        title="Monthly Balance"
                        action={
                            <CDropdown alignment="end">
                                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                                    <CIcon icon={cilOptions}/>
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem>Action</CDropdownItem>
                                    <CDropdownItem>Another action</CDropdownItem>
                                    <CDropdownItem>Something else here...</CDropdownItem>
                                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        }
                        chart={
                            <CChartLine
                                ref={widgetChartRef1}
                                className="mt-3 mx-3"
                                style={{height: '70px'}}
                                data={{
                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                    datasets: [
                                        {
                                            label: 'My First dataset',
                                            backgroundColor: 'transparent',
                                            borderColor: 'rgba(255,255,255,.55)',
                                            pointBackgroundColor: getStyle('--cui-primary'),
                                            data: [65, 59, 84, 84, 51, 55, 40],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            border: {
                                                display: false,
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false,
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        },
                                        y: {
                                            min: 30,
                                            max: 89,
                                            display: false,
                                            grid: {
                                                display: false,
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        },
                                    },
                                    elements: {
                                        line: {
                                            borderWidth: 1,
                                            tension: 0.4,
                                        },
                                        point: {
                                            radius: 4,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                        },
                                    },
                                }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} xl={4} xxl={3}>
                    <CWidgetStatsA
                        color="info"
                        value={
                            <>
                                $6.200{' '}
                                <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop}/>)
              </span>
                            </>
                        }
                        title="Yearly Balance"
                        action={
                            <CDropdown alignment="end">
                                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                                    <CIcon icon={cilOptions}/>
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem>Action</CDropdownItem>
                                    <CDropdownItem>Another action</CDropdownItem>
                                    <CDropdownItem>Something else here...</CDropdownItem>
                                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        }
                        chart={
                            <CChartLine
                                ref={widgetChartRef2}
                                className="mt-3 mx-3"
                                style={{height: '70px'}}
                                data={{
                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                    datasets: [
                                        {
                                            label: 'My First dataset',
                                            backgroundColor: 'transparent',
                                            borderColor: 'rgba(255,255,255,.55)',
                                            pointBackgroundColor: getStyle('--cui-info'),
                                            data: [1, 18, 9, 17, 34, 22, 11],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            border: {
                                                display: false,
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false,
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        },
                                        y: {
                                            min: -9,
                                            max: 39,
                                            display: false,
                                            grid: {
                                                display: false,
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        },
                                    },
                                    elements: {
                                        line: {
                                            borderWidth: 1,
                                        },
                                        point: {
                                            radius: 4,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                        },
                                    },
                                }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} xl={4} xxl={3}>
                    <CWidgetStatsA
                        color="warning"
                        value={
                            <>
                                2.49%{' '}
                                <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop}/>)
              </span>
                            </>
                        }
                        title="All Balance"
                        action={
                            <CDropdown alignment="end">
                                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                                    <CIcon icon={cilOptions}/>
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem>Action</CDropdownItem>
                                    <CDropdownItem>Another action</CDropdownItem>
                                    <CDropdownItem>Something else here...</CDropdownItem>
                                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        }
                        chart={
                            <CChartLine
                                className="mt-3"
                                style={{height: '70px'}}
                                data={{
                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                    datasets: [
                                        {
                                            label: 'My First dataset',
                                            backgroundColor: 'rgba(255,255,255,.2)',
                                            borderColor: 'rgba(255,255,255,.55)',
                                            data: [78, 81, 80, 45, 34, 12, 40],
                                            fill: true,
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            display: false,
                                        },
                                        y: {
                                            display: false,
                                        },
                                    },
                                    elements: {
                                        line: {
                                            borderWidth: 2,
                                            tension: 0.4,
                                        },
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                        },
                                    },
                                }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} xl={4} xxl={3}>
                    <CWidgetStatsA
                        color="danger"
                        value={
                            <>
                                44K{' '}
                                <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom}/>)
              </span>
                            </>
                        }
                        title="Month-end Money"
                        action={
                            <CDropdown alignment="end">
                                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                                    <CIcon icon={cilOptions}/>
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem>Action</CDropdownItem>
                                    <CDropdownItem>Another action</CDropdownItem>
                                    <CDropdownItem>Something else here...</CDropdownItem>
                                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        }
                        chart={
                            <CChartBar
                                className="mt-3 mx-3"
                                style={{height: '70px'}}
                                data={{
                                    labels: [
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                        'August',
                                        'September',
                                        'October',
                                        'November',
                                        'December',
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                    ],
                                    datasets: [
                                        {
                                            label: 'My First dataset',
                                            backgroundColor: 'rgba(255,255,255,.2)',
                                            borderColor: 'rgba(255,255,255,.55)',
                                            data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                                            barPercentage: 0.6,
                                        },
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                display: false,
                                                drawTicks: false,
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        },
                                        y: {
                                            border: {
                                                display: false,
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false,
                                                drawTicks: false,
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        },
                                    },
                                }}
                            />
                        }
                    />
                </CCol>
            </CRow>

            <CCard className="mb-4">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 id="traffic" className="card-title mb-0">
                                Income / Outcome
                            </h4>
                            <div className="small text-body-secondary">January - July 2023</div>
                        </CCol>
                        <CCol sm={7} className="d-none d-md-block">
                            <CButton color="primary" className="float-end">
                                <CIcon icon={cilCloudDownload}/>
                            </CButton>
                            <CButtonGroup className="float-end me-3">
                                {['Day', 'Month', 'Year'].map((value) => (
                                    <CButton
                                        color="outline-secondary"
                                        key={value}
                                        className="mx-0"
                                        active={value === 'Month'}
                                    >
                                        {value}
                                    </CButton>
                                ))}
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                    <MainChart/>
                </CCardBody>
                <CCardFooter>
                    <CRow
                        xs={{cols: 1, gutter: 4}}
                        sm={{cols: 2}}
                        lg={{cols: 4}}
                        xl={{cols: 5}}
                        className="mb-2 text-center"
                    >
                        {progressExample.map((item, index, items) => (
                            <CCol
                                className={classNames({
                                    'd-none d-xl-block': index + 1 === items.length,
                                })}
                                key={index}
                            >
                                <div className="text-body-secondary">{item.title}</div>
                                <div className="fw-semibold text-truncate">
                                    {item.value} ({item.percent}%)
                                </div>
                                <CProgress thin className="mt-2" color={item.color} value={item.percent}/>
                            </CCol>
                        ))}
                    </CRow>
                </CCardFooter>
            </CCard>
        </>
    )
}

export default Dashboard
