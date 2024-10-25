import { HiOutlineTable } from "react-icons/hi";
import ContentHeader from "../components/contentHeader";
import NoData from "../components/noData";
import Loading from "../components/semInput";
import { useState } from "react";
import { EQUIPMENT_DEFAULT_VALUE } from "../utils/constant";
import useAddEquipment from "../hooks/useAddEquipment";
import { toast } from "react-toastify";
import useGetEquipment from "../hooks/useGetEquipment";
import { SemEquipmentTable } from "../components/semEquipmentTable";
import { ConfirmationModal } from "../components/confirmationModal";
import useDeleteEquipment from "../hooks/useDeleteEquipment";
import useUpdateEquipment from "../hooks/useUpdateEquipment";
import { useSemStore } from "../zustand/store";
import AddEquipmentModal from "../components/addEquipmentModal";

const PurchaseOrder = ({ cart }) => {
  const [forms, setForms] = useState(EQUIPMENT_DEFAULT_VALUE);
  const [equipModal, setEquipModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEquip, setSelectedEquip] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [search, setSearch] = useState("");

  // HOOKS

  const { addEquipment } = useAddEquipment();
  const { updateEquipment } = useUpdateEquipment();
  const { deleteEquipment } = useDeleteEquipment();
  const { data, loading } = useGetEquipment();
  const { cartEquipment } = useSemStore();

  // LOCAL FUNCTION

  const handleUpdateForm = (event) => {
    const { name, value } = event.target;
    const newForms = { ...forms, [name]: value };
    setForms(newForms);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      updateEquipment(forms);
      toast.success("Equipment Updated.");
    } else {
      addEquipment(forms);
      toast.success("Equipment Added.");
    }

    setEquipModal(false);
  };

  const handleDeleteEquip = () => {
    deleteEquipment(selectedEquip.id);
    setDeleteModal(false);
  };

  const handleUpdateEquipForm = (item) => {
    setForms(item);
  };

  const query = data.filter((item) => {
    const itemName = item?.name.toLowerCase();
    const itemSearch = search?.toLowerCase();
    if (itemName.startsWith(itemSearch)) {
      return item;
    }
  });

  const handleAddingEquipment = () => {
    setEquipModal(true);
    setIsUpdate(false);
    setForms(EQUIPMENT_DEFAULT_VALUE);
  };

  return (
    <>
      <AddEquipmentModal
        size="5xl"
        title={isUpdate ? "Update Equipment" : "Add Equipment"}
        open={equipModal}
        handleClose={() => setEquipModal(false)}
        forms={forms}
        handleUpdateForm={handleUpdateForm}
        handleSubmit={handleSubmit}
        isUpdate={isUpdate}
      />

      <ConfirmationModal
        open={deleteModal}
        event={handleDeleteEquip}
        handleClose={() => setDeleteModal(false)}
      />

      <div className="wrapper p-0 lg:p-5">
        <ContentHeader
          cart={cart}
          setSearch={setSearch}
          title="Purchase Order"
          Icon={HiOutlineTable}
          tooltip={"Add equipmente to the system"}
          event={handleAddingEquipment}
        />

        {loading && <Loading />}

        {!loading && data.length <= 0 && (
          <NoData title={"There's no purchase order, please add one."} />
        )}

        {!loading && data.length >= 1 && (
          <SemEquipmentTable
            handleUpdateEquipForm={handleUpdateEquipForm}
            setIsUpdate={setIsUpdate}
            setEquipModal={setEquipModal}
            setSelectedEquip={setSelectedEquip}
            setDeleteModal={setDeleteModal}
            data={cart ? cartEquipment : query}
            cart={cart}
          />
        )}
      </div>
    </>
  );
};

export default PurchaseOrder;
