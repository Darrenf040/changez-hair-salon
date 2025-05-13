"use client"

import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase/supabaseClient'
import { useRouter } from 'next/navigation'
import InvalidResetPopup from "../components/reset password/InvalidResetPopup";
import ResetPasswordSuccess from "../components/reset password/ResetPasswordSuccess"

export default function UpdatePassword() {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [showInvalidLink, setShowInvalidLink] = useState(false) 
  const [showPasswordResetSuccess, setShowPasswordResetSuccess] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoading(false);
      
      if (event === "PASSWORD_RECOVERY") {
        setMessage('');
        setShowInvalidLink(false)
      } else {
        setMessage('Invalid or expired reset link. Please request a new one.');
        setShowInvalidLink(true)
      }
      authListener.subscription.unsubscribe()

    });
  }, [])

    const handleSubmit = async (e) => {
      e.preventDefault()
      if(password.newPassword != password.confirmPassword){
        setMessage("The passwords you entered do not match. Please try again")
        return
      }
      try {
        const { data, error } = await supabase.auth
        .updateUser({ password: password.newPassword })
        if (error) {
          if(error.message.includes("New password should be different from the old password.")){
            setMessage(error.message)
          } else{
            setMessage("Error updating password please try again")
          }
            return
        }
        setShowPasswordResetSuccess(true)
      } catch(error){
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred. Please try again.');
        }
      }

      if (isLoading) {
        return <div  className='flex justify-center'>Verifying reset link...</div>;
      }

      if (showInvalidLink){
        return <InvalidResetPopup/>
      }

      if(showPasswordResetSuccess){
        return <ResetPasswordSuccess />
      }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">Reset Your Password</h1>
  
          <p className="text-gray-600 mb-6 text-center">Please enter your new password below.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                New Password
              </label>
              <input
                onChange={(e) => setPassword({...password, newPassword: e.target.value})}
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter new password"
                required
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-2">
                Confirm Password
              </label>
              <input
              onChange={(e) => setPassword({...password, confirmPassword: e.target.value})}
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Confirm new password"
                required
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-accent hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Reset Password
            </button>
          </form>
  
          <div className="mt-6 text-center">
            <a href="/login" className="text-accent hover:underline">
              Back to Login
            </a>
          </div>
          <div className='text-red-500 mt-3 text-sm'>{message}</div>
        </div>
      </div>
    )
  }