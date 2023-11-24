"use client";
import Login from "@/app/components/login/Login";
import { useEffect, useState } from "react";
import Register from "@/app/components/login/Register";
import Logon from "@/app/components/login/Logon";
import NewTeamCreate from "@/app/components/modal/NewTeamCreate";
import { Provider } from "react-redux";
import store from "@/app/store/store";

export default function Page() {
  const [state, setState] = useState("login");

  useEffect(() => {
    // alert(state);
  }, [state]);

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <Login state={state} setState={setState} />
      <Register state={state} setState={setState} />
      <Provider store={store}>
        <Logon state={state} setState={setState} />
        <NewTeamCreate />
      </Provider>
    </div>
  );
}
