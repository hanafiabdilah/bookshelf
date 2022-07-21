import { Routes, Route, Navigate } from 'react-router-dom'
import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'

import routes from '../routes'

export default function Content(params) {
  return (
    <>
      <CContainer lg>
        <Suspense fallback={<CSpinner color="danger" />}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              )
            })}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </CContainer>
    </>
  )
}
