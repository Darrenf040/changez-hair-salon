export interface Hours {
    id: number;
    day_of_week: string;
    start_time: string;  // Format: "HH:MM" in 24-hour format
    end_time: string;    // Format: "HH:MM" in 24-hour format
    is_closed: boolean;
}