"use client";
import sosoAPI from "@/app/components/framework/api/sosoAPI";
import { Input, Button } from "@nextui-org/react";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "closeLoading" });
    }, 500);
  });

  const handleAddMember = async () => {
    console.log("email");
    console.log(email);
    await sosoAPI
      .post("/team/addMemberByEmail", { email: email })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          console.log(res.data);
          alert("등록 성공");
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
        }
      });
  };
  return (
    <div className="bg-white">
      <Input
        autoFocus
        label="이메일"
        placeholder="이메일을 입력하세요."
        variant="bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        variant="bordered"
        color="green"
        className="w-full hover:bg-cyan-950 hover:text-white"
        onClick={handleAddMember}
      >
        멤버 추가
      </Button>
    </div>
  );
}
