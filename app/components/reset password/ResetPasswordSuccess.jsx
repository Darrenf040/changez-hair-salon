import Link from "next/link"


export default function ResetPasswordSuccess() {

    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
  
          <h1 className="text-2xl font-bold text-primary mb-4">Password Reset Successful!</h1>
  
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
  
          <div className="mb-6 p-4 bg-green-50 rounded-md">
            <p className="text-sm text-green-800">
            Remember to keep your new password secure and don't share it with anyone.            
            </p>
          </div>
  
          <div className="flex flex-col space-y-3">
            <Link
            href={"/login"}
            className="text-white bg-accent hover:bg-opacity-90 font-medium py-2 px-4 rounded-md transition duration-300">
                Go To Login
            </Link>
  
            <a href="/contact" className="text-accent hover:underline">
              Need help? Contact Us
            </a>
          </div>
        </div>
      </div>
    )
  }
  