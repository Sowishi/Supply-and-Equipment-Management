import { Drawer, Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiFolder,
  HiInbox,
  HiLogout,
  HiOfficeBuilding,
  HiOutlineServer,
  HiOutlineTable,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiUsers,
  HiViewBoards,
  HiViewGrid,
} from "react-icons/hi";
import SemTitle from "./semTitle";
import { Link, useNavigate } from "react-router-dom";
import { HiReceiptPercent } from "react-icons/hi2";
import { useSemStore } from "../zustand/store";

const SemSidebar = ({ isOpen, handleClose }) => {
  const navigation = useNavigate();
  const { setCurrentUser, currentUser } = useSemStore();

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <SemTitle title={"Menu"} color={"black"} />

      <Drawer.Items className="mt-5">
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link to={"/transaction"}>
                <Sidebar.Item className="my-3" icon={HiOutlineServer}>
                  Transaction
                </Sidebar.Item>
              </Link>
              <Link to={"/master-records"}>
                <Sidebar.Item className="my-3" icon={HiFolder}>
                  Master Records
                </Sidebar.Item>
              </Link>
              {currentUser.role == "Admin" && (
                <Link to={"/users-management"}>
                  <Sidebar.Item className="my-3" icon={HiUsers}>
                    Users Management
                  </Sidebar.Item>
                </Link>
              )}
              <Sidebar.Item
                onClick={() => {
                  localStorage.removeItem("user");
                  setCurrentUser(null);
                  navigation("/");
                }}
                icon={HiLogout}
              >
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Drawer.Items>
    </Drawer>
  );
};

export default SemSidebar;
