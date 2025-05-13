"use client"

import { useState } from "react"
import { supabase } from "../utils/supabase/supabaseClient"
import { useRouter } from "next/navigation"
import ForgotPasswordSuccess from "../components/reset password/ForgotPasswordEmailSuccess"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [showSucces, setShowSuccess] = useState(false)
    const [message, setMessage] = useState("")

    const router = useRouter()


    const resetPasswordEmail = async (e) =>{
        e.preventDefault();
        setShowSuccess(false)
        try{
          const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/reset-password',
          })  
          if(error){
            console.error(error)
            setMessage("Error sending reset password link")
            return
          }
          setShowSuccess(true)
        } catch(err) {
          if(err.status == 429){
            setMessage("Too many reset password attempts. Please wait a 1 minute before trying again.")
          }
        }
        
      }
      if(showSucces){
        return (<ForgotPasswordSuccess />)
      }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-primary mb-6 text-center">Forgot Password</h1>
    
            <p className="text-gray-600 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
    
            <form onSubmit={resetPasswordEmail}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email Address
                </label>
                <input
                onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                  required
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-accent hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Send Reset Link
              </button>
            </form>
    
            <div className="mt-6 text-center">
              <a href="/login" className="text-accent hover:underline">
                Back to Login
              </a>
            </div>
            {message && (
          <div
            className={`mb-4 p-4 rounded-md ${
              message.includes("Error") ?'bg-red-50 text-red-700': 'bg-green-50 text-green-700' 
            }`}
          >
            {message}
          </div>
        )}
          </div>
        </div>
      )
    
}

export default ForgotPassword