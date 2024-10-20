import { HiOutlineTable } from "react-icons/hi";
import ContentHeader from "../components/contentHeader";
import { useState } from "react";
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
import { useSemStore } from "../zustand/store";
import AddSupplyModal from "../components/addSupplyModal";
import RisFormModal from "../components/risFormModal";
import PurchaseOrderModal from "../components/purchaseOrderModal";

const Supply = ({ cart }) => {
  //State

  const [supplyModal, setSupplyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [forms, setForms] = useState(SUPPLY_DEFAULT_VALUE);
  const [search, setSearch] = useState("");

  // Hooks

  const { addSupply } = useAddSupply();
  const { deleteSupply } = useDeleteSupply();
  const { updateSupply } = useUpdateSupply();
  const { data, loading } = useGetSupply();
  const { cartSupply } = useSemStore();

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

  const query = data.filter((item) => {
    const itemName = item?.name.toLowerCase();
    const itemSearch = search?.toLowerCase();
    if (itemName.startsWith(itemSearch)) {
      return item;
    }
  });

  return (
    <>
      {/* SUPPLY MODAL */}
      <AddSupplyModal
        size="5xl"
        title={isUpdate ? "Update Supply" : "Add Supply"}
        open={supplyModal}
        handleClose={() => setSupplyModal(false)}
        forms={forms}
        handleSubmit={handleSubmit}
        handleUpdateForm={handleUpdateForm}
        isUpdate={isUpdate}
      />
      <ConfirmationModal
        open={deleteModal}
        event={handleDeleteSupply}
        handleClose={() => setDeleteModal(false)}
      />

      <PurchaseOrderModal title={`RIS Form`} size={"6xl"} open={true} />

      <div className="wrapper p-0 lg:p-5">
        <ContentHeader
          cart={cart}
          setSearch={setSearch}
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
            data={cart ? cartSupply : query}
            cart={cart}
          />
        )}
      </div>
    </>
  );
};

export default Supply;
