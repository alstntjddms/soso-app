import React from "react";
import HorizonLine from "../etc/HorizonLine";
import { Button, Checkbox, Input, Label } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Register(props) {
  const router = useRouter();

  const state = props.state;
  const setState = props.setState;

  const handleLoginClick = (e) => {
    setState("login");
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setState("login");
    // router.replace("/pages/dashboard");
  };

  return (
    <div
      className="fixed bg-gray-100 flex w-3/4 max-w-4xl shadow-2xl rounded-lg"
      style={{
        transform: `translateX(${state === "register" ? "0%" : "110%"})`,
        opacity: state === "register" ? "1" : "0",
        pointerEvents: state === "register" ? "auto" : "none",
        transitionProperty: "transform, opacity",
        transitionDuration: "1000ms",
      }}
    >
      {/* Welcome Section */}
      <div className="w-2/5 bg-cyan-950 text-white p-10 rounded-lg flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-2">회원가입</h2>
          <HorizonLine text="SOSO" />
          <div className="text-lg mb-8">123456789</div>
          <Button
            variant="bordered"
            color="white"
            className="hover:bg-white hover:text-cyan-950"
            onClick={handleLoginClick}
          >
            로그인
          </Button>
        </div>
      </div>
      {/* Sign In Section */}
      <div className="w-3/5 p-10">
        <a href="/" className="text-left font-semibold text-xl mb-2">
          SOSO PROJECT
        </a>
        <div className="text-center text-cyan-950 text-3xl font-semibold mb-6">
          Create to Account
        </div>
        <HorizonLine text="SOSO" />
        <div className="space-y-4">
          <div className="bg-slate-200 p-4 space-y-2 shadow-sm rounded-lg">
            <div>로그인정보</div>
            <Input
              size="sm"
              color="primary"
              type="email"
              label="아이디"
              variant="flat"
              labelPlacement="inside"
            />
            <Input
              size="sm"
              color="primary"
              type="password"
              label="비밀번호"
              variant="flat"
              labelPlacement="inside"
            />
            <Input
              size="sm"
              color="primary"
              type="password"
              label="비밀번호 확인"
              variant="flat"
              labelPlacement="inside"
            />
          </div>
          <div className="bg-slate-200 p-4 space-y-2 shadow-sm rounded-lg">
            <div>본인 인증</div>
            <Input
              size="sm"
              color="primary"
              type="email"
              label="이메일"
              variant="flat"
              labelPlacement="inside"
            />
            <Input
              size="sm"
              color="primary"
              type="text"
              label="인증번호"
              variant="flat"
              labelPlacement="inside"
            />
          </div>
        </div>
        <div className="mb-4"></div>
        <Button
          variant="bordered"
          color="green"
          className="w-full hover:bg-cyan-950 hover:text-white"
          onClick={handleRegisterClick}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
