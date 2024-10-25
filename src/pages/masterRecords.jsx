import { Tabs } from "flowbite-react";
import DashboardLayout from "../layout/dashboardLayout";
import {
  HiAnnotation,
  HiOfficeBuilding,
  HiOutlineTable,
  HiViewGrid,
} from "react-icons/hi";
import Offices from "./offices";
import Supply from "./supply";
import Equipment from "./equipment";
import { useSemStore } from "../zustand/store";
import { HiMagnifyingGlass } from "react-icons/hi2";
import PurchaseOrder from "./purhcaseOrder";

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
            <Tabs.Item active title="Supply" icon={HiOutlineTable}>
              <Supply />
            </Tabs.Item>
            <Tabs.Item title="Equipment" icon={HiViewGrid}>
              <Equipment />
            </Tabs.Item>

            <Tabs.Item title="Purchase Order" icon={HiAnnotation}>
              <PurchaseOrder />
            </Tabs.Item>
            <Tabs.Item title="Inspection" icon={HiMagnifyingGlass}>
              <Offices />
            </Tabs.Item>
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
