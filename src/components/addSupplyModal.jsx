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
    price: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const output = { ...forms, [name]: value.toUpperCase() }; // Convert value to uppercase
    setForms(output);
  };

  const handleSubmit = () => {
    // Validate if price and quantity are numbers
    if (isNaN(forms.price) || isNaN(forms.quantity)) {
      alert("Please enter a valid number for Price and Quantity.");
      return;
    }

    // Generate a random 4-digit number for ID
    const randomId = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
    const cartSupplyCopy = [...cartSupply];
    cartSupplyCopy.push({ ...forms, id: randomId.toString() }); // Add random ID to the form data
    setCartSupply(cartSupplyCopy);
    handleClose();
  };

  return (
    <SemModal
      size={size}
      title={"Add Items"}
      open={open}
      handleClose={handleClose}
    >
      <SemInput
        event={handleChange}
        name={"description"}
        label={"Description"}
        value={forms.description}
      />
      <SemInput
        event={handleChange}
        name={"unit"}
        label={"Unit"}
        value={forms.unit}
      />
      <SemInput
        event={handleChange}
        name={"price"}
        label={"Price"}
        value={forms.price}
      />
      <SemInput
        event={handleChange}
        name={"quantity"}
        label={"Quantity"}
        value={forms.quantity}
      />
      <Button
        onClick={handleSubmit}
        className="w-full mt-5"
        gradientMonochrome="success"
      >
        <HiPlus color="white" className="mr-2 h-5 w-5" />
        Add Item
      </Button>
    </SemModal>
  );
};

export default AddSupplyModal;
