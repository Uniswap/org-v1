import React from 'react'

export default function ExternalRedirect({ href }) {
  React.useEffect(() => {
    window.location.assign(href)
  }, [])
  return null
}
