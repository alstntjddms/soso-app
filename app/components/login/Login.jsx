import React, { useState } from "react";
import HorizonLine from "../etc/HorizonLine";
import { Button, Checkbox, Input, Label } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import sosoAPI from "../framework/api/sosoAPI";
import { HttpStatusCode } from "axios";

export default function Login(props) {
  const router = useRouter();
  const { state, setState } = props;
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async (e) => {
    await sosoAPI
      .post("/login/login", {
        loginId: loginId,
        password: password,
      })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setState("logon");
        }
      });
  };

  const handleRegisterClick = (e) => {
    setState("register");
  };

  const handleKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      handleLoginClick();
    }
  };

  return (
    <div
      className="fixed bg-gray-100 flex w-3/4 max-w-4xl shadow-2xl rounded-lg"
      style={{
        transform: `${
          state === "register" ? "translateX(-110%)" : "translateX(0%)"
        } ${state === "logon" ? "translateY(110%)" : "translateY(0%)"}`,
        opacity: state === "login" ? "1" : "0",
        pointerEvents: state === "login" ? "auto" : "none",
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
          Sign in to Account
        </div>
        <HorizonLine text="SOSO" />

        <div className="flex justify-center space-x-4 mb-6">
          {/* <Button variant="outlined" color="blue" icon={<FaFacebookF />} />
            <Button variant="outlined" color="blue" icon={<FaLinkedinIn />} />
            <Button variant="outlined" color="red" icon={<FaGoogle />} /> */}
        </div>
        <div className="text-center mb-6">이메일 계정으로 로그인</div>
        <div className="space-y-4">
          {/* <Input
            color="primary"
            label="그룹명"
            variant="bordered"
            labelPlacement="inside"
          /> */}
          <div className="bg-slate-200 p-4 space-y-2 shadow-sm rounded-lg">
            <Input
              size="sm"
              color="primary"
              type="email"
              label="아이디"
              variant="flat"
              labelPlacement="inside"
              onValueChange={setLoginId}
            />
            <Input
              size="sm"
              color="primary"
              type="password"
              label="비밀번호"
              variant="flat"
              labelPlacement="inside"
              onValueChange={setPassword}
              onKeyDown={handleKeyDownEnter}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 mb-6">
          <Checkbox size="sm" radius="sm" defaultSelected>
            로그인 상태 유지
          </Checkbox>
          <a href="#" className="text-sm text-cyan-950">
            비밀번호 찾기
          </a>
        </div>
        <Button
          variant="bordered"
          color="green"
          className="w-full hover:bg-cyan-950 hover:text-white"
          onClick={handleLoginClick}
        >
          로그인
        </Button>
      </div>

      {/* Welcome Section */}
      <div className="w-2/5 bg-cyan-950 text-white p-10 rounded-lg flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-2">안녕하세요!</h2>
          <HorizonLine text="SOSO" />
          <div className="text-lg mb-8">123456789</div>
          <Button
            variant="bordered"
            color="white"
            className="hover:bg-white hover:text-cyan-950"
            onClick={handleRegisterClick}
          >
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
