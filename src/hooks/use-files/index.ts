import { SESSION_FILES_KEY } from "@/static";
import { NewFileProps } from "@/@types";

const getStoredFiles = (): NewFileProps[] => {
  const storedUsers = localStorage.getItem(SESSION_FILES_KEY);
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const useFiles = () => {
  let storedFiles: NewFileProps[] = getStoredFiles();

  const addFile = async (file: NewFileProps): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let storedFiles = getStoredFiles();

        if (!file?.file) {
          reject("Please select a file");
          return;
        }

        // Check if file already exists
        const fileExists = storedFiles.some(
          (f) => f?.file?.name === file?.file?.name
        );

        if (fileExists) {
          reject("A file with this name already exists!");
          return;
        }

        // Add new file
        storedFiles.push(file);

        // Update storage
        localStorage.setItem(SESSION_FILES_KEY, JSON.stringify(storedFiles));

        resolve("File added successfully!");
      }, 2000); // Simulating API delay
    });
  };

  return { storedFiles, addFile };
};

export default useFiles;
