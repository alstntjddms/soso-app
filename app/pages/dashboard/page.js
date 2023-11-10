"use client";

import Row from "@/app/components/dnd/Row";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const updateData = (data) => {
    dispatch({ type: "setItems", data: data });
  };

  return <Row items={items} setItems={updateData} />;
}
