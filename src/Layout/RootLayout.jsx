import Footer from "@/components/RootView/common/Footer";
import Header from "@/components/RootView/common/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {


  const homeHeader =
    "Your Gateway to ⚡ Ultra-Fast Delivery – Order Now! | Don’t Wait – Super Fast Delivery Awaits!";
  return (
    <div className="flex flex-col  overflow-hidden">
      <Header />
      <h1 className="bg-[#1c1c1c] w-full py-4 text-center font-bold mb-2">
        {homeHeader}
      </h1>
      <div className="flex flex-col w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
