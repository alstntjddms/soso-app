"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomTable from "./CustomTable";

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("qqqqqqqqqqqqqqqqqqq");
    setTimeout(() => {
      dispatch({ type: "closeLoading" });
    }, 500);
  });
  return (
    <div className="bg-white">
      indivisual
      <CustomTable />
      <CustomTable />
      <CustomTable />
      <CustomTable />
      <CustomTable />
      <CustomTable />
    </div>
  );
}
