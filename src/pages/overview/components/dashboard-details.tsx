import useUsers from "@/hooks/use-users";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatFileSize } from "@/lib/utils";

const DashboardDetails = ({ data }: { data: any[] }) => {
  const { currentUser } = useUsers();

  const largestFile = data.reduce((max, file) =>
    file.file.size > max.file.size ? file : max
  );

  const latestFile = data.reduce((latest, file) =>
    new Date(file.dateUploaded) > new Date(latest.dateUploaded) ? file : latest
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h1 className="text-lgs font-semibold text-gray-800">
          Welcome, {currentUser.firstName} {currentUser.lastName}!
        </h1>
        <p className="text-gray-600 text-xs font-medium">
          Here's a summary of your uploaded files.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="font-bold text-gray-700">{data?.length}</p>
          <p className="text-gray-500 text-sm font-medium">Total Files</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="font-bold text-gray-700">
            {formatFileSize(largestFile?.file?.size)}
          </p>
          <p className="text-gray-500 text-sm font-medium">Largest File</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="font-bold text-gray-700">{latestFile?.file?.name}</p>
          <p className="text-gray-500 text-sm font-medium">Last Upload</p>
        </div>
      </div>

      {/* Recent Uploads Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-sm font-semibold text-gray-800">Recent Uploads</h2>
        <ul className="mt-2 divide-y divide-gray-200">
          {data?.map((item, index) => (
            <li key={index} className="py-3 flex justify-between text-gray-700">
              <span className="text-sm font-medium">{item?.file.name}</span>
              <span className="text-xs text-gray-500 ">
                {formatFileSize(item?.file.size)} •{" "}
                {moment(item?.dateUploaded).format("YYYY-MM-DD")}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mt-6">
        <Link
          to="/dashboard/upload"
          className="bg-primary text-white px-6 text-center py-2 rounded-md text-sm font-semibold hover:bg-primary/80 duration-200 transition-all"
        >
          Upload New File
        </Link>
        <Link
          to="/dashboard/details"
          className="bg-white border text-primary border-primary  px-6 text-center py-2 rounded-md text-sm font-semibold hover:bg-gray-100 duration-200 transition-all"
        >
          View Files
        </Link>
      </div>
    </div>
  );
};

export default DashboardDetails;
