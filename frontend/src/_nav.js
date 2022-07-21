import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBook, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName={`nav-icon`} />,
  },
  {
    component: CNavTitle,
    name: 'Book',
  },
  {
    component: CNavItem,
    name: 'Books',
    to: '/books',
    icon: <CIcon icon={cilBook} customClassName={`nav-icon`} />,
  },
  {
    component: CNavItem,
    name: 'Upload Book',
    to: '/book/upload',
    icon: <CIcon icon={cilBook} customClassName={`nav-icon`} />,
  },
]

export default _nav
