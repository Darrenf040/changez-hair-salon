const ServiceCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            {/* Title skeleton */}
            <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4 animate-pulse"></div>
            
            {/* Duration skeleton */}
            <div className="flex items-center text-gray-600 mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse mr-2"></div>
                <div className="h-5 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
            </div>
            
            {/* Price skeleton */}
            <div className="h-7 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
        </div>
    );
};

export const ServiceSkeletonGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <ServiceCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default ServiceCardSkeleton; 