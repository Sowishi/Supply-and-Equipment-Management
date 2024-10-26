import { useState } from "react";
import DashboardHeader from "../components/dashboardHeader";
import SemSidebar from "../components/semSidebar";
import SemModal from "../components/semModal";
import { Button, Tabs } from "flowbite-react";
import { HiOutlineTable, HiViewGrid } from "react-icons/hi";
import Equipment from "../pages/equipment";
import { useSemStore } from "../zustand/store";
import NoData from "../components/noData";
import useAddTransaction from "../hooks/useAddTransaction";
import { toast } from "react-toastify";
import RisFormRow from "../components/risFormRow";
import RisFormDummyRow from "../components/risFormDummyRow";
import RisFormModal from "../components/risFormModal";

const DashboardLayout = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [risForm, setRisForm] = useState(false);
  const [currentMode, setCurrentMode] = useState("Supply");

  const {
    cartSupply,
    cartEquipment,
    currentUser,
    setCartEquipment,
    setCartSupply,
  } = useSemStore();

  const isSupplyCartEmpty = cartSupply.length <= 0;
  const isEquipmentCartEmpty = cartEquipment.length <= 0;

  return (
    <div className="w-full min-h-screen bg-slate-950 pb-10">
      <SemModal
        dark={true}
        title={`Your Item Cart`}
        size={"xxl"}
        open={cartModal}
        handleClose={() => setCartModal(false)}
      >
        <div className="container">
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
                <Supply cart={true} />
              )}
              <div className="w-full flex flex-row mt-20">
                {/* <Button color={"success"} className="w-full py-2 mx-3">
                  Add Unique
                </Button> */}
                <Button
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
                <Equipment cart={true} />
              )}
              <div className="w-full flex flex-row mt-20">
                {/* <Button color={"success"} className="w-full py-2 mx-3">
                  Add Unique
                </Button> */}
                <Button
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
