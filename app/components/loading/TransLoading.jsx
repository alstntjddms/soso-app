"use client";
import React from "react";
import { CircularProgress } from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function TransLoading() {
  const TransLoadingDisplay = useSelector((state) => state.TransLoading);

  const overlayStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: TransLoadingDisplay,
    color: "white",
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={overlayStyles}
    >
      <CircularProgress size="lg" label="Loading..." />
    </div>
  );
}