import { CAlert } from '@coreui/react'

export default function Alert(params) {
  return (
    <CAlert color={params.color ?? 'warning'} dismissible>
      {params.message}
    </CAlert>
  )
}
