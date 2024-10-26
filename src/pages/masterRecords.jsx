import { Tabs } from "flowbite-react";
import DashboardLayout from "../layout/dashboardLayout";
import {
  HiAnnotation,
  HiOfficeBuilding,
  HiOutlineTable,
  HiViewGrid,
} from "react-icons/hi";
import Offices from "./offices";
import Equipment from "./equipment";
import { useSemStore } from "../zustand/store";
import { HiMagnifyingGlass } from "react-icons/hi2";
import PurchaseOrder from "./purchaseOrder";
import Delivery from "./delivery";

const MasterRecords = () => {
  const { currentUser } = useSemStore();
  const isAdmin = currentUser?.role == "Admin";

  return (
    <DashboardLayout>
      {/* DEPARTMENT */}

      {!isAdmin && (
        <div className="container mx-auto">
          <Tabs variant="pills" className="mx-5">
            <Tabs.Item active title="Supply" icon={HiOutlineTable}>
              <Supply />
            </Tabs.Item>
            <Tabs.Item title="Equipment" icon={HiViewGrid}>
              <Equipment />
            </Tabs.Item>
          </Tabs>
        </div>
      )}

      {/* ADMIN */}
      {isAdmin && (
        <div className="container mx-auto">
          <Tabs variant="pills" className="mx-5">
            <Tabs.Item title="Transaction" icon={HiAnnotation}>
              <PurchaseOrder />
            </Tabs.Item>
            <Tabs.Item title="Delivery" icon={HiAnnotation}>
              <Delivery />
            </Tabs.Item>
            <Tabs.Item title="Inspection" icon={HiMagnifyingGlass}></Tabs.Item>

            <Tabs.Item title="Equipments" icon={HiViewGrid}></Tabs.Item>
            <Tabs.Item title="Supplies" icon={HiMagnifyingGlass}></Tabs.Item>
            <Tabs.Item title="Office" icon={HiOfficeBuilding}>
              <Offices />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MasterRecords;
