"use client";
import { Provider } from "react-redux";
import Loading from "@/app/components/loading/Loading";
import store from "@/app/store/store";
import TransLoading from "@/app/components/loading/TransLoading";
import CommonError from "../components/modal/common/CommonError";
import CommonSuccess from "../components/modal/common/CommonSuccess";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { RecoilRoot } from "recoil";

export default function Layout({ children }) {
  const Theme = createTheme({
    palette: {
      soso: {
        main: "#083344",
      },
      white: {
        main: "#FFFFFF",
      },
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <Provider store={store}>
          <Box sx={{ display: "flex" }}>
            <Header />
            <Sidebar />
            <div className="mt-20 ml-2 mr-2 w-full">{children}</div>
          </Box>
          <Loading />
          <TransLoading />
          <CommonError />
          <CommonSuccess />
        </Provider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
