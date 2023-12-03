"use client";

import { useDispatch, useSelector } from "react-redux";
import Row from "@/app/components/dnd/Row";
import { Button, Card, CardBody } from "@nextui-org/react";
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
    findTeamMembers();
    const intervalId = setInterval(findDatasByLoginMember, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const findDatasByLoginMember = async () => {
    try {
      await sosoAPI.get("/data/datas").then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setDatas(res.data);
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
        }
      });
    } catch (error) {
      dispatch({ type: "toggleCommonError", data: error });
    } finally {
      dispatch({ type: "closeLoading" });
    }
  };

  const findTeamMembers = async () => {
    await sosoAPI.get("/team/members").then((res) => {
      if (res.status === HttpStatusCode.Ok) {
        dispatch({ type: "setTeamMembers", data: res.data });
      } else if (res.response.status === HttpStatusCode.BadRequest) {
        dispatch({ type: "toggleCommonError", data: res.response.data });
      }
    });
  };

  const patchDatas = async (datas) => {
    try {
      // dispatch({ type: "openTransLoading" });
      await sosoAPI.patch("/data/datas", datas).then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          // console.log(res);
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
        }
      });
    } catch (error) {
      dispatch({ type: "toggleCommonError", data: error });
    } finally {
      findDatasByLoginMember();
      // dispatch({ type: "closeTransLoading" });
    }
  };

  return (
    <div className="p-4">
      <Card className="w-[1050px] mb-4">
        <CardBody>
          <div className="flex">
            <Button
              variant="bordered"
              color="green"
              className="hover:bg-cyan-950 hover:text-white block"
              onPress={handleBtnClick}
            >
              요청
            </Button>
          </div>
        </CardBody>
      </Card>
      <Row datas={datas} patchDatas={patchDatas} />
      <CreateData findDatasByLoginMember={findDatasByLoginMember} />
      <ShowData findDatasByLoginMember={findDatasByLoginMember} />
    </div>
  );
}
