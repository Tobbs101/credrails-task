import PageLayout from "@/layouts/app/page-layout";
import DashboardDetails from "./components/dashboard-details";
import EmptyState from "./components/empty-state";

const Upload = () => {
  const recentUploads = [
    { name: "report.pdf", size: "2MB", date: "2 hours ago" },
    { name: "invoice.png", size: "1MB", date: "1 day ago" },
    { name: "design.psd", size: "5MB", date: "3 days ago" },
  ];

  return (
    <div className="Details h-full bg-[#fefffe]">
      <PageLayout
        pageTitle="Dashboard"
        pageDescription="Welcome to your homepage..."
      >
        {recentUploads?.length ? (
          <DashboardDetails data={recentUploads} />
        ) : (
          <EmptyState />
        )}
      </PageLayout>
    </div>
  );
};

export default Upload;
