import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilDollar, cilSpeedometer} from '@coreui/icons'
import {CNavItem} from '@coreui/react'

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
    },
    {
        component: CNavItem,
        name: 'Transactions',
        to: '/transactions',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon"/>,
    },
]

export default _nav
