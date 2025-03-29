import useUsers from "@/hooks/use-users";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatFileSize } from "@/lib/utils";
import Each from "@/components/helpers/each";
import { useEffect, useState } from "react";

const DashboardDetails = ({ data }: { data: any[] }) => {
  const { currentUser } = useUsers();

  const [recentFiles, setRecentFiles] = useState<any[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      // Sort data by dateUploaded in descending order (latest first)
      const sortedFiles = [...data].sort(
        (a, b) =>
          new Date(b.dateUploaded).getTime() -
          new Date(a.dateUploaded).getTime()
      );

      // Take the top 3 recent files
      setRecentFiles(sortedFiles.slice(0, 3));
    }
  }, [data]);

  const largestFile = data.reduce((max, file) =>
    file.file.size > max.file.size ? file : max
  );

  const latestFile = data.reduce((latest, file) =>
    new Date(file.dateUploaded) > new Date(latest.dateUploaded) ? file : latest
  );

  const STATS = [
    { id: 1, title: "Total Files", value: data?.length },
    {
      id: 2,
      title: "Largest File",
      value: formatFileSize(largestFile?.file?.size),
    },
    {
      id: 3,
      title: "Last Upload",
      value: latestFile?.file?.name,
    },
  ];

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
        <Each
          of={STATS}
          render={(item) => (
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <p className="font-bold text-gray-700">{item?.value}</p>
              <p className="text-gray-500 text-sm font-medium">{item?.title}</p>
            </div>
          )}
        />
      </div>

      {/* Recent Uploads Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-sm font-semibold text-gray-800">Recent Uploads</h2>
        <ul className="mt-2 divide-y divide-gray-200">
          <Each
            of={recentFiles}
            render={(item, index) => (
              <li
                key={index}
                className="py-3 flex justify-between text-gray-700"
              >
                <span className="text-sm font-medium">{item?.file.name}</span>
                <span className="text-xs text-gray-500 ">
                  {formatFileSize(item?.file.size)} •{" "}
                  {moment(item?.dateUploaded).format("YYYY-MM-DD")}
                </span>
              </li>
            )}
          />
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
