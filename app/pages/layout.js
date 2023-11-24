"use client";
import Menu from "@/app/components/Menu";
import Navbar from "@/app/components/Navbar";
import { Provider } from "react-redux";
import Loading from "@/app/components/loading/Loading";
import store from "@/app/store/store";
import TransLoading from "@/app/components/loading/TransLoading";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();

  const handleLoginClick = (e) => {
    router.replace("/login");
  };
  return (
    <Provider store={store}>
      <div className="flex h-screen">
        <div className="w-[150px] bg-gray-200 h-full">
          <h3 className="w-[150px] h-[40px] bg-white">로고</h3>
          <button onClick={handleLoginClick}>로그아웃</button>
          <Menu />
        </div>
        <div className="flex flex-col w-full">
          <div className="bg-black">
            <Navbar />
          </div>
          <div className="flex">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
      <Loading />
      <TransLoading />
    </Provider>
  );
}
