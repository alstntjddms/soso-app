"use client";

import { useDispatch, useSelector } from "react-redux";
import Row from "@/app/components/dnd/Row";
import { Button } from "@nextui-org/react";
import CreateData from "@/app/components/modal/CreateData";
import ShowData from "@/app/components/modal/ShowData";
import { useEffect } from "react";

export default function Page() {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.datas);

  const updateData = (datas) => {
    dispatch({ type: "setDatas", data: datas });
  };

  const handleBtnClick = () => {
    dispatch({ type: "toggleCreateData" });
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "closeLoading" });
    }, 500);
  });

  return (
    <>
      <Row datas={datas} updateData={updateData} />
      <CreateData />
      <ShowData updateData={updateData} />
      <Button onPress={handleBtnClick}>추가</Button>
    </>
  );
}
