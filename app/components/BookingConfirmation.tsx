import { Service } from '../types/services';

interface BookingConfirmationProps {
    bookingDetails: {
        name: string;
        email: string;
        phone: string;
        date: string;
        startTime: string;
        endTime: string;
        services: Service[];
        notes?: string;
        totalPrice: number;
        totalDuration: number;
    };
    onClose: () => void;
}

export default function BookingConfirmation({ bookingDetails, onClose }: BookingConfirmationProps) {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-primary mb-2">Booking Confirmed!</h2>
                        <p className="text-gray-600">Thank you for booking with us. We've sent a confirmation email to {bookingDetails.email}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Personal Information */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-medium">{bookingDetails.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium">{bookingDetails.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium">{bookingDetails.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-3">Appointment Details</h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-gray-600">Date</p>
                                    <p className="font-medium">{formatDate(bookingDetails.date)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Time</p>
                                    <p className="font-medium">
                                        {bookingDetails.startTime} - {bookingDetails.endTime}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-3">Booked Services</h3>
                            <div className="space-y-3">
                                {bookingDetails.services.map((service, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{service.name}</p>
                                            <p className="text-sm text-gray-600">{service.duration} mins</p>
                                        </div>
                                        <p className="font-medium">${service.price}</p>
                                    </div>
                                ))}
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">Total Duration</p>
                                            <p className="text-sm text-gray-600">{bookingDetails.totalDuration} mins</p>
                                        </div>
                                        <p className="font-bold text-lg">${bookingDetails.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {bookingDetails.notes && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
                                <p className="text-gray-700">{bookingDetails.notes}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-accent text-primary font-medium rounded-md hover:bg-opacity-90 transition-all duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 