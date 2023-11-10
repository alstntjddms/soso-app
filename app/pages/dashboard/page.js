"use client";

import { useDispatch, useSelector } from "react-redux";
import Row from "@/app/components/dnd/Row";
import { Button, useDisclosure } from "@nextui-org/react";
import CreateData from "@/app/components/modal/CreateData";
import ShowData from "@/app/components/modal/ShowData";
import { useEffect } from "react";

export default function () {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.datas);

  const updateData = (data) => {
    dispatch({ type: "setDatas", data: data });
  };

  const handleBtnClick = () => {
    dispatch({ type: "toggleCreateData" });
  };

  useEffect(() => {
    console.log("qqqqqqqqqqqqqqqqqqq");
    setTimeout(() => {
      dispatch({ type: "closeLoading" });
    }, 500);
  });

  return (
    <>
      <Row datas={datas} updateData={updateData} />
      <CreateData />
      <ShowData />
      <Button onPress={handleBtnClick}>추가</Button>
    </>
  );
}
