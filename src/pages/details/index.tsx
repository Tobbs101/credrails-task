import PageLayout from "@/layouts/app/page-layout";
import DetailsTable from "./components/details-table";

const Details = () => {
  return (
    <div className="Details h-full bg-[#fefffe]">
      <PageLayout
        pageTitle="File Details"
        pageDescription="Review the details of your uploaded files"
      >
        <DetailsTable />
      </PageLayout>
    </div>
  );
};

export default Details;
