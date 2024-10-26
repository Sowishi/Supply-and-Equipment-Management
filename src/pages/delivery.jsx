import { HiOutlineTable, HiPlus } from "react-icons/hi";
import ContentHeader from "../components/contentHeader";
import { useState } from "react";
import { toast } from "react-toastify";
import { SemSupplyTable } from "../components/semSupplyTable";
import { ConfirmationModal } from "../components/confirmationModal";
import AddSupplyModal from "../components/addSupplyModal";
import SemModal from "../components/semModal";
import SemInput from "../components/semInput";
import { Button } from "flowbite-react";
import SemSelect from "../components/semSelect";
import useCrudRequest from "../hooks/useCrudRequest";
import { DeliveryTable } from "../components/deliveryTable";

const Delivery = ({ cart }) => {
  const { data } = useCrudRequest();

  return (
    <>
      <div className="wrapper p-0 lg:p-5">
        <div className="wrapper mb-5">
          <h1 className="text-white font-bold text-3xl">
            Delivery / Update Delivery Status
          </h1>
          <p className="text-white">
            This is where you can see the delivery receipts & update the
            delivery status
          </p>
        </div>

        <DeliveryTable data={data} />
      </div>
    </>
  );
};

export default Delivery;
