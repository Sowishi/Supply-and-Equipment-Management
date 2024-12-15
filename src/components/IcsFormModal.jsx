import { Button } from "flowbite-react";
import RisFormDummyRow from "./risFormDummyRow";
import SemModal from "./semModal";
import RisFormRow from "./risFormRow";
import useAddTransaction from "../hooks/useAddTransaction";
import { useSemStore } from "../zustand/store";
import IcsFormRowDummy from "./icsFormRowDummy";
import moment from "moment";
import { usePDF } from "react-to-pdf";
import { HiDownload } from "react-icons/hi";
import { useEffect, useState } from "react";

const IcsFormModal = ({
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
  const { toPDF, targetRef } = usePDF({ filename: "ics.pdf" });

  // User state management
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for user data

  useEffect(() => {
    const parseUser = async () => {
      try {
        const parsedUser = await JSON.parse(data?.currentUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user:", error);
      } finally {
        setLoading(false); // Set loading to false after data is processed
      }
    };

    if (data?.currentUser) {
      parseUser();
    } else {
      setLoading(false); // If no user data is available, stop loading
    }
  }, [data?.currentUser]); // Re-run the effect if `data.currentUser` changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state until user data is available
  }

  return (
    <SemModal title={title} size={size} open={open} handleClose={handleClose}>
      <div ref={targetRef} className="container mx-auto p-2">
        <h1 className="w-full flex justify-end items-center mb-10">
          Appendix: Annex A.3
        </h1>
        <div className="wrapper mb-10">
          <h1 className="font-bold text-center text-2xl mb-10">
            INVENTORY CUSTODIAN SLIP
          </h1>
          <div className="flex justify-between items-center mt-2">
            <div className="fle flex-col">
              <h1>Entity Name : CAMARINES NORTE STATE COLLEGE</h1>
              <h1>Fund Cluster: {data?.item[0]?.fundCluster || "--"}</h1>
            </div>
            <div className="flex flex-col">
              <h1>ICS No.: ________</h1>
            </div>
          </div>
        </div>
        <div className="border border-slate-950 flex border-t-0">
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Quantity</h1>
          </div>
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Unit</h1>
          </div>
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Unit Cost</h1>
          </div>
          <div className="basis-1/12 border border-slate-950 p-2 text-center">
            <h1>Total Cost</h1>
          </div>
          <div className="basis-4/12 border border-slate-950 p-2 text-center">
            <h1>Description</h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Inventory Item No.</h1>
          </div>
          <div className="basis-2/12 border border-slate-950 p-2 text-center">
            <h1>Estimated Useful Life</h1>
          </div>
        </div>
        {data?.item.map((item) => (
          <div
            className="border border-slate-950 flex border-t-0"
            key={item.id}
          >
            <div className="basis-1/12 border border-slate-950 p-2 text-center">
              <h1>{item.borrowedQuantity}</h1>
            </div>
            <div className="basis-1/12 border border-slate-950 p-2 text-center">
              <h1>{item.unit}</h1>
            </div>
            <div className="basis-1/12 border border-slate-950 p-2 text-center">
              <h1>₱{parseInt(item.price).toLocaleString()}</h1>
            </div>
            <div className="basis-1/12 border border-slate-950 p-2 text-center">
              <h1>
                ₱{" "}
                {parseInt(
                  item.borrowedQuantity * parseInt(item.price)
                ).toLocaleString()}
              </h1>
            </div>
            <div className="basis-4/12 border border-slate-950 p-2 text-center">
              <h1>{item.description}</h1>
            </div>
            <div className="basis-2/12 border border-slate-950 p-2 text-center">
              <h1>{item.id}</h1>
            </div>
            <div className="basis-2/12 border border-slate-950 p-2 text-center">
              <h1>---</h1>
            </div>
          </div>
        ))}
        <IcsFormRowDummy />
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
                <h1>Received By: {user?.firstName + " " + user?.lastName}</h1>
                <h1 className="font-bold">{user?.office}</h1>
                <h1>{date}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={() => toPDF()} className="w-full mt-5 py-3 mr-5">
        Download <HiDownload className="mx-3" size={20} />
      </Button>
    </SemModal>
  );
};

export default IcsFormModal;
