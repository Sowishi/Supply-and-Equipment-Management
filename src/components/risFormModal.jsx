import { Button } from "flowbite-react";
import RisFormDummyRow from "./risFormDummyRow";
import SemModal from "./semModal";
import RisFormRow from "./risFormRow";
import useAddTransaction from "../hooks/useAddTransaction";
import { useSemStore } from "../zustand/store";
import { toast } from "react-toastify";
import { HiDownload } from "react-icons/hi";
import { usePDF } from "react-to-pdf";

const RisFormModal = ({
  title,
  size,
  open,
  handleClose,
  data,
  viewOnly,
  currentMode,
  setCartModal,
}) => {
  const { addTransaction, addSupplyTransaction, addEquipmentTransaction } =
    useAddTransaction();
  const { currentUser, setCartSupply, setCartEquipment } = useSemStore();
  const { toPDF, targetRef } = usePDF({ filename: "ris.pdf" });

  return (
    <SemModal title={title} size={size} open={open} handleClose={handleClose}>
      <div ref={targetRef} className="container mx-auto p-2">
        <div className="wrapper">
          <h1 className="font-bold text-center text-2xl">
            REQUISITION AND ISSUE SLIP{" "}
          </h1>
          <div className="flex justify-between items-center mt-2">
            <h1>Entity Name :CNSC </h1>
            <h1>Fund Cluster : 07 - Trust Receipts fund</h1>
          </div>
        </div>
        <div className="border border-slate-950 flex">
          <div className="basis-8/12 border border-slate-950 p-2">
            <div className="flex flex-col ml-3">
              <h1>Division: OVPRE </h1>
              <h1>Office: FTO </h1>
            </div>
          </div>
          <div className="basis-4/12 border border-slate-950">
            <div className="flex flex-col ml-3">
              <h1>Responsibility Center Code: ___________</h1>
              <h1>RIS No.: _____</h1>
            </div>
          </div>
        </div>
        <div className="border border-slate-950 flex border-t-0">
          <div className="basis-6/12 border border-slate-950 p-2 text-center">
            <h1>Requisition </h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Stock Available?</h1>
          </div>
          <div className="basis-4/12 border border-slate-950 p-2 text-center">
            <h1>Issue</h1>
          </div>
        </div>
        <div className="border border-slate-950 flex border-t-0">
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Stock No. </h1>
          </div>
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Unit</h1>
          </div>
          <div className="basis-3/12 border border-slate-950 p-2 text-center">
            <h1>Description</h1>
          </div>

          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Quantity</h1>
          </div>
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Yes</h1>
          </div>
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>No</h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Quantity</h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Remarks</h1>
          </div>
        </div>
        {data?.map((item) => {
          return (
            <RisFormRow
              key={item.docID}
              stockNo={item.id}
              unit={item.unit}
              decription={item.description}
              rQuantity={item.borrowedQuantity ? item.borrowedQuantity : 1}
              stockAvailable={item.quantity !== 0 ? true : false}
              iQuantity={item.quantity}
              remarks={item.remarks}
            />
          );
        })}

        <RisFormDummyRow />
        <div className="border border-slate-950 p-10 text-center">
          <h1>
            Purpose: Other supplies and materials to be used for Survey,
            Research, Exploration and Development expenses.{" "}
          </h1>
        </div>
      </div>
      {viewOnly && currentMode == "Supply" && (
        <div className="flex">
          <Button
            onClick={() => {
              toPDF();
            }}
            className="w-full mt-5 py-3 mr-5"
          >
            Download <HiDownload className="mx-3" size={20} />
          </Button>
          <Button
            color={"success"}
            onClick={() => {
              addSupplyTransaction(data, currentUser);
              setCartModal(false);
              handleClose();
              toast.success("Succesfully added transaction");
              setCartSupply([]);
            }}
            className="w-full mt-5 py-3"
          >
            Submit Supply RIS
          </Button>
        </div>
      )}
      {viewOnly && currentMode == "Equipment" && (
        <div className="flex">
          <Button
            onClick={() => {
              toPDF();
            }}
            className="w-full mt-5 py-3 mr-5"
          >
            Download <HiDownload className="mx-3" size={20} />
          </Button>
          <Button
            color={"success"}
            onClick={() => {
              addEquipmentTransaction(data, currentUser);
              setCartModal(false);
              handleClose();
              toast.success("Succesfully added transaction");
              setCartEquipment([]);
            }}
            className="w-full mt-5 py-3"
          >
            Submit Equipment RIS
          </Button>
        </div>
      )}
      {!viewOnly && (
        <Button
          onClick={() => {
            toPDF();
          }}
          className="w-full mt-5 py-3 mr-5"
        >
          Download <HiDownload className="mx-3" size={20} />
        </Button>
      )}
    </SemModal>
  );
};

export default RisFormModal;
