import PageLayout from "@/layouts/app/page-layout";
import DashboardDetails from "./components/dashboard-details";
import EmptyState from "@/components/custom/empty-state";
import useFiles from "@/hooks/use-files";

const Upload = () => {
  const { storedFiles } = useFiles();

  return (
    <div className="Details h-full bg-[#fefffe]">
      <PageLayout
        pageTitle="Dashboard"
        pageDescription="Welcome to your homepage..."
      >
        {storedFiles?.length ? (
          <DashboardDetails data={storedFiles} />
        ) : (
          <EmptyState />
        )}
      </PageLayout>
    </div>
  );
};

export default Upload;
