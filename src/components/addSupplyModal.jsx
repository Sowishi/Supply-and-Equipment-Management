import { Button } from "flowbite-react";
import SemInput from "./semInput";
import SemModal from "./semModal";

const AddSupplyModal = ({
  size,
  title,
  open,
  handleClose,
  forms,
  handleSubmit,
  handleUpdateForm,
  isUpdate,
}) => {
  return (
    <SemModal size={size} title={title} open={open} handleClose={handleClose}>
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
          <SemInput
            value={forms.supplier}
            name={"supplier"}
            color={"gray"}
            label="Supplier"
            placeholder="Enter Supplier"
            event={handleUpdateForm}
          />
        </div>{" "}
      </div>

      <Button
        onClick={handleSubmit}
        gradientMonochrome="info"
        className="w-full mt-5 py-2"
      >
        {isUpdate ? "Update Supply" : "Add Supply"}
      </Button>
    </SemModal>
  );
};

export default AddSupplyModal;
