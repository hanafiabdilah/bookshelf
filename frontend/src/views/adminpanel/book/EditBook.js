import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
  CSpinner,
  CFormSwitch,
} from '@coreui/react'
import { Alert } from '../../../components/index.js'

export default function EditBook() {
  const { id } = useParams()

  const [validated, setValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  const [bookName, setBookName] = useState()
  const [year, setYear] = useState()
  const [author, setAuthor] = useState()
  const [summary, setSummary] = useState()
  const [publisher, setPublisher] = useState()
  const [pageCount, setPageCount] = useState()
  const [readPage, setReadPage] = useState()
  const [reading, setReading] = useState(false)
  const [imageCoverUrl, setImageCoverUrl] = useState()

  const [responseUpload, setResponseUpload] = useState()
  const [errorUpload, setErrorUpload] = useState()
  const [response, setResponse] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const getBook = async () => {
      await axios
        .get(`http://localhost:5000/books/${id}`)
        .then((res) => {
          setBookName(res.data.data.book.name)
          setYear(res.data.data.book.year)
          setAuthor(res.data.data.book.author)
          setSummary(res.data.data.book.summary)
          setPublisher(res.data.data.book.publisher)
          setPageCount(res.data.data.book.pageCount)
          setReadPage(res.data.data.book.readPage)
          setReading(res.data.data.book.reading)
          setImageCoverUrl(res.data.data.book.imageCoverUrl)
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

  const updateBook = async (e) => {
    e.preventDefault()

    const data = {
      name: bookName,
      year,
      author,
      summary,
      publisher,
      pageCount: parseInt(pageCount),
      readPage: parseInt(readPage),
      reading,
      imageCoverUrl,
    }

    await axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then((res) => {
        setResponseUpload(res.data)
        setIsUploading(false)
      })
      .catch((e) => {
        setResponseUpload(e.response.data)
        setErrorUpload(e)
        setIsUploading(false)
      })
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
    } else {
      setIsUploading(true)
      updateBook(e)
    }
  }

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
          {errorUpload || responseUpload ? (
            <Alert
              color={
                errorUpload
                  ? 'danger'
                  : (responseUpload.status === 'fail' && 'danger') ||
                    (responseUpload.status === 'success' && 'success')
              }
              message={
                errorUpload && !responseUpload
                  ? errorUpload.message
                  : responseUpload.message
              }
            />
          ) : (
            ''
          )}
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Detail Book</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="justify-content-around">
                <CCol xs={3}>
                  <img
                    src={imageCoverUrl}
                    style={{ width: '100%' }}
                    alt={bookName}
                    className="rounded"
                  />
                </CCol>
                <CCol xs={7}>
                  <CForm
                    noValidate
                    className="needs-validation"
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <CRow className="mb-3">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="bookName"
                      >
                        Book Name
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="bookName"
                          placeholder="Harry Potter"
                          feedbackValid="Looks good!"
                          feedbackInvalid="The field is required"
                          defaultValue={bookName}
                          required
                          onChange={(e) => setBookName(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="year"
                      >
                        Year
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="number"
                          id="year"
                          placeholder={new Date().getFullYear()}
                          feedbackValid="Looks good!"
                          feedbackInvalid="The field is required"
                          defaultValue={year}
                          required
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="author"
                      >
                        Author
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="author"
                          placeholder="John Doe"
                          feedbackValid="Looks good!"
                          feedbackInvalid="The field is required"
                          defaultValue={author}
                          required
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="summary"
                      >
                        Summary
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormTextarea
                          id="summary"
                          rows="6"
                          placeholder="Shakespeare’s play Romeo and Juliet is the world most famous romantic tragedy ..."
                          feedbackValid="Looks good!"
                          feedbackInvalid="The field is required"
                          defaultValue={summary}
                          required
                          onChange={(e) => setSummary(e.target.value)}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="publisher"
                      >
                        Publisher
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="publisher"
                          placeholder="Gramedia"
                          feedbackValid="Looks good!"
                          feedbackInvalid="The field is required"
                          defaultValue={publisher}
                          required
                          onChange={(e) => setPublisher(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="pageCount"
                      >
                        Page Count
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="number"
                          id="pageCount"
                          placeholder="80"
                          feedbackValid="Looks good!"
                          feedbackInvalid="The field is required"
                          defaultValue={pageCount}
                          required
                          onChange={(e) => setPageCount(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="readPage"
                      >
                        Read Page
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="number"
                          id="readPage"
                          placeholder="56"
                          feedbackValid="Looks good!"
                          feedbackInvalid={
                            readPage
                              ? 'Cannot be more than page count'
                              : 'The field is required'
                          }
                          defaultValue={readPage}
                          max={pageCount}
                          required
                          onChange={(e) => setReadPage(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3 align-items-center">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="reading"
                      >
                        Reading
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormSwitch
                          size="lg"
                          id="reading"
                          defaultChecked={reading}
                          onChange={(e) => {
                            setReading(e.target.checked)
                          }}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel
                        className="col-sm-2 col-form-label"
                        htmlFor="imageCoverUrl"
                      >
                        Image Cover URL
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="imageCoverUrl"
                          placeholder="https://google.com/image.png"
                          defaultValue={imageCoverUrl}
                          onChange={(e) => setImageCoverUrl(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <div className="text-end">
                      <CButton
                        className="px-5"
                        color="primary"
                        type="submit"
                        disabled={isUploading}
                      >
                        {isUploading && <CSpinner size="sm" />}
                        {!isUploading ? 'Update' : ' Loading'}
                      </CButton>
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
