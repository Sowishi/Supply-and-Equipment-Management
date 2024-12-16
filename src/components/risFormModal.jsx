import React, { useState } from "react";
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

  const [purpose, setPurpose] = useState("");

  return (
    <SemModal title={title} size={size} open={open} handleClose={handleClose}>
      <div ref={targetRef} className="container mx-auto p-2">
        <div className="wrapper">
          <h1 className="w-full flex justify-end items-center mb-10">
            Appendix: 63
          </h1>
          <h1 className="font-bold text-center text-2xl">
            REQUISITION AND ISSUE SLIP
          </h1>
          <div className="flex justify-between items-center mt-2">
            <h1>Entity Name :CNSC</h1>
            <div className="flex flex-col">
              <h1>Fund Cluster: {data?.[0]?.fundCluster || "--"}</h1>
            </div>
          </div>
        </div>
        <div className="border border-slate-950 flex">
          <div className="basis-8/12 border border-slate-950 p-2">
            <div className="flex flex-col ml-3">
              <h1>Division: OVPRE</h1>
              <h1>Office: FTO</h1>
            </div>
          </div>
          <div className="basis-4/12 border border-slate-950">
            <div className="flex flex-col ml-3">
              <h1>Responsibility Center Code: CNSC-COENG</h1>
              <h1>RIS No.: _______________</h1>
            </div>
          </div>
        </div>
        {/* Rows for Requisition */}
        {data?.item?.map((item) => (
          <RisFormRow
            key={item.docID}
            stockNo={item.id}
            unit={item.unit}
            description={item.description}
            rQuantity={item.borrowedQuantity || 1}
            stockAvailable={item.quantity !== 0}
            iQuantity={item.quantity}
            remarks={item.remarks}
          />
        ))}
        <RisFormDummyRow />
        <div className="border border-slate-950 p-10">
          <label htmlFor="purpose" className="block mb-2 font-semibold">
            Purpose:
          </label>
          {data?.purpose ? (
            <textarea
              id="purpose"
              rows="3"
              className="w-full border rounded p-2 "
              placeholder="Enter the purpose for this requisition..."
              value={data.purpose}
              disabled
            ></textarea>
          ) : (
            <textarea
              id="purpose"
              rows="3"
              className="w-full border rounded p-2"
              placeholder="Enter the purpose for this requisition..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            ></textarea>
          )}
        </div>
      </div>
      {/* Buttons */}
      {viewOnly && currentMode === "Supply" && (
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
            color="success"
            onClick={() => {
              addSupplyTransaction(data, currentUser, purpose);
              setCartModal(false);
              handleClose();
              toast.success("Successfully added transaction");
              setCartSupply([]);
            }}
            className="w-full mt-5 py-3"
          >
            Submit Supply RIS
          </Button>
        </div>
      )}
      {viewOnly && currentMode === "Equipment" && (
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
            color="success"
            onClick={() => {
              addEquipmentTransaction({ data, purpose }, currentUser);
              setCartModal(false);
              handleClose();
              toast.success("Successfully added transaction");
              setCartEquipment([]);
            }}
            className="w-full mt-5 py-3"
          >
            Submit Equipment RIS
          </Button>
        </div>
      )}
    </SemModal>
  );
};

export default RisFormModal;
