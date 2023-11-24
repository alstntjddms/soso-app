import React, { useState } from "react";
import HorizonLine from "../etc/HorizonLine";
import { Button, Input } from "@nextui-org/react";
import { MailIcon } from "./icons/MailIcon";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";
import sosoAPI from "../framework/api/sosoAPI";
import { HttpStatusCode } from "axios";

export default function Register(props) {
  const { state, setState } = props;
  const [sendCertified, setSendCertified] = useState(true);
  const [checkIdDuplicated, setCheckIdDuplicated] = useState(false);
  const [checkCertified, setCheckCertified] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [certifiedCode, setCertifiedCode] = useState("");

  const handleLoginClick = () => {
    setState("login");
  };

  const handleRegisterClick = async () => {
    if (sendCertified !== false || checkIdDuplicated !== true) {
      return;
    }
    await sosoAPI
      .post("/register/member", {
        loginId: loginId,
        password: password,
        name: name,
        email: email,
        certifiedCode: certifiedCode,
      })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setState("login");
          alert("회원가입을 성공했습니다.");
        }
      });
  };

  const handleSendCertified = async () => {
    await sosoAPI
      .post("/register/send-CertifiedCodeToMail", {
        email: email,
      })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setSendCertified(false);
          alert("인증번호를 전송했습니다.");
        }
      });
  };

  const handleCheckCertified = async () => {
    await sosoAPI
      .post("/register/check-CertifiedCodeToEmail", {
        email: email,
        certifiedCode: certifiedCode,
      })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setCheckCertified(true);
          alert("인증을 성공했습니다.");
        }
      });
  };

  const handleCheckIdDuplicated = async () => {
    await sosoAPI
      .post("/register/check-LoginIdDuplicated", {
        loginId: loginId,
      })
      .then((res) => {
        console.log(res);
        if (res.status === HttpStatusCode.Ok) {
          setCheckIdDuplicated(true);
          alert("사용 가능한 아이디 입니다.");
        }
      });
  };

  const toggleVisibility = (e) => {
    setIsVisible(!isVisible);
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
            <div className="flex">
              <Input
                size="sm"
                color="primary"
                type="email"
                label="아이디"
                variant="flat"
                labelPlacement="inside"
                isDisabled={checkIdDuplicated}
                onValueChange={setLoginId}
              />
              <Button
                variant="flat"
                className="ml-1 h-12"
                onClick={handleCheckIdDuplicated}
                isDisabled={checkIdDuplicated}
              >
                중복 확인
              </Button>
            </div>
            <Input
              size="sm"
              color="primary"
              label="비밀번호"
              variant="flat"
              labelPlacement="inside"
              onValueChange={setPassword}
              type={isVisible ? "text" : "password"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <div className="bg-slate-200 p-4 space-y-2 shadow-sm rounded-lg">
            <Input
              size="sm"
              color="primary"
              type="email"
              label="이름"
              variant="flat"
              labelPlacement="inside"
              onValueChange={setName}
            />
            {sendCertified ? (
              <div className="flex">
                <Input
                  size="sm"
                  color="primary"
                  type="email"
                  label="이메일"
                  variant="flat"
                  placeholder="soso@naver.com"
                  onValueChange={setEmail}
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Button
                  variant="flat"
                  className="ml-1 h-12	"
                  onClick={handleSendCertified}
                >
                  인증 전송
                </Button>
              </div>
            ) : null}

            {!sendCertified ? (
              <div className="flex">
                <Input
                  size="sm"
                  color="primary"
                  type="text"
                  label="인증번호"
                  variant="flat"
                  labelPlacement="inside"
                  isDisabled={checkCertified}
                  onValueChange={setCertifiedCode}
                />
                <Button
                  variant="flat"
                  className="ml-1 h-12	"
                  onClick={handleCheckCertified}
                  isDisabled={checkCertified}
                >
                  인증 확인
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-4"></div>
        <Button
          variant="bordered"
          color="green"
          className="w-full hover:bg-cyan-950 hover:text-white"
          onClick={handleRegisterClick}
          isDisabled={!checkIdDuplicated || !checkCertified || sendCertified}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
