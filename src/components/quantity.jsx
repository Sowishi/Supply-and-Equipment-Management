import { Button } from "flowbite-react";
import { useState } from "react";
import SemInput from "./semInput";

const Quantity = ({ item, handleDecrement, handleIncrement }) => {
  return (
    <div className="flex justify-center items-center border border-red-500">
      <Button
        className="mx-3"
        disabled={item.borrowedQuantity == 1}
        onClick={() => handleDecrement(item)}
      >
        -
      </Button>

      <SemInput
        value={item.borrowedQuantity}
        event={(event) => (item.borrowedQuantity = event.target.value)}
      />
      <Button className="mx-3" onClick={() => handleIncrement(item)}>
        +
      </Button>
    </div>
  );
};

export default Quantity;
