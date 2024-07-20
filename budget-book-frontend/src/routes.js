import React from 'react'

const Dashboard = React.lazy(() => import('./features/dashboard/Dashboard'))
const ReportGraph = React.lazy(() => import('./features/transactions/Transactions'))

const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/dashboard', name: 'Dashboard', element: Dashboard},
    {path: '/report/graph', name: 'Report Graph', element: ReportGraph},
]

export default routes