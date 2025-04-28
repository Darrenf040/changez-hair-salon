export interface UserProfile {
    id: string;
    email: string;
    name: string;
    phone: string;
    created_at: string;
}

export interface GuestBooking {
    booking_number: string;
    email: string;
    name: string;
    phone: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData extends SignInData {
  full_name: string;
  phone?: string;
}

export interface AuthError {
  message: string;
  code?: string;
} 