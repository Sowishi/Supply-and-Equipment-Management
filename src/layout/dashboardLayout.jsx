import { useState } from "react";
import DashboardHeader from "../components/dashboardHeader";
import SemSidebar from "../components/semSidebar";
import SemModal from "../components/semModal";
import { Alert, Button, Tabs } from "flowbite-react";
import { HiOutlineTable, HiViewGrid } from "react-icons/hi";
import Equipment from "../pages/equipment";
import { useSemStore } from "../zustand/store";
import NoData from "../components/noData";
import useAddTransaction from "../hooks/useAddTransaction";
import { toast } from "react-toastify";
import RisFormRow from "../components/risFormRow";
import RisFormDummyRow from "../components/risFormDummyRow";
import RisFormModal from "../components/risFormModal";
import cn from "../assets/cnsc front.jpeg";
import { SupplyTable } from "../components/supplyTable";
import { EquipmentTable } from "../components/equipmentTable";
import useUpdateUser from "../hooks/useUpdateUser";

const DashboardLayout = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [risForm, setRisForm] = useState(false);
  const [currentMode, setCurrentMode] = useState("Supply");
  const [error, setError] = useState(false);
  const [errorEquipment, setErrorEquipment] = useState(false);
  const {
    cartSupply,
    cartEquipment,
    currentUser,
    setCartEquipment,
    setCartSupply,
  } = useSemStore();

  const isSupplyCartEmpty = cartSupply.length <= 0;
  const isEquipmentCartEmpty = cartEquipment.length <= 0;

  const hasZeroQuantityEquipment = () => {
    return cartEquipment?.some(
      (item) =>
        item.borrowedQuantity === 0 || item.borrowedQuantity === undefined
    );
  };

  const hasZeroQuantity = () => {
    return cartSupply?.some(
      (item) =>
        item.borrowedQuantity === 0 || item.borrowedQuantity === undefined
    );
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${cn})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full min-h-screen bg-slate-950 pb-10"
    >
      {/* Cart Modal */}
      <SemModal
        dark={true}
        title={`Your Item Cart`}
        size={"7xl"}
        open={cartModal}
        handleClose={() => setCartModal(false)}
      >
        <div className="container mx-auto">
          <Tabs variant="pills" className="mx-5 mb-5">
            <Tabs.Item
              onClick={() => setCurrentMode("Supply")}
              active
              title="Supply"
              icon={HiOutlineTable}
            >
              {isSupplyCartEmpty ? (
                <NoData title={"Your cart is empty try addding one."} />
              ) : (
                <SupplyTable
                  setError={setError}
                  error={error}
                  data={cartSupply}
                  isCart={true}
                />
              )}
              <div className="w-full flex flex-col items-center justify-center mt-20">
                {error && (
                  <Alert color="failure" className="mb-10">
                    <span className="font-medium">Error</span>The borrowing
                    limit has been reached; please adjust your selection.
                  </Alert>
                )}
                <Button
                  disabled={error || hasZeroQuantity()}
                  onClick={() => {
                    setCurrentMode("Supply");
                    setRisForm(true);
                  }}
                  className="w-full py-2 mx-3"
                >
                  Finalize Supply
                </Button>
              </div>
            </Tabs.Item>
            <Tabs.Item
              onClick={() => setCurrentMode("Equipment")}
              title="Equipment"
              icon={HiViewGrid}
            >
              {isEquipmentCartEmpty ? (
                <NoData title={"Your cart is empty try addding one."} />
              ) : (
                <EquipmentTable
                  setErrorEquipment={setErrorEquipment}
                  data={cartEquipment}
                  isCart={true}
                />
              )}
              <div className="w-full flex flex-col justify-center items-center mt-20">
                {/* <Button color={"success"} className="w-full py-2 mx-3">
                  Add Unique
                </Button> */}
                {errorEquipment && (
                  <Alert color="failure" className="mb-10">
                    <span className="font-medium">Error</span>The borrowing
                    limit has been reached; please adjust your selection.
                  </Alert>
                )}
                <Button
                  disabled={errorEquipment || hasZeroQuantityEquipment()}
                  onClick={() => {
                    setCurrentMode("Equipment");
                    setRisForm(true);
                  }}
                  className="w-full py-2 mx-3"
                >
                  Finalize Equipment
                </Button>
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </SemModal>
      <RisFormModal
        viewOnly={true}
        title={`RIS Form`}
        size={"6xl"}
        open={risForm}
        handleClose={() => setRisForm(false)}
        data={currentMode == "Supply" ? cartSupply : cartEquipment}
        currentMode={currentMode}
        setCartModal={setCartModal}
      />

      <SemSidebar isOpen={isOpen} handleClose={() => setOpen(false)} />
      <DashboardHeader
        setCartModal={setCartModal}
        handleOpenSidebar={() => setOpen(true)}
      />
      <div className="w-full px-0 lg:px-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
