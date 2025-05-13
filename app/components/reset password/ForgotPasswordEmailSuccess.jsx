export default function ForgotPasswordSuccess() {
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
  
          <h1 className="text-2xl font-bold text-primary mb-4">Check Your Email</h1>
  
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to your email address. Please check your inbox and follow the instructions to
            reset your password.
          </p>
  
          <div className="mb-6 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              If you don't see the email in your inbox, please check your spam folder.
            </p>
          </div>
  
          <div className="flex flex-col space-y-3">
            <a
              href="/login"
              className="text-white bg-accent hover:bg-opacity-90 font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Back to Login
            </a>
  
            <a href="/forgot-password" className="text-accent hover:underline">
              Didn't receive an email? Try again
            </a>
          </div>
        </div>
      </div>
    )
  }
  