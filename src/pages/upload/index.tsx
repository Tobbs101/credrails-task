import PageLayout from "@/layouts/app/page-layout";

const Upload = () => {
  return (
    <div className="Details h-full bg-[#fefffe]">
      <PageLayout
        pageTitle="File Upload"
        pageDescription="Securely upload your file, Supported formats: CSV."
      ></PageLayout>
    </div>
  );
};

export default Upload;
