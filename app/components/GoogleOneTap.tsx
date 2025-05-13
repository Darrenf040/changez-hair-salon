'use client'

import Script from 'next/script'
import { supabase } from '../utils/supabase/supabaseClient' // adjust path as needed
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const OneTapComponent = () => {
  const router = useRouter()

  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(String.fromCharCode(...Array.from(crypto.getRandomValues(new Uint8Array(32)))))
    const encoder = new TextEncoder()
    const encodedNonce = encoder.encode(nonce)
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    return [nonce, hashedNonce]
  }

  useEffect(() => {
    
    const initializeGoogleOneTap = async () => {
      
      try {
        const [nonce, hashedNonce] = await generateNonce()
        // Check for existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session check error:', sessionError)
          return
        }


        if (typeof window.google === 'undefined') {
          console.error('Google script not loaded')
          return
        }

        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: async (response) => {
            
            try {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
                nonce: nonce,
              })

              if (error) {
                console.error('Supabase auth error:', error)
                throw error
              }


              router.push('/profile')
            } catch (error) {
              console.error('Sign in error:', error)
            }
          },
          nonce: hashedNonce,
          use_fedcm_for_prompt: true,
          auto_select: false,
          cancel_on_tap_outside: true,
        })

        window.google.accounts.id.renderButton(
          document.getElementById('g_id_signin'),
          {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
          }
        )

        window.google.accounts.id.prompt()
        
      } catch (error) {
        console.error('Initialization error:', error)
      }
    }

    const timer = setTimeout(initializeGoogleOneTap, 1000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Error loading Google Script:', e)
        }}
      />
      <div id="g_id_signin" className="mt-4"></div>
    </>
  )
}

export default OneTapComponent