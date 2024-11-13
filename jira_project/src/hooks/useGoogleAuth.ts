import { useEffect, useState, useCallback } from "react";

const GOOGLE_CLIENT_ID = "886210303406-nel1i76kh24lu6rjoangc5o8iqm1mr45.apps.googleusercontent.com"

interface GoogleUser {
  id: string
  name: string
  email: string
  picture: string
  accessToken: string
  emailVerified: boolean
}

const useGoogleAuth = () => {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<GoogleUser | null>(null)

  const loadGoogleScript = useCallback(() => {
    if (document.querySelector('script#google-identity-services')) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.id = 'google-identity-services'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      })
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    loadGoogleScript()
  }, [loadGoogleScript])

  const handleCredentialResponse = useCallback((response: any) => {
    const credential = response.credential

    const payload = JSON.parse(atob(credential.split('.')[1]))

    const guser: GoogleUser = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      accessToken: credential,
      emailVerified: payload.email_verified
    }

    setUser(guser)
  }, [])

  const signIn = useCallback(() => {
    if (!isReady) {
      console.error('Google Identity Services not ready')
      return
    }

    try {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.error('Google Sign-In prompt not displayed:', notification.getNotDisplayedReason())
        } else if (notification.isSkippedMoment()) {
          console.error('Google Sign-In prompt skipped:', notification.getSkippedReason())
        } else if (notification.isDismissedMoment()) {
          if (notification.getDismissedReason() === 'credential_returned') {
            console.log('Credential returned successfully')
          } else {
            console.error('Google Sign-In prompt dismissed:', notification.getDismissedReason())
          }
        } else {
            console.log("displayed", notification)
         }
      })
    } catch (error) {
      console.error('Error during Google Sign-In:', error)
    }
  }, [isReady])

  const signOut = useCallback(() => {
    window.google.accounts.id.disableAutoSelect()
    setUser(null)
  }, [])

  return {
    glogin: signIn,
    glogout: signOut,
    user
  }
}

export default useGoogleAuth