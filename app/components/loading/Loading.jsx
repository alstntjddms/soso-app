"use client";
import { useSelector } from "react-redux";

export default function Loading() {
  const LoadingDisplay = useSelector((state) => state.Loading);

  const overlayStyles = {
    display: LoadingDisplay,
  };

  return (
    <div
      className="fixed bg-white top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={overlayStyles}
    >
      <div className="loading-container p-8 bg-white rounded-md shadow-md">
        <div className="loading-spinner w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="text-center mt-4">Loading...</p>
      </div>
    </div>
  );
}
