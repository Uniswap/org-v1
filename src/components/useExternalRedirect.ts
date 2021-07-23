import { useEffect } from 'react'

export default function redirectToNewDocs(href: string) {
  useEffect(() => {
    window.location.assign(href)
  }, [])
}
