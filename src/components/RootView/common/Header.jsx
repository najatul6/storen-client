import { Link, NavLink, useLocation } from "react-router-dom";
import { RiMenuAddLine } from "react-icons/ri";
import { CgMenuMotion } from "react-icons/cg";
import brandImg from "../../../assets/ninSupply.svg";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/avatar";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MyCart from "@/pages/RootView/MyCart/MyCart";
import useCart from "@/hooks/useCart";
import { useCartContext } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageLoad, setIsPageLoad] = useState(false);
  const { user, logOut } = useAuth();
  const { pathname } = useLocation();
  const { isCartOpen, setIsCartOpen } = useCartContext();
  const [cart] = useCart();
  // const totalPrice = cart?.reduce(
  //   (acc, curr) => acc + parseFloat(curr.price || 0),
  //   0
  // );

  // Menu
  const menu = [
    {
      name: "Home",
      path: "/",
      type: "public",
    },
    {
      name: "Shop",
      path: "/shop/popular",
      type: "public",
    },
    {
      name: "Subscription",
      path: "/subscription",
      type: "public",
    },
    {
      name: "Gift Card",
      path: "/gift-card",
      type: "public",
    },
  ];

  // Logout
  const handleLogOut = () => {
    toast.promise(logOut(), {
      pending: "Logging out...",
      success: "Logged out successfully",
      error: "Error logging out",
    });
  };

  return (
    <nav className="overflow-x-clip ">
      <div className="lg:w-11/12 px-2 lg:px-0 mx-auto py-5 flex justify-between items-center relative">
        <div className="lg:hidden flex items-center gap-1">
          <div className="lg:hidden rounded-md border p-1">
            {!isMenuOpen ? (
              <RiMenuAddLine
                onClick={() => {
                  setIsMenuOpen(true);
                  setIsPageLoad(true);
                }}
                className="text-2xl cursor-pointer"
              ></RiMenuAddLine>
            ) : (
              <CgMenuMotion
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl cursor-pointer"
              ></CgMenuMotion>
            )}

            {
              <ul
                className={`capitalize w-full py-5 flex animate__animated flex-col lg:hidden gap-5 absolute z-50  backdrop-blur-2xl px-5 min-h-screen top-20  left-0 ${
                  isMenuOpen
                    ? "animate__fadeInLeft "
                    : isPageLoad
                    ? "animate__fadeOutRight flex "
                    : "hidden"
                } `}
              >
                {menu.map((item) => (
                  <NavLink
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ||
                      (item.path === "/shop/popular" &&
                        pathname.startsWith("/shop"))
                        ? "border-b-2 border-baseColor font-medium text-baseColor transition  duration-200"
                        : "hover:border-b-2 hover:border-baseColor transition duration-200"
                    }
                    key={item.path}
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* <hr className="w-1/3  mx-auto border-2 border-orange-500 rounded-full" /> */}
                <div
                  className={`${
                    user && user?.email ? "hidden" : "flex"
                  } flex-col gap-5 items-center border mt-5 py-2 border-baseColor`}
                >
                  <NavLink
                    to="/auth/login"
                    className="uppercase font-bold text-xl tracking-[2px] bg-transparent border-2 w-3/4 text-center py-2 border-baseColor hover:text-white hover:bg-baseColor transition duration-200 rounded-md text-baseColor"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    className="uppercase font-bold text-xl tracking-[2px] bg-transparent border-2 w-3/4 text-center py-2 border-baseColor hover:text-white hover:bg-baseColor transition duration-200 rounded-md text-baseColor"
                  >
                    Register
                  </NavLink>
                </div>
              </ul>
            }
          </div>
        </div>
        <Link to="/" className="logo">
          <div className="flex justify-center items-center w-[150px] h-[30px]">
            <img src={brandImg} alt="" className="w-full h-fit object-center" />
          </div>
        </Link>

        {/* menu-lg start */}
        <ul className="hidden lg:flex items-center gap-5 capitalize">
          {menu.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ||
                (item.path === "/shop/popular" && pathname.startsWith("/shop"))
                  ? "border-b-2 border-baseColor text-baseColor font-medium transition duration-200"
                  : "hover:border-b-2 hover:border-baseColor transition duration-200"
              }
              key={item.path}
              to={item.path}
            >
              {item.name}
            </NavLink>
          ))}
        </ul>
        <div className="flex items-center lg:gap-5">
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <div className="flex justify-center items-center relative cursor-pointer">
                <CiShoppingCart size={40} className="text-baseColor" />
                <p className="absolute w-full mx-auto text-center font-bold pl-1 text-baseColor text-xs">
                  {cart?.length || 0}
                </p>
              </div>
            </SheetTrigger>
            <SheetContent
              aria-labelledby="cart-sheet-title"
              className="w-full flex flex-col"
            >
              <SheetHeader>
                <div className="flex justify-between items-center pt-4 px-2">
                  <SheetTitle className="text-white" id="cart-sheet-title">
                    Total products
                  </SheetTitle>
                  <SheetTitle className="text-white">
                    {cart?.length || 0}
                  </SheetTitle>
                </div>
                <SheetDescription>
                  Your selection product is below.
                </SheetDescription>
                <hr />
              </SheetHeader>
              <div className="h-full overflow-y-auto scroll-smooth flex-grow no-scrollbar">
                <MyCart />
              </div>
              <SheetFooter>
                <Button className="w-full cursor-pointer" disabled={!cart?.length}>
                  <Link to="/checkout" className="w-full flex justify-center items-center gap-2">
                    Checkout <MdOutlineShoppingCartCheckout />
                  </Link>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <div className=" lg:flex items-center gap-5">
            {user && user?.email ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-[3px] p-[1px] border-baseColor bg-background2 overflow-hidden">
                        <img
                          src={
                            user?.photoURL ||
                            "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
                          }
                          alt="Profile Picture"
                        />
                      </div>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Link to="/dashboard/overview">
                          <DropdownMenuItem className="cursor-pointer">
                            Dashboard
                            <DropdownMenuShortcut>
                              <LayoutDashboard />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                    </>

                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link to="my-profile">
                        <DropdownMenuItem className="cursor-pointer">
                          Profile
                          <DropdownMenuShortcut>
                            <User />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="cursor-pointer"
                    >
                      Log out
                      <DropdownMenuShortcut>
                        <LogOut />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-5">
                <NavLink
                  to="/auth/login"
                  className="uppercase font-bold text-xl tracking-[2px] bg-transparent border-2  text-center px-3 py-2 border-baseColor hover:text-white hover:bg-baseColor transition duration-200 rounded-md text-baseColor"
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
