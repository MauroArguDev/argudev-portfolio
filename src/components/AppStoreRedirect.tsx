import { useEffect } from 'react'

const APP_STORE_URL = 'https://apps.apple.com/sv/app/mi-fondo-app/id1461509423?l=en-GB'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.devsu.fiducia'

function getStoreUrl() {
  const isAndroid = /android/i.test(navigator.userAgent)
  return isAndroid ? PLAY_STORE_URL : APP_STORE_URL
}

export function AppStoreRedirect() {
  useEffect(() => {
    window.location.replace(getStoreUrl())
  }, [])

  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <a href={APP_STORE_URL}>Abrir en App Store</a>
      {' / '}
      <a href={PLAY_STORE_URL}>Abrir en Play Store</a>
    </main>
  )
}
