import { Tabs } from "flowbite-react";
import DashboardLayout from "../layout/dashboardLayout";
import {
  HiAnnotation,
  HiMail,
  HiOfficeBuilding,
  HiOutlineTable,
  HiTruck,
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
              <SupplyPage isClient={true} />
            </Tabs.Item>
            <Tabs.Item title="Equipment" icon={HiViewGrid}>
              <EquipmentPage isClient={true} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}

      {/* ADMIN */}
      {isAdmin && (
        <div className="container mx-auto">
          <Tabs variant="pills" className="mx-5">
            <Tabs.Item title="Purchase Order" icon={HiAnnotation}>
              <PurchaseOrder />
            </Tabs.Item>
            <Tabs.Item title="Delivery" icon={HiTruck}>
              <Delivery />
            </Tabs.Item>
            <Tabs.Item title="Inspection" icon={HiMagnifyingGlass}>
              <Inspection />
            </Tabs.Item>

            <Tabs.Item title="Equipments" icon={HiViewGrid}>
              <EquipmentPage />
            </Tabs.Item>
            <Tabs.Item title="Supplies" icon={HiArchiveBoxArrowDown}>
              <SupplyPage />
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
