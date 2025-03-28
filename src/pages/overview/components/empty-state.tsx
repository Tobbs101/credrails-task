import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white p-6 mt-10">
      {/* Empty State Icon */}
      <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full">
        📂
      </div>

      {/* Message */}
      <h2 className="text-lg font-bold text-gray-800 mt-5">
        No files uploaded yet
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Click below to upload your first file.
      </p>

      {/* Upload Button */}
      <Link
        to="/dashboard/upload"
        className="mt-4 bg-primary text-white px-7 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
      >
        Upload File
      </Link>
    </div>
  );
};

export default EmptyState;
