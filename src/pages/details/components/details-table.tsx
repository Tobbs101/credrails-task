import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFiles from "@/hooks/use-files";
import { NewFileProps } from "@/@types";
import moment from "moment";
import EmptyState from "@/components/custom/empty-state";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { responseModalDefaults as Defaults } from "@/lib/utils";
import { ResponseModal as Response } from "@/@types";
import { Dialog } from "@/components/ui/dialog";
import FailureModalCard from "@/components/custom/failure-modal-card";

const DetailsTable = () => {
  const { storedFiles } = useFiles();

  const [failureModal, setFailureModal] = useState<Response>(Defaults);

  const handleCloseOnFailure = () => {
    setFailureModal(Defaults);
  };

  const downloadFile = (file: NewFileProps) => {
    if (!file?.file?.base64) {
      setFailureModal({
        show: true,
        title: "Error",
        info: "No file available for download!",
        primaryBtnLabel: "Dismiss",
      });
      return;
    }

    const link = document.createElement("a");
    link.href = file.file.base64; // Base64 as URL
    link.download = file.file.name || "";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!storedFiles?.length) return <EmptyState />;

  return (
    <>
      <Dialog open={failureModal.show}>
        <FailureModalCard
          title={failureModal.title}
          info={failureModal.info}
          primaryBtnLabel={failureModal.primaryBtnLabel}
          onProceed={() => handleCloseOnFailure()}
        />
      </Dialog>
      <div className="w-full border rounded-md mt-5">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>File Name</TableHead>
              <TableHead className="min-w-[150px]">Date Uploaded</TableHead>
              <TableHead className="min-w-[150px]">Start Date</TableHead>
              <TableHead className="min-w-[150px]">End Date</TableHead>
              <TableHead className="min-w-[200px]">Records Processed</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storedFiles.map((item: NewFileProps, index) => (
              <TableRow className="hover:bg-transparent" key={index}>
                <TableCell>{item?.file?.name}</TableCell>
                <TableCell>
                  {moment(item.dateUploaded).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {moment(item.startDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {moment(item.endDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{item.recordCount || "-"}</TableCell>
                <TableCell>
                  <button onClick={() => downloadFile(item)}>
                    <Icon
                      icon={"line-md:download-loop"}
                      className="text-[24px] text-primary"
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DetailsTable;
