import 'simplebar/dist/simplebar.min.css'
import React from 'react'
import SimpleBar from 'simplebar-react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilBook } from '@coreui/icons'

import navigation from '../_nav'

import { SidebarNav } from './SidebarNav'

const Sidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <div className="sidebar-brand-full">
          <div className="d-flex align-items-center">
            <CIcon icon={cilBook} height={35} />
            <b>Han Bookshelf</b>
          </div>
        </div>
        <CIcon className="sidebar-brand-narrow" icon={cilBook} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <SidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  )
}

export default React.memo(Sidebar)
