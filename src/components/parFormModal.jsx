import { Button } from "flowbite-react";
import RisFormDummyRow from "./risFormDummyRow";
import SemModal from "./semModal";
import RisFormRow from "./risFormRow";
import useAddTransaction from "../hooks/useAddTransaction";
import { useSemStore } from "../zustand/store";
import IcsFormRowDummy from "./icsFormRowDummy";
import moment from "moment";
import ParFormDummyRow from "./parFormDummyRow";
import { HiDownload } from "react-icons/hi";
import { usePDF } from "react-to-pdf";

const ParFormModal = ({
  title,
  size,
  open,
  handleClose,
  data,
  viewOnly,
  currentMode,
}) => {
  const { addTransaction, addSupplyTransaction, addEquipmentTransaction } =
    useAddTransaction();
  const { currentUser } = useSemStore();

  const firebaseDate = data?.reviewDate;
  const date = moment(firebaseDate?.toDate()).format("LLL");

  const { toPDF, targetRef } = usePDF({ filename: "par.pdf" });

  return (
    <SemModal title={title} size={size} open={open} handleClose={handleClose}>
      <div ref={targetRef} className="container mx-auto p-2">
        <div className="wrapper mb-10">
          <h1 className="font-bold text-center text-2xl mb-10">
            PROPERTY ACKNOWLEDGMENT RECEIPT{" "}
          </h1>
          <div className="flex justify-between items-center mt-2">
            <h1>Entity Name : CAMARINES NORTE STATE COLLEGE </h1>
            <h1>PAR No.: _____</h1>
          </div>
        </div>

        <div className="border border-slate-950 flex border-t-0">
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Quantity </h1>
          </div>
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Unit</h1>
          </div>

          <div className="basis-4/12 border border-slate-950 p-2 text-center">
            <h1>Description</h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Property Number.</h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Date Acquired</h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Amount</h1>
          </div>
        </div>

        {data?.item.map((item) => {
          console.log(item);
          return (
            <div className="border border-slate-950 flex border-t-0">
              <div className="basis-1/12 border border-slate-950 p-2 text-center">
                <h1>1 </h1>
              </div>
              <div className="basis-1/12 border border-slate-950 p-2 text-center">
                <h1>{item.unit}</h1>
              </div>

              <div className="basis-4/12 border border-slate-950 p-2 text-center">
                <h1>{item.description}</h1>
              </div>
              <div className="basis-2/12 border border-slate-950 p-2 text-center">
                <h1>{item.propertyNumber}</h1>
              </div>
              <div className="basis-2/12 border border-slate-950 p-2 text-center">
                <h1>{date}</h1>
              </div>
              <div className="basis-2/12 border border-slate-950 p-2 text-center">
                <h1>{item.unitCost}</h1>
              </div>
            </div>
          );
        })}

        <ParFormDummyRow />

        <div className="border border-slate-950 p-10 text-center">
          <div className="flex">
            <div className="basis-6/12">
              <div className="wrapper">
                <h1>Received from: {data?.reviewBy}</h1>
                <h1 className="font-bold">Admin Officer</h1>
                <h1>{date}</h1>
              </div>
            </div>
            <div className="basis-6/12">
              <div className="wrapper">
                <h1>
                  Received By:{" "}
                  {currentUser.firstName + " " + currentUser.lastName}
                </h1>
                <h1 className="font-bold">
                  {currentUser.office} | Deparment Supply Coordinator
                </h1>
                <h1>{date}</h1>
              </div>
            </div>
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

export default ParFormModal;
