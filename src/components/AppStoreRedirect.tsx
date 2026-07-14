import { useEffect } from 'react'

const APP_STORE_URL = 'https://apps.apple.com/sv/app/mi-fondo-app/id1461509423?l=en-GB'

export function AppStoreRedirect() {
  useEffect(() => {
    window.location.replace(APP_STORE_URL)
  }, [])

  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <a href={APP_STORE_URL}>Abrir en App Store</a>
    </main>
  )
}
