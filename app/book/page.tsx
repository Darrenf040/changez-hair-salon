"use client"

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabaseClient';
import { FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';
import { Hours } from '../types/hours';
import BookingForm from '../components/booking/BookingForm';
import BookingEntryChoice from '../components/booking/BookingEntryChoice';
import { useAuth } from '../context/AuthContext';
import AuthBookingForm from '../components/booking/AuthBookingForm';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Register the plugin
dayjs.extend(customParseFormat);


export default function BookingPage() {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [salonHours, setSalonHours] = useState<Hours[]>([]);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [showAuthBookingForm, setShowAuthBookingForm] = useState(false);
    const [showEntryChoice, setShowEntryChoice] = useState(false);
    const { isAuthenticated } = useAuth();

        // format date func ex: 2025-02-22
        const formatDate = (date: Dayjs) => {
            return date.format("YYYY-MM-DD")
        }


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
    }, []);

    useEffect(() => {
        const fetchTimeSlots = async () => {
            // when selected is null or not selected by user do nothing
            if (!selectedDate) return;

        
            const selectedDateFormatted = formatDate(selectedDate)
              // Helper function to convert 24hr format time to total time in minutes
              const getTimeInMinutes = (time: string): number => {
                try {
                    // Split the time string into hours, minutes
                    const [hours, minutes] = time.split(':').map(Number);
                    
                    // Calculate total minutes
                    return (hours * 60) + minutes;
                } catch (error) {
                    console.error('Error parsing time:', error);
                    return 0; // or handle error as needed
                }
            };
            try {

                //fetches all the booked appointments for the selected date
                const { data, error } = await supabase
                    .from('appointments')
                    .select('start_time, date, end_time')
                    .eq('status', 'booked')
                    .eq('date', selectedDateFormatted)
                if (error){
                    console.error(error)
                    return;
                }

                // create a date instance for each time
                const bookedAppointments: {start:number, end: number}[] = data.map(appt =>(
                    {
                        start: getTimeInMinutes(appt.start_time),
                        end: getTimeInMinutes(appt.end_time),
                    }
                )
                );

              

                // Get day of week from selected date
                const dayOfWeek = dayjs(selectedDate).format("dddd");
                
                // Find salon hours for selected day
                const todayHours = salonHours.find(h => h.day_of_week === dayOfWeek);
                
                // if theree are hours for the selected day and its not closed
                if (todayHours && !todayHours.is_closed) {
                    // Generate time slots in 30-minute increments
                    const times: string[] = [];
                    
                    //start time and end time are in 24 hour format
                    let startTime = getTimeInMinutes(todayHours.start_time);
                    const endTime = getTimeInMinutes(todayHours.end_time);
                    

                    // Check if selected date is today
                    const now = dayjs();
                    const isToday = formatDate(selectedDate) === formatDate(now);
                    
                    // If it's today, adjust the start time to the next available 30-minute slot
                    if (isToday) {
                        //caclulate current time 
                        const currentMinutes = now.hour() * 60 + now.minute();

                        // current time is past the days salon hours
                        if(currentMinutes >= getTimeInMinutes(todayHours.start_time) ){
                            startTime = Math.ceil(currentMinutes / 30) * 30;
                        } else if(currentMinutes >= getTimeInMinutes(todayHours.end_time)){ // the salon is closed at this point
                            return
                        }
                    }

                    while (startTime < endTime) {
                        //format current time to 12 hour format
                        // Create a dayjs object representing the time
                        const time = dayjs().startOf('day').add(startTime, 'minutes');

                        // Format the time as desired
                        const formattedTime = time.format('h:mm A'); // Example: "9:30 AM"

          
                        let isBooked = false;
                        bookedAppointments.forEach(appointment => {
                            
                            if (startTime >= appointment.start && startTime < appointment.end) {
                                isBooked = true;
                            }
                        });
                        
                        if (!isBooked) {
                            times.push(formattedTime);
                        }
                        
                        // Add 30 minutes to start time
                        startTime += 30
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

    if (showBookingForm) {
        return (
            <BookingForm 
            selectedDate={selectedDate ? formatDate(selectedDate): "Not Selected"}
            selectedTime={selectedTime ? selectedTime: "Not Selected"}
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
                selectedDate={selectedDate ? formatDate(selectedDate): "Not Selected"}
                selectedTime={selectedTime ? selectedTime : "Not Selected"}
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
                selectedDate={selectedDate ? formatDate(selectedDate): "Not Selected"}
                selectedTime={selectedTime ? selectedTime: "Not Selected"}
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
                                    {dayjs(currentMonth).format("MMM YYYY")}
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
                                                    setSelectedDate(dayjs(date))
                                                    setSelectedTime("")
                                                }}
                                                disabled={isPastDate(date)}
                                                className={`w-full h-full flex items-center justify-center rounded-lg text-sm transition-all duration-200
                                                    ${isPastDate(date) ? 'text-gray-300 cursor-not-allowed' :
                                                    selectedDate?.valueOf() === date.getTime() ? 'bg-accent text-primary font-medium' :
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
                                        for {selectedDate.format("MMMM DD")}
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