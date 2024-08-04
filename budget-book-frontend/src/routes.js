import React from 'react'

const Dashboard = React.lazy(() => import('./features/dashboard/Dashboard'))
const Transactions = React.lazy(() => import('./features/transactions/Transactions'))

const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/dashboard', name: 'Dashboard', element: Dashboard},
    {path: '/transactions', name: 'Transactions', element: Transactions},
]

export default routes