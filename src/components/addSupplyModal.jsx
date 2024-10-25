import { Button } from "flowbite-react";
import SemInput from "./semInput";
import SemModal from "./semModal";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";

const AddSupplyModal = ({
  size,
  open,
  handleClose,
  setCartSupply,
  cartSupply,
}) => {
  const [forms, setForms] = useState({
    id: "",
    description: "",
    unit: "",
    quantity: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const output = { ...forms, [name]: value };
    setForms(output);
  };

  const handleSubmit = () => {
    const cartSupplyCopy = [...cartSupply];
    cartSupplyCopy.push(forms);
    setCartSupply(cartSupplyCopy);
    handleClose();
  };

  return (
    <SemModal
      size={size}
      title={"Add Supply"}
      open={open}
      handleClose={handleClose}
    >
      <SemInput
        event={handleChange}
        name={"id"}
        label={"Stock Property Number"}
      />
      <SemInput
        event={handleChange}
        name={"description"}
        label={"Description"}
      />
      <SemInput event={handleChange} name={"unit"} label={"Unit"} />
      <SemInput event={handleChange} name={"quantity"} label={"Quantity"} />
      <Button
        onClick={handleSubmit}
        className="w-full mt-5"
        gradientMonochrome="success"
      >
        <HiPlus color="white" className="mr-2 h-5 w-5" />
        Add Supply
      </Button>
    </SemModal>
  );
};

export default AddSupplyModal;
