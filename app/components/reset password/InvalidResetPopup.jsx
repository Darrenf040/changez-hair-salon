export default function InvalidResetPopup() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          {/* Error Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
  
          <h1 className="text-2xl font-bold text-primary mb-4">Invalid or Expired Link</h1>
  
          <p className="text-gray-600 mb-6">
            The password reset link you clicked is invalid or has expired. 
          </p>
  
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-700">
              For security reasons, please request a new password reset link to continue. The reset link expires after you click the link, refresh page, or navigate to another page.
            </p>
          </div>
  
          <div className="flex flex-col space-y-3">
            <a
              href="/forgot-password"
              className="text-white bg-accent hover:bg-opacity-90 font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Request New Reset Link
            </a>
  
            <a href="/login" className="text-accent hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    )
  }