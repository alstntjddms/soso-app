import React, { useState, useEffect } from "react";
import HorizonLine from "../etc/HorizonLine";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import sosoAPI from "../framework/api/sosoAPI";
import { HttpStatusCode } from "axios";
import NewTeamCreate from "../modal/NewTeamCreate";

export default function Logon(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { state, setState } = props;
  const teams = useSelector((state) => state.teams);

  const [team, setTeam] = useState(new Set([]));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const findLoginMember = async () => {
      try {
        const res = await sosoAPI.get("/login/member");
        if (res.status === HttpStatusCode.Ok) {
          setName(res.data.name);
          setEmail(res.data.email);
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
          setState("login");
        }
      } catch (error) {
        console.error("Error fetching login member:", error);
      }
    };

    const findTeamsByLoginId = async () => {
      try {
        const res = await sosoAPI.get("/team/teams");
        if (res.status === HttpStatusCode.Ok) {
          console.log(res.data);
          dispatch({ type: "setTeams", data: res.data });
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
          setState("login");
        }
      } catch (error) {
        console.error("Error fetching teams by login ID:", error);
      }
    };

    if (state === "logon") {
      findLoginMember();
      findTeamsByLoginId();
    }
  }, [state, dispatch, setState]);

  const handleLoginClick = async () => {
    console.log(teams[Array.from(team)[0]]);
    await sosoAPI
      .post("/team/login", teams[Array.from(team)[0]])
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          console.log(res);
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
        }
      });

    router.replace("/pages/dashboard");
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setState("login");
  };

  const handleNewTeamClick = (e) => {
    // setState("newTeam");
    dispatch({ type: "toggleNewTeamCreate" });
  };

  return (
    <div
      className="fixed bg-gray-100 flex w-3/4 max-w-4xl shadow-2xl rounded-lg"
      style={{
        transform: `translateY(${state === "logon" ? "0" : "-110%"})`,
        opacity: state === "logon" ? "1" : "0",
        pointerEvents: state === "logon" ? "auto" : "none",
        transitionProperty: "transform, opacity",
        transitionDuration: "1000ms",
      }}
    >
      {/* Sign In Section */}
      <div className="w-3/5 p-10">
        <a href="/" className="text-left font-semibold text-xl mb-2">
          SOSO PROJECT
        </a>
        <div className="text-center text-cyan-950 text-3xl font-semibold mb-6">
          참여 가능 프로젝트 팀
        </div>
        <HorizonLine text="SOSO" />

        <div className="flex justify-center space-x-4 mb-6">
          {/* <Button variant="outlined" color="blue" icon={<FaFacebookF />} />
            <Button variant="outlined" color="blue" icon={<FaLinkedinIn />} />
            <Button variant="outlined" color="red" icon={<FaGoogle />} /> */}
        </div>
        {/* <div className="text-center mb-6">테스트으으ㅡ</div> */}
        <div className="space-y-4 w-full">
          <Select
            label="참여 가능 팀 목록"
            variant="bordered"
            placeholder="프로젝트를 선택해 주세요."
            className="w-full"
            fullWidth
            key={team}
            onSelectionChange={setTeam}
          >
            {teams.map((t, index) => (
              <SelectItem key={index} value={t.id}>
                {t.teamName}
              </SelectItem>
            ))}
          </Select>

          <div className="bg-slate-200 p-4 space-y-2 shadow-sm rounded-lg">
            <Input
              size="sm"
              color="primary"
              type="email"
              label="이름"
              variant="bordered"
              labelPlacement="inside"
              value={name}
              isDisabled
            />
            <Input
              size="sm"
              color="primary"
              type="email"
              label="이메일"
              variant="bordered"
              labelPlacement="inside"
              value={email}
              isDisabled
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 mb-6"></div>
        <Button
          variant="bordered"
          color="green"
          className="w-full hover:bg-cyan-950 hover:text-white"
          onClick={handleLoginClick}
        >
          접속
        </Button>
      </div>

      {/* Welcome Section */}
      <div className="w-2/5 bg-cyan-950 text-white p-10 rounded-lg flex flex-col items-center justify-center">
        <Button
          variant="bordered"
          color="white"
          className="fixed top-4 right-4 hover:bg-white hover:text-cyan-950"
          onClick={handleNewTeamClick}
        >
          새로운 팀 생성
        </Button>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-2">하이!</h2>
          <HorizonLine text="SOSO" />
          <div className="text-lg mb-8">새로운 프로젝트팀을 만들어보세요!</div>
          <Button
            variant="bordered"
            color="white"
            className="hover:bg-white hover:text-cyan-950"
            onClick={handleLogoutClick}
          >
            로그아웃
          </Button>
        </div>
      </div>
      <NewTeamCreate />
    </div>
  );
}
