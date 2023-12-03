"use client";
import Login from "@/app/components/login/Login";
import { useEffect, useState } from "react";
import Register from "@/app/components/login/Register";
import Logon from "@/app/components/login/Logon";
import { Provider } from "react-redux";
import store from "@/app/store/store";
import TransLoading from "../components/loading/TransLoading";
import Cookies from "js-cookie";
import CommonError from "../components/modal/common/CommonError";
import CommonSuccess from "../components/modal/common/CommonSuccess";

export default function Page() {
  const [state, setState] = useState("login");

  useEffect(() => {
    if (Cookies.get("sosoJwtToken")) {
      setState("logon");
    }
  }, []);

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <Provider store={store}>
        <Login state={state} setState={setState} />
        <Register state={state} setState={setState} />
        <Logon state={state} setState={setState} />
        <TransLoading />
        <CommonError />
        <CommonSuccess />
      </Provider>
    </div>
  );
}
