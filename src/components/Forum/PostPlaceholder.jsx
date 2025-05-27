const PostPlaceholder = () => (
    <div className="p-4 flex gap-2 items-start rounded-md bg-gray-300 animate-pulse mt-5">
        <div className="w-16 h-16 rounded-full bg-gray-400"></div>
        <div className="flex-1">
            <div className="h-6 bg-gray-400 rounded mb-2"></div>
            <div className="h-4 bg-gray-400 rounded mb-1"></div>
            <div className="h-4 bg-gray-400 rounded mb-1"></div>
        </div>
    </div>
);

export default PostPlaceholder;