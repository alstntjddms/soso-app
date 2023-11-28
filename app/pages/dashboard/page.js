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

  const setDatas = (datas) => {
    dispatch({ type: "setDatas", data: datas });
  };

  const handleBtnClick = () => {
    dispatch({ type: "toggleCreateData" });
  };

  useEffect(() => {
    findDatasByLoginMember();
  }, []);

  const findDatasByLoginMember = async () => {
    try {
      dispatch({ type: "openLoading" });
      await sosoAPI.get("/domain/datas").then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setDatas(res.data);
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

  const patchDatas = async (datas) => {
    try {
      dispatch({ type: "openLoading" });
      await sosoAPI.patch("/domain/datas", datas).then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          console.log(res);
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
        }
      });
    } catch (error) {
      console.error("Error fetching login member:", error);
    } finally {
      findDatasByLoginMember();
      dispatch({ type: "closeLoading" });
    }
  };

  return (
    <>
      <Row datas={datas} patchDatas={patchDatas} />
      <CreateData />
      <ShowData updateData={patchDatas} />
      <Button onPress={handleBtnClick}>추가</Button>
    </>
  );
}
