import React from "react";

interface ProgressProps {
  progress: number;
}

const CustomProgressBar: React.FC<ProgressProps> = ({ progress }) => {
  return (
    <div className="mt-4 w-[80%]">
      <p className="text-sm">Uploading File...</p>
      <div className="w-full bg-gray-300 mt-3 rounded-full h-2">
        <div
          className="bg-[#40196D] h-2 rounded-full transform origin-left transition-transform duration-200"
          style={{
            transform: `scaleX(${progress / 100})`, // Scale based on progress
          }}
        ></div>
      </div>
    </div>
  );
};

export default CustomProgressBar;
