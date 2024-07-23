import { HiMenu, HiShoppingCart } from "react-icons/hi";
import SemTitle from "./semTitle";
import { useSemStore } from "../zustand/store";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { Badge, Tooltip } from "flowbite-react";

const DashboardHeader = ({ handleOpenSidebar }) => {
  const { currentUser } = useSemStore();
  const isAdmin = currentUser.role == "Admin";
  return (
    <div className="header-wrapper flex items-center justify-between p-8 lg:mx-10">
      <HiMenu
        className="cursor-pointer"
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
        </div>
        {isAdmin ? (
          <Tooltip content={`Email used: ${currentUser?.email}`}>
            <FaUserCircle size={30} color="white" />
          </Tooltip>
        ) : (
          <Tooltip content={"Your item cart"}>
            <div className="flex cursor-pointer">
              <HiShoppingCart size={30} color="white" />
              <Badge>2</Badge>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
