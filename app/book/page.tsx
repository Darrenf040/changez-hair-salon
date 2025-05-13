"use client"

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabaseClient';
import { FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';
import { Hours } from '../types/hours';
import BookingForm from '../components/booking/BookingForm';
import BookingEntryChoice from '../components/booking/BookingEntryChoice';
import { useAuth } from '../context/AuthContext';
import AuthBookingForm from '../components/booking/AuthBookingForm';

export default function BookingPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [salonHours, setSalonHours] = useState<Hours[]>([]);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [showAuthBookingForm, setShowAuthBookingForm] = useState(false);
    const [showEntryChoice, setShowEntryChoice] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchSalonHours = async () => {
            try {
                const { data, error } = await supabase.from("hours").select("*");
                if (data) {
                    setSalonHours(data);
                }
                if (error) throw error;
            } catch (error) {
                console.error("Error fetching salon hours:", error);
            }
        };

        fetchSalonHours();
    }, [selectedDate]);

    useEffect(() => {
        const fetchTimeSlots = async () => {
            // when selected is null or not selected by user do nothing
            if (!selectedDate) return;

            try {

                //fetches all the booked appointments for the selected date
                const { data, error } = await supabase
                    .from('appointments')
                    .select('start_time, date, end_time')
                    .eq('status', 'booked')
                    .eq('date', selectedDate.toISOString().split('T')[0])
                if (error){
                    console.error(error)
                    return;
                }

                // create a date instance for each time
                const bookedAppointments: {start:Date, end: Date}[] = data.map(appt =>(
                    {
                        start: new Date(`${appt.date} ${appt.start_time}`),
                        end: new Date(`${appt.date} ${appt.end_time}`),
                    }
                )
                );
                // Helper function to convert Date to minutes since midnight
                const getTimeInMinutes = (date: Date) => {
                    return date.getHours() * 60 + date.getMinutes();
                };
            

                // Get day of week from selected date
                const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
                
                // Find salon hours for selected day
                const todayHours = salonHours.find(h => h.day_of_week === dayOfWeek);
                
                // if theree are hours for the selected day and its not closed
                if (todayHours && !todayHours.is_closed) {
                    // Generate time slots in 30-minute increments
                    const times: string[] = [];
                    
                    //start time and end time are in 24 hour format
                    const selectedDateStr = selectedDate.toISOString().split('T')[0];
                    const start = new Date(`${selectedDateStr} ${todayHours.start_time}`);
                    const end = new Date(`${selectedDateStr} ${todayHours.end_time}`);
                    
                    let current = new Date(start);

                    // Check if selected date is today
                    const now = new Date();
                    const isToday = selectedDate.toDateString() === now.toDateString();
                    
                    // If it's today, adjust the start time to the next available 30-minute slot
                    if (isToday ) {
                        //caclulate current time 
                        const currentMinutes = now.getHours() * 60 + now.getMinutes();
                        const nextSlotMinutes = Math.ceil(currentMinutes / 30) * 30;
                        const time = new Date(`${selectedDateStr} ${Math.floor(nextSlotMinutes / 60).toString().padStart(2, '0')}:${(nextSlotMinutes % 60).toString().padStart(2, '0')}`);
                        const currentTime = getTimeInMinutes(time)

                        // current time is past the days store hours
                        if(currentTime >= getTimeInMinutes(current)){
                            current = time;
                        }
                    }

                    //time slot formatter
                    const formatter = Intl.DateTimeFormat('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });
     

                    while (current < end) {
                        //format current time to 12 hour format
                        const timeString = formatter.format(current);
                        const currentTimeInMinutes = getTimeInMinutes(current);
          
                        let isBooked = false;
                        bookedAppointments.forEach(appointment => {
                            const startMinutes = getTimeInMinutes(appointment.start);
                            const endMinutes = getTimeInMinutes(appointment.end);
                            
                            if (currentTimeInMinutes >= startMinutes && currentTimeInMinutes < endMinutes) {
                                isBooked = true;
                            }
                        });
                        
                        if (!isBooked) {
                            times.push(timeString);
                        }
                        
                        // Add 30 minutes
                        current.setMinutes(current.getMinutes() + 30);
                    }
                    setAvailableTimes(times);
                } else {
                    setAvailableTimes([]);
                }

            } catch (error) {
                console.error("Error fetching time slots:", error);
            }
        };

        fetchTimeSlots();
    }, [selectedDate, salonHours]);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        
        // Add empty days for padding
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }
        
        // Add actual days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', { 
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    if (showBookingForm) {
        return (
            <BookingForm 
                selectedDate={selectedDate?.toISOString().split('T')[0]}
                selectedTime={selectedTime ? new Date(`2000-01-01 ${selectedTime}`).toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                }) : null}
                onBack={() => {
                    setShowBookingForm(false);
                    setShowEntryChoice(true);
                }}
                onSuccess={() => {
                    setShowBookingForm(false);
                    setShowEntryChoice(false);
                    setSelectedDate(null);
                    setSelectedTime(null);
                }}
            />
        );
    }
    if(showAuthBookingForm){
        return (
            <AuthBookingForm 
                selectedDate={selectedDate?.toISOString().split('T')[0]}
                selectedTime={selectedTime ? new Date(`2000-01-01 ${selectedTime}`).toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                }) : null}
                onBack={() => {
                    setShowBookingForm(false);
                    setShowEntryChoice(false);
                    setShowAuthBookingForm(false)
                }}
                onSuccess={() => {
                    setShowAuthBookingForm(false);
                    setSelectedDate(null);
                    setSelectedTime(null);
                }}
            />
        );
    }

    if (showEntryChoice) {
        return (
            <BookingEntryChoice 
                selectedDate={selectedDate?.toISOString().split('T')[0] || ''}
                selectedTime={selectedTime}
                onBack={() => setShowEntryChoice(false)}
                showBookingForm={showBookingForm}
                setShowBookingForm={setShowBookingForm}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-center text-primary mb-8">Book Your Appointment</h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Calendar Section */}
                        <div className="border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <button 
                                    onClick={handlePrevMonth}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <FiChevronLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-xl font-semibold">
                                    {formatDate(currentMonth)}
                                </h2>
                                <button 
                                    onClick={handleNextMonth}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <FiChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="text-center text-sm font-medium text-gray-500">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {getDaysInMonth(currentMonth).map((date, index) => (
                                    <div key={index} className="aspect-square">
                                        {date && (
                                            <button
                                                onClick={() => {
                                                    setSelectedDate(date)
                                                    setSelectedTime("")
                                                }}
                                                disabled={isPastDate(date)}
                                                className={`w-full h-full flex items-center justify-center rounded-lg text-sm transition-all duration-200
                                                    ${isPastDate(date) ? 'text-gray-300 cursor-not-allowed' :
                                                    selectedDate?.getTime() === date.getTime() ? 'bg-accent text-primary font-medium' :
                                                    isToday(date) ? 'bg-primary/10 text-primary font-medium ring-1 ring-primary/20' : 
                                                    'hover:bg-gray-50'}`}
                                            >
                                                {date.getDate()}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Time Slots Section */}
                        <div className="border rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-6 flex items-center">
                                <FiClock className="mr-2" />
                                Available Times
                                {selectedDate && (
                                    <span className="ml-2 text-sm font-normal text-gray-500">
                                        for {selectedDate.toLocaleDateString()}
                                    </span>
                                )}
                            </h3>

                            {selectedDate ? (
                                availableTimes.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {availableTimes.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`p-3 rounded-lg text-sm font-medium
                                                    ${selectedTime === time 
                                                        ? 'bg-accent text-primary' 
                                                        : 'bg-gray-50 hover:bg-gray-100'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        No available time slots for this date
                                    </div>
                                )
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    Please select a date to view available times
                                </div>
                            )}

                            {selectedDate && selectedTime && (
                                <div className="mt-8">
                                    <button
                                        onClick={() => {                                                
                                            if (isAuthenticated) {
                                                setShowEntryChoice(false);
                                                setShowAuthBookingForm(true);
                                            } else {
                                                setShowEntryChoice(true);
                                                setShowBookingForm(false);
                                            }
                                        }}
                                        className="w-full py-3 bg-accent text-primary font-medium rounded-md hover:bg-opacity-90 transition-all duration-200"
                                    >
                                        Continue Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 