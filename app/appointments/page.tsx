"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation';



const AppointmentView  = () => {
  const auth = useAuth();
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [userAppointments, setUserAppointments] = useState([])
  const [pendingCancelAppointmentId, setPendingCancelAppointmentId] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchUserAppointments = async () => {
    if (!auth.isLoading && auth.user) {
      // Get current date in YYYY-MM-DD format
      const currentDate = new Date().toISOString().split('T')[0];

      const {data, error} = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", auth.user.id)
        .gte('date', currentDate)  // Only get appointments from today onwards
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });

      if(error){
        setMessage("Error finding appointments")
        return;
      }
      setMessage("")

      setUserAppointments(data)
    }
  }

  useEffect(() => {
    fetchUserAppointments()
}, [auth.isAuthenticated, auth.isLoading]);

  useEffect(() => {
    const fetchServicesForAppointments = async () => {
      if (userAppointments.length === 0) return;
      
      // Create a copy of appointments to update
      const updatedAppointments = [...userAppointments];
      
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
      setUserAppointments(updatedAppointments);
    };
    
    fetchServicesForAppointments();
  }, [userAppointments.length]); 

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return new Date(2000, 0, 1, hours, minutes)
        .toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
        });
  };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
      });
    };

    const getCurrentAppointmentId = (e) => {
      const parent = e.target.closest("[data-id]");
      const appointmentId = parseInt(parent.dataset.id, 10);
      setPendingCancelAppointmentId(appointmentId)
    }

    const handleCancel = async (appointmentId) => {
      const {error} = await supabase.from("appointments").delete().eq("id", appointmentId)

      if(error){
        setMessage("Error cancelling appointment")
        return
      }
      setMessage("")

      fetchUserAppointments()
      alert("Appointment cancelled successfully")
      setShowConfirmModal(false)
    }

    useEffect(() => { 
      if(!auth.user && !auth.isLoading){
        router.push("/login")
        alert("you must be signed in")
      }
    }, [])

  if (auth.isLoading) {
    return <div className='w-full flex justify-center'>Loading...</div>;
  }

  return (
    
    <div className="min-h-screen py-4 sm:py-8">
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Cancel Appointment</h3>
            <p className="mb-4">Are you sure you want to cancel this appointment?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmModal(false)}
              >
                No, Keep It
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleCancel(pendingCancelAppointmentId)}
              >
                Yes, Cancel It
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Your Appointments</h1>
          </div>
          
        </div>

        {/* Desktop view */}
        <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    userAppointments && userAppointments.map((appointment, index) => {
                      return(
                  <tr key={index} data-id={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-medium text-gray-900">{formatDate(appointment.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-gray-500">{formatTime(appointment.start_time)}-{formatTime(appointment.end_time)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-md break-words">
                         {appointment.services && appointment.services.map((service, index) => {
                          return (
                            <span key={index}>
                              {service.name}
                              {index == appointment.services.length - 1 ? "": ", "}
                            </span>
                          )
                         })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {appointment.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-8">
                        {/* <button 
                          className="bg-accent text-white p-2 rounded-full hover:text-slate-200"
                        >
                          Reschedule
                        </button> */}
                        <button 
                        onClick={(e) => {
                          getCurrentAppointmentId(e)
                          setShowConfirmModal(true)
                        }}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>

                      )
                    })
                  }
              </tbody>
              
            </table>
          </div>
        </div>

        {/* Mobile view */}
        {userAppointments && userAppointments.map(((appointment, index) => {
          return (
          <div key={index} className="sm:hidden space-y-4">
            <div  className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-900">Appointment Status</div>
              <div className="flex items-center justify-between mb-4">
                {appointment.status}
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">Date</div>
                  <div className="text-gray-900">{formatDate(appointment.date)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Time</div>
                  <div className="text-gray-900">{formatTime(appointment.start_time)}-{formatTime(appointment.end_time)}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-900">Services</div>
                  <div className="text-gray-900">
                  {appointment.services && appointment.services.map((service, index) => {
                          return (
                            <span key={index}>
                              {service.name}
                              {index == appointment.services.length - 1 ? "": ", "}
                            </span>
                          )
                         })}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-900">Total</div>
                  <div className="text-gray-900">{appointment.total}</div>
                </div>
                
                <div className="pt-3 flex gap-3">
                  <button 
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reschedule
                  </button>
                  <button 
                    className="flex-1 bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium border border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          )
        }))
      
        }
        <div className={`my-6 p-4 rounded flex justify-center ${
                                message.includes('Error') ?
                                   'bg-red-50 text-red-800': ""
                            }`}>
                                {message}
                            </div>


      </div>
    </div>
  );
};

export default AppointmentView;