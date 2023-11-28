"use client";

import { useDispatch, useSelector } from "react-redux";
import Row from "@/app/components/dnd/Row";
import { Button } from "@nextui-org/react";
import CreateData from "@/app/components/modal/CreateData";
import ShowData from "@/app/components/modal/ShowData";
import { useEffect } from "react";
import sosoAPI from "@/app/components/framework/api/sosoAPI";
import { HttpStatusCode } from "axios";

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
    const findDatasByLoginMember = async () => {
      try {
        await sosoAPI.get("/domain/datas").then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            updateData(res.data);
            console.log(res.data);
          } else if (res.response.status === HttpStatusCode.BadRequest) {
            dispatch({ type: "toggleCommonError", data: res.response.data });
          }
        });
      } catch (error) {
        console.error("Error fetching login member:", error);
      } finally {
        dispatch({ type: "closeLoading" });
      }
    };
    findDatasByLoginMember();
  }, []);

  return (
    <>
      <Row datas={datas} updateData={updateData} />
      <CreateData />
      <ShowData updateData={updateData} />
      <Button onPress={handleBtnClick}>추가</Button>
    </>
  );
}
