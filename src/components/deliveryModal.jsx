import { Button } from "flowbite-react";
import RisFormDummyRow from "./risFormDummyRow";
import SemModal from "./semModal";
import RisFormRow from "./risFormRow";
import useAddTransaction from "../hooks/useAddTransaction";
import { useSemStore } from "../zustand/store";
import { toast } from "react-toastify";
import { HiDownload } from "react-icons/hi";
import { usePDF } from "react-to-pdf";
import PurchaseOrderRowDummy from "./purchaseOrderDummyRow";

const DeliveryModal = ({ title, size, open, handleClose, data }) => {
  const { toPDF, targetRef } = usePDF({ filename: "ris.pdf" });

  return (
    <SemModal title={title} size={size} open={open} handleClose={handleClose}>
      <div ref={targetRef} className="container mx-auto p-2">
        <div className="wrapper flex justify-center items-center flex-col">
          <h1 className="font-bold text-center text-2xl uppercase">
            {data.supplier}
          </h1>
          <p className="border-t-2 border-black px-10 my-3">Supplier</p>
        </div>
        <div className="wrapper flex justify-center items-center flex-col">
          <h1 className="font-bold text-center text-2xl uppercase"></h1>
          <p className="border-t-2 border-black px-10 my-3">Address</p>
        </div>
        <div className="wrapper flex justify-center items-center flex-col">
          <h1 className="font-bold text-center text-2xl uppercase"></h1>
          <p className="border-t-2 border-black px-10 my-3">TIN #</p>
        </div>
        <div className="wrapper flex justify-center items-center flex-col mb-10">
          <h1 className="font-bold text-center text-4xl uppercase">
            Delivery Receipts
          </h1>
        </div>
        <div className="border border-slate-950 flex">
          <div className="basis-8/12 border border-slate-950 p-2">
            <div className="flex flex-col ml-3">
              <h1>Delivered to: </h1>
              <h1>Address: </h1>
              <h1>Delivered By: </h1>
            </div>
          </div>
          <div className="basis-4/12 border border-slate-950">
            <div className="flex flex-col ml-3">
              <h1>P.0 No: {data.poNumber} </h1>
              <h1>Date:</h1>
              <h1>Terms: </h1>
            </div>
          </div>
        </div>

        <div className="border border-slate-950 flex border-t-0">
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Stock/Property No. </h1>
          </div>

          <div className="basis-6/12 border border-slate-950 p-2 text-center">
            <h1>Description</h1>
          </div>

          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Unit</h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Quantity</h1>
          </div>
        </div>

        {data.items?.map((item) => {
          return (
            <div className="border border-slate-950 flex border-t-0">
              <div className="basis-2/12 border border-slate-950 p-2 text-center">
                <h1 className={`${false ? "opacity-0" : ""}`}>{item.id} </h1>
              </div>
              <div className="basis-6/12 border border-slate-950 p-2 text-center">
                <h1 className={`${false ? "opacity-0" : ""}`}>
                  {item.description}
                </h1>
              </div>
              <div className="basis-2/12 border border-slate-950 p-2 text-center">
                <h1 className={`${false ? "opacity-0" : ""}`}>{item.unit}</h1>
              </div>

              <div className="basis-2/12 border border-slate-950 p-2 text-center">
                <h1 className={`${false ? "opacity-0" : ""}`}>
                  {item.quantity}
                </h1>
              </div>
            </div>
          );
        })}

        <PurchaseOrderRowDummy />

        <div className="border flex border-slate-950 text-center">
          <div className="basis-6/12 border p-10 border-slate-950 ">
            <h1>Signature Over Printed Name</h1>
            <h1 className="border-t-2 border-slate-950">
              Dealer Representative
            </h1>
          </div>
          <div className="basis-6/12 border p-10 border-slate-950 ">
            <h1>Signature Over Printed Name</h1>
            <h1 className="border-t-2 border-slate-950">Supply Officer</h1>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          toPDF();
        }}
        className="w-full mt-5 py-3 mr-5"
      >
        Download <HiDownload className="mx-3" size={20} />
      </Button>
    </SemModal>
  );
};

export default DeliveryModal;
