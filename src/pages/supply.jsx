import { HiOfficeBuilding, HiOutlineTable, HiViewGrid } from "react-icons/hi";
import ContentHeader from "../components/contentHeader";
import DashboardLayout from "../layout/dashboardLayout";
import SemModal from "../components/semModal";
import SemInput from "../components/semInput";
import { useState } from "react";
import { Button, Tabs } from "flowbite-react";
import useAddSupply from "../hooks/useAddSupply";
import { toast } from "react-toastify";
import useGetSupply from "../hooks/useGetSupply";
import { SemSupplyTable } from "../components/semSupplyTable";
import { ConfirmationModal } from "../components/confirmationModal";
import useDeleteSupply from "../hooks/useDeleteSupply";
import useUpdateSupply from "../hooks/useUpdateSupply";
import Loading from "../components/loading";
import NoData from "../components/noData";
import { SUPPLY_DEFAULT_VALUE } from "../utils/constant";

const Supply = () => {
  //State

  const [supplyModal, setSupplyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [forms, setForms] = useState(SUPPLY_DEFAULT_VALUE);

  // Hooks

  const { addSupply } = useAddSupply();
  const { deleteSupply } = useDeleteSupply();
  const { updateSupply } = useUpdateSupply();
  const { data, loading } = useGetSupply();

  // Local Fucntion

  const handleUpdateForm = (event) => {
    const { name, value } = event.target;
    const newForms = { ...forms, [name]: value };
    setForms(newForms);
  };

  const handleSubmit = () => {
    if (!isUpdate) {
      addSupply(forms);
      setSupplyModal(false);
      toast.success("Supply added successfully.");
    } else {
      updateSupply(forms);
      setSupplyModal(false);
      toast.success("Supply updated successfully.");
    }
  };

  const handleDeleteSupply = () => {
    deleteSupply(selectedSupply.id);
    setDeleteModal(false);
    toast.success("Deleted successfully.");
  };

  const handleSelectedSupplyUpdate = (data) => {
    setForms(data);
    setIsUpdate(true);
  };

  const handleAddingSupply = () => {
    setSupplyModal(true);
    setIsUpdate(false);
    setForms(SUPPLY_DEFAULT_VALUE);
  };

  return (
    <>
      {/* SUPPLY MODAL */}
      <SemModal
        size="5xl"
        title={isUpdate ? "Update Supply" : "Add Supply"}
        open={supplyModal}
        handleClose={() => setSupplyModal(false)}
      >
        <div className="flex flex-row">
          <div className="basis-6/12 mx-3">
            <SemInput
              value={forms.name}
              color={"gray"}
              name={"name"}
              label="Name"
              placeholder="Enter name"
              event={handleUpdateForm}
            />
            <SemInput
              value={forms.quantity}
              name={"quantity"}
              color={"gray"}
              label="Quantity"
              placeholder="Enter quantity"
              event={handleUpdateForm}
            />
            <SemInput
              value={forms.unit}
              name={"unit"}
              color={"gray"}
              label="Unit"
              placeholder="Enter unit"
              event={handleUpdateForm}
            />
            <SemInput
              value={forms.unitCost}
              name={"unitCost"}
              color={"gray"}
              label="Unit Cost"
              placeholder="Enter unit cost"
              event={handleUpdateForm}
            />
          </div>
          <div className="basis-6/12">
            <SemInput
              value={forms.description}
              name={"description"}
              color={"gray"}
              label="Description"
              placeholder="Enter description"
              event={handleUpdateForm}
            />
            <SemInput
              value={forms.estimatedUsefulLife}
              name={"estimatedUsefulLife"}
              color={"gray"}
              label="Estimated Useful Life"
              placeholder="Enter estimated useful life"
              event={handleUpdateForm}
            />
            <SemInput
              value={forms.inventoryNumber}
              name={"inventoryNumber"}
              color={"gray"}
              label="Inventory Number"
              placeholder="Enter inventory number"
              event={handleUpdateForm}
            />
          </div>{" "}
        </div>

        <Button
          onClick={handleSubmit}
          gradientMonochrome="info"
          className="w-full mt-5"
        >
          {isUpdate ? "Update Supply" : "Add Supply"}
        </Button>
      </SemModal>
      <ConfirmationModal
        open={deleteModal}
        event={handleDeleteSupply}
        handleClose={() => setDeleteModal(false)}
      />

      <div className="wrapper p-5">
        <ContentHeader
          title="Supply"
          Icon={HiOutlineTable}
          event={handleAddingSupply}
          tooltip={"Add supply to the system"}
        />

        {loading && <Loading />}

        {!loading && data.length <= 0 && (
          <NoData title={"There's no supply, please add one."} />
        )}

        {!loading && data.length >= 1 && (
          <SemSupplyTable
            handleSelectedSupplyUpdate={handleSelectedSupplyUpdate}
            setSupplyModal={setSupplyModal}
            setSelectedSupply={setSelectedSupply}
            setDeleteModal={setDeleteModal}
            data={data}
          />
        )}
      </div>
    </>
  );
};

export default Supply;
