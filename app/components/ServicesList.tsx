"use client"

import { Service } from '../types/services';
import { FaClock } from 'react-icons/fa';
import { supabase } from '../utils/supabase/supabaseClient';
import { useState, useEffect, Suspense } from 'react';
import { ServiceSkeletonGrid } from './ServiceCardSkeleton';
import Link from 'next/link';

const ServiceCard = ({ service }: { service: Service }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
        <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
                <FaClock className="mr-2" />
                <span>{service.duration} minutes</span>
            </div>
            <div className="text-lg font-medium text-gray-900 mb-4">
                {service.requires_consultation ? (
                    <span className="text-accent">Consultation Required</span>
                ) : (
                    <span>${service.price}</span>
                )}
            </div>
        </div>
        <div className="pt-4 border-t border-secondary">
            <Link 
                href={"/book"}
                className="block w-full text-center px-4 py-2.5 bg-accent text-primary font-medium rounded hover:bg-opacity-90 transition-all duration-200"
            >
                Book Now
            </Link>
        </div>
    </div>
);

const ServicesContent = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data, error } = await supabase.from("services").select("*");
                if (error) {
                    setError(error.message);
                    return;
                }
                if (data) {
                    setServices(data);
                }
            } catch (err) {
                setError('Failed to fetch services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center py-4">Error loading services: {error}</div>;
    }

    const mainServices = services.filter(service => service.category === 'Main');
    const addOnServices = services.filter(service => service.category === 'Add-on');

    return (
        <>
            <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Main Services</h3>
                {loading ? (
                    <ServiceSkeletonGrid />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mainServices.map((service, index) => (
                            <ServiceCard key={index} service={service} />
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Add-On Services</h3>
                {loading ? (
                    <ServiceSkeletonGrid />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addOnServices.map((service, index) => (
                            <ServiceCard key={index} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const ServicesList = () => {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Services</h2>
                <Suspense fallback={<ServiceSkeletonGrid />}>
                    <ServicesContent />
                </Suspense>
            </div>
        </div>
    );
};

export default ServicesList; 