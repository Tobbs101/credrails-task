/* eslint-disable valid-typeof */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useState } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";
import Papa from "papaparse";
import FileImage from "@/assets/file.png";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomProgressBar from "./custom-progress-bar";
import * as XLSX from "xlsx";
import { trimMessage } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import { SubmitBtn } from "@/components/ui/submit-btn";
import FormSelect from "@/components/form/form-select";
import { responseModalDefaults as Defaults } from "@/lib/utils";
import { ResponseModal as Response } from "@/@types";
import { Dialog } from "@/components/ui/dialog";
import FailureModalCard from "@/components/custom/failure-modal-card";
import SuccessModalCard from "@/components/custom/success-modal-card";
import useFiles from "@/hooks/use-files";

const formSchema = z
  .object({
    startDate: z.coerce.date({
      required_error: "Start Date is required!",
      invalid_type_error: "Invalid date format!",
    }),
    endDate: z.coerce.date({
      required_error: "End Date is required!",
      invalid_type_error: "Invalid date format!",
    }),
    dateType: z.enum(["created_at", "updated_at", "due_date"], {
      invalid_type_error: "Please select a valid Date Type!",
    }),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (endDate < startDate) {
      ctx.addIssue({
        code: "custom",
        message: "End Date must be after or equal to Start Date!",
        path: ["endDate"],
      });
    }
  });

interface FileContainerProps extends DropzoneRootProps {
  isDragActive: boolean;
  children: ReactNode;
  className?: string;
}

const FileContainer: React.FC<FileContainerProps> = ({
  isDragActive,
  children,
  className,
  ...rootProps
}) => {
  return (
    <div
      {...rootProps}
      className={cn(
        "border flex items-center mt-5 mb-4 justify-center flex-col h-[200px] w-full border-dashed duration-200 p-5 text-center cursor-pointer",
        isDragActive
          ? "border-primary bg-gray-100"
          : "border-gray-300 bg-gray-50",
        className
      )}
    >
      {children}
    </div>
  );
};

const FileUpload = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateType: "created_at",
    },
  });

  const [successModal, setSuccessModal] = useState<Response>(Defaults);
  const [failureModal, setFailureModal] = useState<Response>(Defaults);

  const [file, setFile] = useState<File | null>(null);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: any[]) => {
    if (acceptedFiles.length > 0) {
      setIsProcessing(true);
      setProgress(1);
      setIsError(false); // Reset error state
      setErrorMessage(null); // Reset error message state

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentLoaded = Math.round((event.loaded / event.total) * 100);

          let simulatedProgress = 0;
          const simulateProgress = setInterval(() => {
            simulatedProgress += 10;
            if (simulatedProgress >= percentLoaded) {
              clearInterval(simulateProgress);
            } else {
              setProgress(simulatedProgress);
            }
          }, 100);
        }
      };

      reader.onloadend = () => {
        setTimeout(() => {
          if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
            // Handle Excel file
            const binaryStr = reader.result as string;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0]; // Get the first sheet
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const filteredData = jsonData.filter((row) =>
              Array.isArray(row) ? row.some((cell) => cell !== "") : false
            );

            const rowCount =
              filteredData.length > 1 ? filteredData.length - 1 : 0;

            if (rowCount <= 0) {
              setIsProcessing(false);
              setIsError(true);
              setErrorMessage(
                "The file must contain at least one row of data."
              );
              return;
            }

            // Simulate processing delay (2s)
            setTimeout(() => {
              setRecordCount(rowCount);
              setIsProcessing(false);
              setProgress(100);
              setFile(file);
            }, 2000);
          } else if (file.name.endsWith(".csv")) {
            // Handle CSV file
            Papa.parse(reader.result as string, {
              header: true, // Treat first row as header
              skipEmptyLines: true, // Ignore empty lines
              complete: (result) => {
                const { data } = result;

                const rowCount = data.length;

                if (rowCount <= 0) {
                  setIsProcessing(false);
                  setIsError(true);
                  setErrorMessage(
                    "The file must contain at least one row of data."
                  );
                  return;
                }

                // Simulate processing delay (2s)
                setTimeout(() => {
                  setRecordCount(rowCount);
                  setIsProcessing(false);
                  setProgress(100);
                  setFile(file);
                }, 2000);
              },
              error: (error: Error) => {
                setIsProcessing(false);
                setIsError(true);
                setErrorMessage(`Error parsing CSV: ${error.message}`);
              },
            });
          }
        }, 1000);
      };

      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  const handleCloseOnSuccess = () => {
    setSuccessModal(Defaults);
    form.reset();
    setFile(null);
  };

  const handleCloseOnFailure = () => {
    setFailureModal(Defaults);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false, // Single file upload
  });

  const { addFile } = useFiles();

  const HandleLabel = () => {
    if (isDragActive)
      return (
        <span className="text-sm flex items-center justify-center gap-1">
          <Icon icon="formkit:uploadcloud" width={16} />
          <p>Drop the file here ...</p>
        </span>
      );

    if (isProcessing) return <CustomProgressBar progress={progress} />;

    if (isError)
      return (
        <p className="text-sm text-red-600 text-wrap truncate flex items-center justify-center gap-1">
          {trimMessage(`${errorMessage}`, 200)}
        </p>
      );

    return (
      <div className="text-sm">
        <p>Drag and drop your file here</p>
        <p className="text-primary mt-2">
          + Or select a file from your computer
        </p>
      </div>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const base64String = file ? await fileToBase64(file) : null;

      const payload = {
        ...values,
        file: {
          name: file?.name,
          size: file?.size,
          type: file?.type,
          base64: base64String,
        },
        dateUploaded: new Date(),
        recordCount,
      };

      const response = await addFile(payload);

      setSuccessModal({
        show: true,
        title: "Success",
        info: response as string,
        primaryBtnLabel: "Close",
      });
    } catch (error) {
      setFailureModal({
        show: true,
        title: "Error",
        info: error as string,
        primaryBtnLabel: "Try again",
      });
    }
  };

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
      <Dialog open={successModal.show}>
        <SuccessModalCard
          title={successModal.title}
          info={successModal.info}
          primaryBtnLabel={successModal.primaryBtnLabel}
          onProceed={() => handleCloseOnSuccess()}
        />
      </Dialog>
      <div className="flex items-center justify-center py-10">
        <div className="shadow-md max-w-[425px] w-full rounded-sm border border-gray-50 p-5 flex items-center justify-start flex-col">
          <h1 className="font-bold">Upload file</h1>
          <div className="divider bg-gray-100 h-[1px] my-4 w-full" />
          <p className="text-left px-2 w-full text-sm">
            Please upload your <span className="font-bold">.CSV, .XLSX</span>{" "}
            file
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mt-5"
            >
              <div className="flex items-center px-2 justify-center gap-5 flex-wrap">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      type="date"
                      className="border border-gray-100 duration-300 focus:bg-white bg-gray-100 shadow-none py-5"
                      label={"Start Date"}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      type="date"
                      className="border border-gray-100 duration-300 focus:bg-white bg-gray-100 shadow-none py-5"
                      label={"End Date"}
                    />
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dateType"
                render={({ field }) => (
                  <FormSelect
                    field={field}
                    label={"Select Date Type"}
                    placeholder="Select below"
                    className="border border-gray-100 duration-300 focus:bg-white bg-gray-100 shadow-none py-5"
                    options={[
                      { id: 1, title: "Created At", value: "created_at" },
                      { id: 2, title: "Updated At", value: "updated_at" },
                      { id: 3, title: "Due Date", value: "due_at" },
                    ]}
                  />
                )}
              />
              <button type="submit" className="hidden" id="file-upload-btn">
                submit
              </button>
            </form>
          </Form>
          {!file ? (
            <FileContainer
              className={isError ? "border border-red-500" : ""}
              {...getRootProps({})}
              isDragActive={isDragActive}
            >
              <input {...getInputProps()} />
              <HandleLabel />
            </FileContainer>
          ) : (
            <FileContainer isDragActive={isDragActive}>
              <div className="text-sm flex items-center justify-center flex-col gap-2">
                <img className="w-[25%] mb-2" src={FileImage} />
                <p className="font-semibold">{file?.name}</p>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                  }}
                  className="text-red-500"
                >
                  Remove File
                </button>
              </div>
            </FileContainer>
          )}
          <div className="w-full flex items-center justify-center">
            <SubmitBtn
              isSubmitting={form.formState.isSubmitting}
              disabled={!file}
              className="w-[110px] my-5 h-[40px] bg-primary"
              onClick={() =>
                document.getElementById("file-upload-btn")?.click()
              }
            >
              Submit
            </SubmitBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
