"use client";
import Menu from "@/app/components/Menu";
import Navbar from "@/app/components/Navbar";
import { Provider } from "react-redux";
import Loading from "@/app/components/loading/Loading";
import store from "@/app/store/store";
import TransLoading from "@/app/components/loading/TransLoading";
import { useRouter } from "next/navigation";
import CommonError from "../components/modal/common/CommonError";
import CommonSuccess from "../components/modal/common/CommonSuccess";
import { Button, Image } from "@nextui-org/react";

export default function Layout({ children }) {
  const router = useRouter();

  const handleLoginClick = (e) => {
    router.replace("/login");
  };
  return (
    <Provider store={store}>
      {/* 타이틀 */}
      {/* <div className="flex h-[50px] w-screen bg-white border-gray-300 border-b-1 mb-1 pl-4"> */}
      <div className="py-2 border-b border-slate-900/10 lg:px-4 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0 lg:border-b">
        {/* <div className="w-[150px] h-[50px]"> */}
        <div className="relative flex items-center">
          <div className="mr-3 flex-none w-[100px] overflow-hidden">
            <Image
              alt="로고"
              width={80}
              src="https://nacredit.kz/wp-content/uploads/2022/12/soso.png"
            ></Image>
          </div>
          <div>
            <Button
              variant="bordered"
              color="green"
              className="hover:bg-cyan-950 hover:text-white block"
              onClick={handleLoginClick}
              size="sm"
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-full">
        {/* 메뉴 */}
        <div className="min-w-[150px] w-[150px] h-full">
          <Menu />
        </div>
        {/* 내용 */}
        <div className="flex flex-col w-full h-full">
          <div className="flex">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
      <Loading />
      <TransLoading />
      <CommonError />
      <CommonSuccess />
    </Provider>
  );
}
