"use client";
import Login from "@/app/components/login/Login";
import { useEffect, useState } from "react";
import Register from "@/app/components/login/Register";
import Logon from "@/app/components/login/Logon";
import NewTeamCreate from "@/app/components/modal/NewTeamCreate";
import { Provider } from "react-redux";
import store from "@/app/store/store";
import CommonError from "../components/modal/CommonError";
import CommonSuccess from "../components/modal/CommonSuccess";
import TransLoading from "../components/loading/TransLoading";

export default function Page() {
  const [state, setState] = useState("login");

  useEffect(() => {
    // alert(state);
  }, [state]);

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <Provider store={store}>
        <Login state={state} setState={setState} />
        <Register state={state} setState={setState} />
        <Logon state={state} setState={setState} />
        <NewTeamCreate />
        <CommonError />
        <CommonSuccess />
        <TransLoading />
      </Provider>
    </div>
  );
}
