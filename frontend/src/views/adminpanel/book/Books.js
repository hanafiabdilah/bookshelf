import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CRow,
  CCol,
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardSubtitle,
  CSpinner,
} from '@coreui/react'

import noImage from './../../../assets/images/no_image.png'

export default function Books(params) {
  const [isLoading, setIsLoading] = useState(true)
  const [books, setBooks] = useState([])
  const [error, setError] = useState()

  const getBooks = async () => {
    await axios
      .get('http://localhost:5000/books')
      .then((res) => {
        setBooks(res.data.data.books)
        setIsLoading(false)
      })
      .catch((e) => {
        setError(e)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getBooks()
  }, [])

  if (isLoading) {
    return (
      <>
        <CSpinner size={'sm'} />
        {' Is Retrieving Data...'}
      </>
    )
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <CRow>
        {books.length < 1
          ? 'No Book'
          : books.map((book, idx) => {
              return (
                <CCol
                  xl={3}
                  md={4}
                  sm={6}
                  key={idx}
                  className={
                    idx >= 4
                      ? 'mt-3'
                      : idx >= 2
                      ? 'mt-3 mt-lg-0'
                      : idx === 1
                      ? 'mt-3 mt-md-0'
                      : ''
                  }
                >
                  <CCard>
                    <CCardImage
                      orientation="top"
                      src={book.imageCoverUrl ? book.imageCoverUrl : noImage}
                      style={{ height: 350, objectFit: 'cover' }}
                    />
                    <CCardBody>
                      <CCardTitle>{book.name}</CCardTitle>
                      <CCardSubtitle className="mb-2 text-medium-emphasis">
                        {book.author}
                      </CCardSubtitle>
                      <CCardText className="d-none d-lg-block">
                        {book.summary}
                      </CCardText>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <div className="mx-1"></div>
                        <Link
                          size={'sm'}
                          to={`/book/edit/${book.id}`}
                          className="btn btn-warning btn-sm mr-2"
                        >
                          Edit
                        </Link>
                        <div className="mx-1"></div>
                        <Link
                          size={'sm'}
                          to={`/book/detail/${book.id}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          Detail
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              )
            })}
      </CRow>
    </>
  )
}
