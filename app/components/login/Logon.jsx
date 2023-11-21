import React from "react";
import HorizonLine from "../etc/HorizonLine";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Logon(props) {
  const router = useRouter();

  const state = props.state;
  const setState = props.setState;

  const aaaa = ["aa", "bb", "cc"];

  const handleLoginClick = (e) => {
    e.preventDefault();
    router.replace("/pages/dashboard");
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setState("login");
  };

  return (
    <div
      className="absolute bg-gray-100 flex w-3/4 max-w-4xl shadow-2xl rounded-lg"
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
          SOSO PROJECT1
        </a>
        <div className="text-center text-cyan-950 text-3xl font-semibold mb-6">
          참여 가능 프로젝트
        </div>
        <HorizonLine text="SOSO" />

        <div className="flex justify-center space-x-4 mb-6">
          {/* <Button variant="outlined" color="blue" icon={<FaFacebookF />} />
            <Button variant="outlined" color="blue" icon={<FaLinkedinIn />} />
            <Button variant="outlined" color="red" icon={<FaGoogle />} /> */}
        </div>
        <div className="text-center mb-6">테스트으으ㅡ</div>
        <div className="space-y-4">
          <Select
            label="참여 가능 프로젝트 목록"
            variant="bordered"
            placeholder="프로젝트를 선택해 주세요."
            selectedKeys={"aa"}
            className="max-w-xs"
            // onSelectionChange={setValue}
            fullWidth
          >
            {aaaa.map((animal) => (
              <SelectItem key={animal} value={animal}>
                {animal}
              </SelectItem>
            ))}
          </Select>
          <div className="bg-slate-200 p-4 space-y-2 shadow-sm rounded-lg">
            <div>로그인정보</div>
            <Input
              size="sm"
              color="primary"
              type="email"
              label="로그인 아이디"
              variant="bordered"
              labelPlacement="inside"
              value="전민수"
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
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-2">안녕하세요!</h2>
          <HorizonLine text="SOSO" />
          <div className="text-lg mb-8">123456789</div>
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
