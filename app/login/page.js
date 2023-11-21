"use client";
import Login from "../components/login/Login";
import { useEffect, useState } from "react";
import Register from "../components/login/Register";
import Logon from "../components/login/Logon";
import NewTeamCreate from "../components/modal/NewTeamCreate";
import { Provider } from "react-redux";
import store from "../store/store";

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
