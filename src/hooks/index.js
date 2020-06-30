const { useState, useEffect } = require('react')

export function useScript(url, id) {
  const [loaded, setLoaded] = useState(false)

  // check for reference to script
  const existingScript = document.getElementById(id)

  // if exists, mark as loaded
  useEffect(() => {
    if (existingScript) {
      setLoaded(true)
    }
  })

  // if not existing, go fetch
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = url
    script.id = id // need to be unique
    document.body.appendChild(script)
    script.onload = () => {
      setLoaded(true)
    }
  }
  return loaded
}
