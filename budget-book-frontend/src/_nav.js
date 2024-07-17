import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilSpeedometer,} from '@coreui/icons'
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
        name: 'Graph',
        to: '/report/graph',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
    },
]

export default _nav