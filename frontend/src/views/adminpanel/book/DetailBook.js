import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSwitch,
  CFormTextarea,
} from '@coreui/react'

export default function DetailBook() {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [book, setBook] = useState()
  const [response, setResponse] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const getBook = async () => {
      await axios
        .get(`http://localhost:5000/books/${id}`)
        .then((res) => {
          setBook(res.data.data.book)
          setResponse(res.data)
          setIsLoading(false)
        })
        .catch((e) => {
          setError(e)
          setResponse(e.response.data)
          setIsLoading(false)
        })
    }

    getBook()
  }, [id])

  if (isLoading) {
    return (
      <>
        <CSpinner size={'sm'} />
        {' Is Retrieving Data...'}
      </>
    )
  }

  if (error && !response) {
    return <>{error.message}</>
  }

  if (response.status === 'fail') {
    return <>{response.message}</>
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Detail Book</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="justify-content-around">
                <CCol xs={3}>
                  <img
                    src={book.imageCoverUrl}
                    style={{ width: '100%' }}
                    alt={book.name}
                    className="rounded"
                  />
                </CCol>
                <CCol xs={7}>
                  <CForm noValidate>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Book Name
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput defaultValue={book.name} disabled />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Year
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput defaultValue={book.year} disabled />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Author
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput defaultValue={book.author} disabled />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Summary
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormTextarea
                          rows="6"
                          defaultValue={book.summary}
                          disabled
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Publisher
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput defaultValue={book.publisher} disabled />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Page Count
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput defaultValue={book.pageCount} disabled />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Read Page
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput defaultValue={book.readPage} disabled />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3 align-items-center">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Reading
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormSwitch
                          size="lg"
                          defaultChecked={book.reading}
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        Image Cover URL
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          defaultValue={book.imageCoverUrl}
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <div className="text-end">
                      <Link
                        size={'sm'}
                        to={`/book/edit/${book.id}`}
                        className="btn btn-warning btn-sm px-5"
                      >
                        Edit
                      </Link>
                    </div>
                  </CForm>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
