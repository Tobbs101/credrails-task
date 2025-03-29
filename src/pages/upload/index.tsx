import PageLayout from "@/layouts/app/page-layout";
import FileUpload from "./components/file-upload";

const Upload = () => {
  return (
    <div className="Details h-full bg-[#fefffe]">
      <PageLayout
        pageTitle="File Upload"
        pageDescription="Securely upload your file, Supported formats: CSV , XLSX."
      >
        <FileUpload />
      </PageLayout>
    </div>
  );
};

export default Upload;
