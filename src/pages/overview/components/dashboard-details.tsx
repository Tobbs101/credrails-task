import { Link } from "react-router-dom";

const DashboardDetails = ({ data }: { data: any[] }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, John Doe!
        </h1>
        <p className="text-gray-600 text-sm">
          Here's a summary of your uploaded files.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="font-bold text-gray-700">10</p>
          <p className="text-gray-500">Total Files</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="font-bold text-gray-700">5MB</p>
          <p className="text-gray-500">Largest File</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="font-bold text-gray-700">report.pdf</p>
          <p className="text-gray-500">Last Upload</p>
        </div>
      </div>

      {/* Recent Uploads Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 underline">
          Recent Uploads
        </h2>
        <ul className="mt-2 divide-y divide-gray-200">
          {data?.map((file, index) => (
            <li key={index} className="py-3 flex justify-between text-gray-700">
              <span className="capitalize">{file.name}</span>
              <span className="text-sm text-gray-500 min-w-[150px]">
                {file.size} • {file.date}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mt-6">
        <Link
          to="/dashboard/upload"
          className="bg-primary text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
        >
          Upload New File
        </Link>
        <Link
          to="/dashboard/details"
          className="bg-white border text-primary border-primary  px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-700"
        >
          View Files
        </Link>
      </div>
    </div>
  );
};

export default DashboardDetails;
