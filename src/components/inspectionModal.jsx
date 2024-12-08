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
import moment from "moment";

const InspectionModal = ({ title, size, open, handleClose, data }) => {
  const { toPDF, targetRef } = usePDF({ filename: "ris.pdf" });

  return (
    <SemModal title={title} size={size} open={open} handleClose={handleClose}>
      <div ref={targetRef} className="container mx-auto p-2">
        <h1 className="w-full flex justify-end items-center mb-10">
          Appendix: 62{" "}
        </h1>{" "}
        <div className="wrapper flex justify-center items-center flex-col mb-10">
          <h1 className="font-bold text-center text-3xl uppercase">
            Inspection & Acceptance Report
          </h1>
        </div>
        <div className="flex">
          <div className="basis-8/12">
            <h1>Entity Name: Camarines Norte State College</h1>
          </div>
          <div className="basis-4/12">
            <h1>Fund Cluster: {data.fundCluster}</h1>
          </div>
        </div>
        <div className="border border-slate-950 flex">
          <div className="basis-8/12 border border-slate-950 p-2">
            <div className="flex flex-col ml-3">
              <h1>Supplier: {data.supplier}</h1>
              <h1>PO No. {data.poNumber} </h1>
              <h1>Requestioning Office/ Dept CNSC </h1>
              <h1>Responsibility Center Code: CNSC </h1>
            </div>
          </div>
          <div className="basis-4/12 border border-slate-950">
            <div className="flex flex-col ml-3">
              <h1>LAR NO. </h1>
              <h1>Date: {moment(Date().toString()).format("LLL")}</h1>
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
          <div className="basis-full border p-10 border-slate-950 ">
            <h1 className="font-bold mb-5 uppercase">Inspection</h1>
            <h1>Alma C. Furuc</h1>
            <h1 className="border-t-2 border-slate-950"></h1>
            Inspection Officer / Administrative Aide IV
          </div>
          {/* <div className="basis-6/12 border p-10 border-slate-950 ">
            <h1 className="font-bold mb-5 uppercase">Acceptance</h1>
            <h1>Juan Dela Cruz</h1>
            <h1 className="border-t-2 border-slate-950">
              Inspection Officer / Inspection Committee
            </h1>
          </div> */}
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

export default InspectionModal;
