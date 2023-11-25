import React, { useState, useEffect } from "react";
import HorizonLine from "../etc/HorizonLine";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import sosoAPI from "../framework/api/sosoAPI";
import { HttpStatusCode } from "axios";

export default function Logon(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { state, setState } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const aaaa = [
    {
      label: "aaa",
      value: "aaa",
      description: "this is aaa",
    },
    {
      label: "bbb",
      value: "bbb",
      description: "this is bbb",
    },
    {
      label: "ccc",
      value: "ccc",
      description: "this is ccc",
    },
  ];

  useEffect(() => {
    if (state === "logon") {
      sosoAPI.get("/login/member").then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setName(res.data.name);
          setEmail(res.data.email);
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
          setState("login");
        }
      });
    }
  }, [state, setState, dispatch, setName, setEmail]);

  const handleLoginClick = (e) => {
    e.preventDefault();
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
            defaultSelectedKeys={["bbb"]}
            className="w-full"
            fullWidth
          >
            {aaaa.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
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
    </div>
  );
}
