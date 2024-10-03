import { HiMenu, HiShoppingCart } from "react-icons/hi";
import SemTitle from "./semTitle";
import { useSemStore } from "../zustand/store";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { Badge, Tooltip } from "flowbite-react";

const DashboardHeader = ({ handleOpenSidebar, setCartModal }) => {
  const { currentUser, cartSupply, cartEquipment } = useSemStore();
  const isAdmin = currentUser.role == "Admin";
  const totalCartLength = cartSupply.length + cartEquipment.length;
  return (
    <div className="header-wrapper flex items-center justify-between py-10 lg:mb-0 p-5 lg:p-8 lg:mx-10">
      <HiMenu
        className="cursor-pointer mr-5"
        onClick={handleOpenSidebar}
        size={30}
        color="white"
      />

      <div className="user-wrapper  flex-row flex items-center">
        <div className="wrapper mr-10">
          <p className="text-blue-500 text-xs lg:text-sm">Logged in as</p>
          <h1 className="text-white text-sm lg:text-xl">
            {currentUser?.firstName} {currentUser?.lastName} -{" "}
            <span className="font-bold">{currentUser?.role}</span>{" "}
          </h1>
          <p className="text-blue-300 font-bold mt-1">{currentUser?.office}</p>
        </div>
        {isAdmin ? (
          <Tooltip content={`Email used: ${currentUser?.email}`}>
            <FaUserCircle size={30} color="white" />
          </Tooltip>
        ) : (
          <Tooltip content={"Your item cart"}>
            <div className="flex cursor-pointer">
              <HiShoppingCart
                onClick={() => setCartModal(true)}
                size={30}
                color="white"
              />
              <Badge>{totalCartLength}</Badge>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
