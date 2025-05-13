"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../utils/supabase/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean; // Add isLoading to the interface
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, full_name: string, phone?: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    isAuthenticated: false,
    isLoading: true, // Default to true since we're loading on init
    signIn: async () => {},
    signUp: async () => {},
    signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            try {
                setIsLoading(true); // Set loading to true when checking
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;
                setSession(session);
                setUser(session?.user ?? null);
                setIsAuthenticated(!!session);
            } catch (error) {
                console.error('Error checking session:', error);
                setSession(null);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false); // Set loading to false when done
            }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setIsLoading(true); // Set loading to true when auth state changes
            setSession(session);
            setUser(session?.user ?? null);
            setIsAuthenticated(!!session);
            setIsLoading(false); // Set loading to false when done
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true); // Set loading to true when signing in
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        } finally {
            setIsLoading(false); // Set loading to false when done
        }
    };

    const signUp = async (email: string, password: string, full_name: string, phone?: string) => {
        setIsLoading(true); // Set loading to true when signing up
        try {
            const { data, error } = await supabase.auth.signUp({ 
                email, 
                password,
                options: {
                    data: {
                        full_name: full_name,
                    }
                }
            });
            if (error) throw error;
        } finally {
            setIsLoading(false); // Set loading to false when done
        }
    };

    const signOut = async () => {
        setIsLoading(true); // Set loading to true when signing out
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                alert("Error signing out")
                return
            }
            alert("Sign Out Successful")
            router.push("/login")
        } finally {
            setIsLoading(false); // Set loading to false when done
        }
    };

    return (
        <AuthContext.Provider value={{ 
            session, 
            user, 
            isAuthenticated, 
            isLoading, // Include isLoading in the context value
            signIn, 
            signUp, 
            signOut 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};