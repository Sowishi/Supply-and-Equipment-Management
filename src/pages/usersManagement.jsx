import { Tabs } from "flowbite-react";
import DashboardLayout from "../layout/dashboardLayout";
import {
  HiAnnotation,
  HiMail,
  HiOfficeBuilding,
  HiOutlineTable,
  HiTruck,
  HiUserAdd,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";
import Offices from "./offices";
import Equipment from "./equipment";
import { useSemStore } from "../zustand/store";
import {
  HiArchiveBox,
  HiArchiveBoxArrowDown,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import PurchaseOrder from "./purchaseOrder";
import Delivery from "./delivery";
import Inspection from "./inspection";
import Supply from "./supply";
import EquipmentPage from "./equipmentPage";
import SupplyPage from "./SupplyPage";
import Signup from "./signup";
import useGetUsers from "../hooks/useGetUsers";
import { UsersTable } from "../components/usersTable";
import useDeleteUser from "../hooks/useDeleteUser";

const UsersManagement = () => {
  const { users } = useGetUsers();

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <Tabs variant="pills" className="mx-5">
          <Tabs.Item title="Users" icon={HiUsers}>
            <div className="wrapper mb-5">
              <h1 className="text-white font-bold text-3xl">
                Users Management
              </h1>
              <p className="text-white">This is where you manage your users</p>
            </div>
            <UsersTable data={users} />
          </Tabs.Item>
          <Tabs.Item title="Create User" icon={HiUserAdd}>
            <Signup />
          </Tabs.Item>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UsersManagement;
