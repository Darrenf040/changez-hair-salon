export interface Appointment {
    id: number;
    date: Date;
    start_time: string;
    end_time: string;
    status: 'booked' | 'accepted' | 'cancelled' | "completed" ;
    created_at: string;
}

export type BookedAppointments = {
    start_time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    date: Date;

} 