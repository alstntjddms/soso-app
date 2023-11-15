"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "closeLoading" });
    }, 500);
  });
  return <div className="bg-white">teamlaeder111</div>;
}
