import React from 'react'

const Books = React.lazy(() => import('./views/adminpanel/book/Books'))
const UploadBook = React.lazy(() =>
  import('./views/adminpanel/book/UploadBook')
)
const DetailBook = React.lazy(() =>
  import('./views/adminpanel/book/DetailBook')
)
const EditBook = React.lazy(() => import('./views/adminpanel/book/EditBook'))
const NotFound = React.lazy(() =>
  import('./views/adminpanel/notfound/NotFound.js')
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/books', name: 'Books', element: Books },
  { path: '/book/upload', name: 'Upload Book', element: UploadBook },
  { path: '/book/detail/:id', name: 'Detail Book', element: DetailBook },
  { path: '/book/edit/:id', name: 'Edit Book', element: EditBook },
  { path: '*', name: 'Not Found', element: NotFound },
]

export default routes
