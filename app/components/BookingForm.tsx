"use client"

import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { supabase } from '../utils/supabaseClient';
import { Service } from '../types/services';
import BookingConfirmation from './BookingConfirmation';

interface BookingFormProps {
    selectedDate: string | null;  // YYYY-MM-DD format
    selectedTime: string | null;  // HH:mm format
    onBack: () => void;
    onSuccess: () => void;
}

export default function BookingForm({ selectedDate, selectedTime, onBack, onSuccess }: BookingFormProps) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        services: [] as string[],
        notes: ''
    });
    const [services, setServices] = useState<Service[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<any>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('category', { ascending: true })
                    .order('name', { ascending: true });

                if (error) throw error;
                if (data) setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleServiceChange = (serviceName: string) => {
        setFormData(prev => {
            const services = prev.services.includes(serviceName)
                ? prev.services.filter(s => s !== serviceName)
                : [...prev.services, serviceName];
            return { ...prev, services };
        });
    };

    const calculateTotal = () => {
        return services.reduce((total, service) => {
            if (formData.services.includes(service.name) && !service.requires_consultation) {
                return total + (service.price || 0);
            }
            return total;
        }, 0);
    };

    const calculateDuration = () => {
        return services.reduce((total, service) => {
            if (formData.services.includes(service.name)) {
                return total + service.duration;
            }
            return total;
        }, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            if (!selectedDate || !selectedTime) {
                throw new Error('Please select a date and time');
            }

            if (formData.services.length === 0) {
                throw new Error('Please select at least one service');
            }

            // Calculate end time based on duration
            const endTime = new Date(`2000-01-01 ${selectedTime}`);
            endTime.setMinutes(endTime.getMinutes() + calculateDuration());
            const formattedEndTime = endTime.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });

            // Start a transaction
            const { data: customerData, error: customerError } = await supabase
                .from('users')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                })
                .select("id")
                .single();

            if (customerError) throw customerError;

            // Create appointment and get its ID
            const { data: appointmentData, error: appointmentError } = await supabase
                .from('appointments')
                .insert({
                    user_id: customerData.id,
                    date: selectedDate,
                    start_time: selectedTime,
                    end_time: formattedEndTime,
                    status: "booked",
                    notes: formData.notes
                })
                .select('id')
                .single();

            if (appointmentError) throw appointmentError;
            
            // Get service IDs for selected service names
            const { data: selectedServices, error: servicesError } = await supabase
                .from('services')
                .select('id')
                .in('name', formData.services);

            if (servicesError) throw servicesError;

            // Create an array of appointment-service relationships
            const appointmentServiceRecords = selectedServices.map(service => ({
                appointment_id: appointmentData.id,
                service_id: service.id
            }));

            const { error: appointmentServiceError } = await supabase
                .from('appointmentservices')
                .insert(appointmentServiceRecords);

            if (appointmentServiceError) throw appointmentServiceError;

            // Set booking details for confirmation
            const selectedServiceDetails = services.filter(service => 
                formData.services.includes(service.name)
            );

            setBookingDetails({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                date: selectedDate,
                startTime: selectedTime,
                endTime: formattedEndTime,
                services: selectedServiceDetails,
                notes: formData.notes,
                totalPrice: calculateTotal(),
                totalDuration: calculateDuration()
            });

            setShowConfirmation(true);

        } catch (error: any) {
            setSubmitMessage(error.message || 'Error submitting appointment request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center">
                        <p className="text-gray-500">Loading services...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {showConfirmation && bookingDetails ? (
                <BookingConfirmation 
                    bookingDetails={bookingDetails}
                    onClose={() => {
                        setShowConfirmation(false);
                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            services: [],
                            notes: ''
                        });
                        onSuccess();
                    }}
                />
            ) : (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <button
                            onClick={onBack}
                            className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back to Calendar
                        </button>

                        <h2 className="text-2xl font-bold text-center text-primary mb-6">
                            Complete Your Booking
                        </h2>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600">
                                Selected Date: <span className="font-medium">{new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                }).format(new Date(selectedDate + 'T00:00:00'))}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Selected Time: <span className="font-medium">{new Intl.DateTimeFormat("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                }).format(new Date(`1970-01-01T${selectedTime}:00`))}</span>
                            </p>
                        </div>

                        {submitMessage && (
                            <div className={`mb-6 p-4 rounded ${
                                submitMessage.includes('success') 
                                    ? 'bg-green-50 text-green-800' 
                                    : 'bg-red-50 text-red-800'
                            }`}>
                                {submitMessage}
                            </div>
                        )}

                        <div className="flex justify-center">
                            <div className="w-full max-w-2xl">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                                    <p className="text-yellow-800 text-sm">
                                        <span className="font-semibold">Payment Notice:</span> All payments are collected in-store during your appointment.
                                        We accept cash and all major credit cards.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Services
                                </label>
                                <div className="space-y-4">
                                    {['Main', 'Add-on'].map(category => (
                                        <div key={category}>
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">{category} Services</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {services
                                                    .filter(service => service.category === category)
                                                    .map(service => (
                                                        <div 
                                                            key={service.name}
                                                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200
                                                                ${formData.services.includes(service.name)
                                                                    ? 'border-accent bg-accent bg-opacity-10'
                                                                    : 'border-gray-200 hover:border-accent'}`}
                                                            onClick={() => handleServiceChange(service.name)}
                                                        >
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.services.includes(service.name)}
                                                                    onChange={() => handleServiceChange(service.name)}
                                                                    className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                                                                />
                                                                <div className="ml-3 flex-grow">
                                                                    <p className="text-sm font-medium text-gray-700">{service.name}</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {service.requires_consultation ? (
                                                                            <>
                                                                                <span className="text-primary font-medium">Consultation required</span> • {service.duration} mins
                                                                                <br />
                                                                                <span className="text-xs italic">Price will be determined during consultation</span>
                                                                            </>
                                                                        ) : (
                                                                            <>${service.price} • {service.duration} mins</>
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {formData.services.length > 0 && (
                                    <div className="mt-4 text-right space-y-1">
                                        <p className="text-sm text-gray-600">
                                            Appointment Duration: <span className="font-medium">{calculateDuration()} minutes</span>
                                        </p>
                                        {calculateTotal() > 0 && (
                                            <p className="text-sm text-gray-600">
                                                Base Price: <span className="font-medium">${calculateTotal()}</span>
                                                {formData.services.some(serviceName => 
                                                    services.find(s => s.name === serviceName)?.requires_consultation
                                                ) && (
                                                    <span className="text-xs italic block">
                                                        * Final price varies for services requiring consultation
                                                    </span>
                                                )}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                    Additional Notes
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows={4}
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                    placeholder="Any special requests or additional information..."
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || formData.services.length === 0}
                                    className="px-8 py-3 bg-accent text-primary font-medium rounded-md hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 