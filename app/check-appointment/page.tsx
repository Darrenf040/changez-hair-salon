"use client"

import { useState } from "react"
import { supabase } from "../utils/supabase/supabaseClient"
import GuestAppointments from "../components/guest appointment/GuestAppointments"
import { FiAlertCircle } from "react-icons/fi"
import Link from "next/link"

export default function CheckAppointment() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [showAppointments ,setShowAppointments] = useState(false)
  const [guestAppointments, setGuestAppointments] = useState([])




  const getAppointments = async (e) => {
    e.preventDefault()
    try{
      setShowAppointments(false)
      const currentDate = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
      .from("appointments")
      .select("*, guests!inner(email)")
      .not("guest_id", "is", null)
      .eq("guests.email", email)
      .gte("date", currentDate)
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });    
      if(error){
        setMessage("Error getting appointments")
        return
      }
      if(data.length <= 0){
        setMessage("You have no appointments with this email")
        setShowAppointments(false)
        return
      }
      setGuestAppointments(data)
      fetchServicesForAppointments(data);
  
    } catch(err){
      setMessage("An unexcected error occurerd")
      return
    }
    setShowAppointments(true)
    setMessage("")
  }
  const fetchServicesForAppointments = async (data) => {
    if (data.length === 0) return;
    
    // Create a copy of appointments to update
    const updatedAppointments = [...data];
    
    // Process each appointment sequentially
    for (let i = 0; i < updatedAppointments.length; i++) {
      const appointment = updatedAppointments[i];
      const {data, error} = await supabase
        .from("appointmentservices")
        .select(`
          service_id,
          id,
          appointment_id,
          services("*")
          `)
        .eq("appointment_id", appointment.id);
        
      if (error) {
        console.error(`Error fetching services for appointment ${appointment.id}:`, error);
        setMessage(`Error fetching services for appointments`)
        continue;
      }
      
      // Add service IDs to this appointment
      updatedAppointments[i].services = data?.map(item => item.services) || [];
    }
    
    // Update state with all appointments and their services
    setGuestAppointments(updatedAppointments);
  };
  if(showAppointments){
    return(
      <GuestAppointments
        guestAppointments={guestAppointments}
      />
    )
  }
    return (
      <div className="min-h-[75vh] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-primary mb-6 text-center">Check Guest Appointments</h1>
            <div className="flex gap-4 px-4 py-2 my-4 bg-amber-50 border border-amber-200">
              <div>
                <FiAlertCircle />
              </div>
              <div className="text-sm">
              This form is for <strong>guests only</strong>. If you have an account, please <Link className="underline" href={"/login"}>log in</Link> to view your appointments.
              </div>
            </div>
  
            <p className="text-gray-600 mb-6 text-center">
              Enter your email to check your guest appointment details.
            </p>
  
            <form onSubmit={getAppointments}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Check Appointment
              </button>
            </form>
  
            <div className="mt-6 text-center">
            Need to book a new appointment? <Link className="text-accent hover:underline" href={"/book"}>Book here</Link>
            </div>
            <div>
              {message}
            </div>
          </div>
        </div>

      </div>
    )
  }
  