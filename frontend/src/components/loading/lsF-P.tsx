const ProfileLoadingSkeleton = () => {
    return (
        <div className="max-w-screen-xl mx-auto my-8 p-4 space-y-6 animate-pulse">
            <div className="flex justify-center">
                <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
            </div>
            <div className="space-y-2">
                <div className="w-40 h-6 bg-gray-700 rounded mx-auto"></div>
                <div className="w-24 h-4 bg-gray-700 rounded mx-auto"></div>
            </div>
            <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-gray-600"></div>
            </div>
            <div className="flex justify-center gap-4">
                <div className="w-24 h-10 bg-gray-700 rounded"></div>
                <div className="w-24 h-10 bg-gray-700 rounded"></div>
            </div>
        </div>
    );
};

export default ProfileLoadingSkeleton;