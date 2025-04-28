import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';

interface BookingEntryChoiceProps {
    selectedDate: string;
    selectedTime: string;
    onBack: () => void;
    setShowBookingForm: (show: boolean) => void;
    showBookingForm: boolean;
}

const UserIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const UserPlusIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
    </svg>
);

export default function BookingEntryChoice({ selectedDate, selectedTime, onBack, setShowBookingForm, showBookingForm }: BookingEntryChoiceProps) {
    const router = useRouter();

    const handleGuestBooking = () => {
        setShowBookingForm(true);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">How would you like to proceed?</h2>
                <p className="text-gray-500">
                    Selected appointment: {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }).format(new Date(selectedDate))} at {selectedTime}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card
                    clickable
                    onClick={handleGuestBooking}
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserIcon />
                            Book as Guest
                        </CardTitle>
                        <CardDescription>
                            No account needed. Enter your info to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button 
                            variant="secondary" 
                            fullWidth
                            onClick={handleGuestBooking}
                        >
                            Continue as Guest
                        </Button>
                    </CardContent>
                </Card>

                <Card
                    clickable
                    onClick={() => router.push(`/auth/signin?redirect=/booking/authenticated?date=${selectedDate}&time=${selectedTime}`)}
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlusIcon />
                            Sign In / Create Account
                        </CardTitle>
                        <CardDescription>
                            Save your info for faster booking and view your appointments.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button fullWidth>
                            Sign In or Register
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center mt-6">
                <Button variant="outline" onClick={onBack}>
                    Back to Date Selection
                </Button>
            </div>
        </div>
    );
} 