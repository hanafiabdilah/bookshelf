import React, { useState } from 'react'
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

export default function UploadBook(params) {
  const [validated, setValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [bookName, setBookName] = useState()
  const [year, setYear] = useState()
  const [author, setAuthor] = useState()
  const [summary, setSummary] = useState()
  const [publisher, setPublisher] = useState()
  const [pageCount, setPageCount] = useState()
  const [readPage, setReadPage] = useState()
  const [reading, setReading] = useState(false)
  const [imageCoverUrl, setImageCoverUrl] = useState()

  const [error, setError] = useState()
  const [response, setResponse] = useState()

  async function addBook(e) {
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
      .post('http://localhost:5000/books', data)
      .then((res) => {
        setResponse(res.data)
        setIsLoading(false)
        setValidated(false)
        setBookName('')
        setYear('')
        setAuthor('')
        setSummary('')
        setPublisher('')
        setPublisher('')
        setPageCount('')
        setReadPage('')
        setImageCoverUrl('')
      })
      .catch((e) => {
        setError(e)
        setResponse(e.response.data)
        setIsLoading(false)
      })
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
    } else {
      setIsLoading(true)
      addBook(e)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          {error || response ? (
            <Alert
              color={
                error
                  ? 'danger'
                  : (response.status === 'fail' && 'danger') ||
                    (response.status === 'success' && 'success')
              }
              message={error && !response ? error.message : response.message}
            />
          ) : (
            ''
          )}
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Upload Book</strong>
            </CCardHeader>
            <CCardBody>
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
                      defaultValue=""
                      value={bookName}
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
                      defaultValue=""
                      value={year}
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
                      defaultValue=""
                      value={author}
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
                      rows="3"
                      placeholder="Shakespeare’s play Romeo and Juliet is the world most famous romantic tragedy ..."
                      feedbackValid="Looks good!"
                      feedbackInvalid="The field is required"
                      value={summary}
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
                      defaultValue=""
                      value={publisher}
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
                      defaultValue=""
                      value={pageCount}
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
                      defaultValue=""
                      value={readPage}
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
                      defaultValue=""
                      value={imageCoverUrl}
                      onChange={(e) => setImageCoverUrl(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <div className="text-end">
                  <CButton
                    className="px-5"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading && <CSpinner size="sm" />}
                    {!isLoading ? 'Upload' : ' Loading'}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
