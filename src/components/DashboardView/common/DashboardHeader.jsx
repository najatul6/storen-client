import { Link } from "react-router-dom";
import headerLogo from "../../../assets/brandLogo.png";
import useAuth from "@/hooks/useAuth";

const DashboardHeader = () => {
  const { user } = useAuth();
  return (
    <header className="flex shadow-md py-1 px-4 sm:px-7 bg-background2 min-h-[70px] tracking-wide z-[110] fixed top-0 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full relative bg-background2">
        <Link to="/" className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center w-[150px] h-[30px]">
            <img
              src={headerLogo}
              alt=""
              className="w-full h-fit object-center"
            />
          </div>
        </Link>

        <Link to="/dashboard/my-profile">
          <img
            src={
              user?.photoURL ||
              "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
            }
            alt="profile-pic"
            className="w-10 h-10 rounded-full border-2 border-baseColor cursor-pointer"
          />
        </Link>
        
      </div>
    </header>
  );
};

export default DashboardHeader;
