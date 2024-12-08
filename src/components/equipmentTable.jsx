import {
  Button,
  Dropdown,
  Modal,
  Table,
  TextInput,
  Tooltip,
} from "flowbite-react";
import moment from "moment";
import { HiPlusCircle } from "react-icons/hi";
import { useSemStore } from "../zustand/store";
import SemInput from "./semInput";
import { useState } from "react";
import { toast } from "react-toastify";

export function EquipmentTable({ data, isClient, isCart, setErrorEquipment }) {
  const filterData = data.filter((item) => item.category === "Equipment");

  const { setCartEquipment, cartEquipment } = useSemStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleAddCart = (item) => {
    const cartEquipmentCopy = [...cartEquipment];
    cartEquipmentCopy.push(item);
    setCartEquipment(cartEquipmentCopy);
  };

  const handlelDeleteCart = (data) => {
    const cartEquipmentCopy = [...cartEquipment];
    const output = cartEquipmentCopy.filter(
      (item) => item.docID !== data.docID
    );
    setCartEquipment(output);
  };

  const handleIncrement = (data) => {
    const cartEquipmentCopy = [...cartEquipment];
    cartEquipmentCopy.map((item) => {
      if (item.docID === data.docID) {
        item.borrowedQuantity = (item.borrowedQuantity || 0) + 1;

        if (item.borrowedQuantity > data.quantity) {
          setErrorEquipment(true);
        } else {
          setErrorEquipment(false);
        }
      }
    });
    setCartEquipment(cartEquipmentCopy);
  };

  const handleDecrement = (data) => {
    const cartEquipmentCopy = [...cartEquipment];
    cartEquipmentCopy.map((item) => {
      if (item.docID === data.docID) {
        item.borrowedQuantity = (item.borrowedQuantity || 1) - 1;

        if (item.borrowedQuantity > data.quantity) {
          setErrorEquipment(true);
        } else {
          setErrorEquipment(false);
        }
      }
    });
    setCartEquipment(cartEquipmentCopy);
  };

  const handleQuantityChange = (e) => {
    const value = sanitizeInput(e.target.value);
    setQuantity(value);
    setError(value > selectedItem.quantity);
  };

  const sanitizeInput = (value) => {
    const sanitized = value.replace(/[^0-9]/g, ""); // Allow only numbers
    return sanitized === "" ? "" : Math.max(1, parseInt(sanitized, 10));
  };

  const handleAddToCart = () => {
    if (quantity > selectedItem.quantity) {
      setErrorMessage(true);
      toast.error("Request quantity exceeds the available stocks");
      return;
    }
    const updatedCart = [...cartEquipment];
    const itemToAdd = { ...selectedItem, borrowedQuantity: quantity };
    updatedCart.push(itemToAdd);
    setCartEquipment(updatedCart);
    setErrorMessage(false);
    setModalVisible(false);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setModalVisible(true);
  };

  return (
    <div className="overflow-x-auto">
      {data && (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell className="bg-gray-100 text-gray-800">
              Stock / Property No.
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-100 text-gray-800">
              Description
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-100 text-gray-800">
              Price
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-100 text-gray-800">
              Unit
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-100 text-gray-800">
              Quantity
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-100 text-gray-800">
              Supplier
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-100 text-gray-800">
              Date
            </Table.HeadCell>
            {isClient && (
              <Table.HeadCell className="bg-gray-100"></Table.HeadCell>
            )}
            {isCart && (
              <>
                <Table.HeadCell className="bg-gray-100"></Table.HeadCell>
                <Table.HeadCell className="bg-gray-100"></Table.HeadCell>
              </>
            )}
          </Table.Head>
          <Table.Body className="divide-y">
            {filterData.map((item, index) => {
              const date = moment(item?.createdAt?.toDate()).format("LLL");

              return (
                <Table.Row key={item.id}>
                  <Table.Cell className="bg-white text-gray-800">
                    {item.id}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-800 font-bold">
                    {item.description}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-800 font-bold">
                    ₱{parseInt(item.price).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-800 font-bold">
                    {item.unit}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-800 font-bold">
                    {item.quantity}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-800 font-bold">
                    {item.supplier}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-800 font-bold">
                    {date}
                  </Table.Cell>
                  {isClient && (
                    <Table.Cell className="bg-white text-gray-800 font-bold">
                      <Button
                        onClick={() => handleOpenModal(item)}
                        gradientMonochrome="success"
                      >
                        <HiPlusCircle color="gray" className="mr-2 h-5 w-5" />
                        ADD
                      </Button>
                    </Table.Cell>
                  )}
                  {isCart && (
                    <Table.Cell className="bg-white text-gray-800">
                      <div className="flex justify-center items-center">
                        <Button
                          className="mx-3"
                          disabled={item.borrowedQuantity <= 1}
                          onClick={() => handleDecrement(item)}
                        >
                          -
                        </Button>
                        <SemInput
                          className="mx-3"
                          value={item.borrowedQuantity || 0}
                          event={(event) => {
                            const value = parseInt(event.target.value);
                            if (value > item.quantity) {
                              setErrorEquipment(true);
                            } else {
                              setErrorEquipment(false);
                            }

                            const cartEquipmentCopy = [...cartEquipment];
                            cartEquipmentCopy.map((supply) => {
                              if (supply.docID === item.docID) {
                                supply.borrowedQuantity = isNaN(value)
                                  ? 0
                                  : value;
                              }
                            });
                            setCartEquipment(cartEquipmentCopy);
                          }}
                        />
                        <Button
                          className="mx-3"
                          onClick={() => handleIncrement(item)}
                        >
                          +
                        </Button>
                      </div>
                    </Table.Cell>
                  )}
                  {isCart && (
                    <Table.Cell className="bg-white text-gray-800 font-bold">
                      <Button
                        onClick={() => handlelDeleteCart(item)}
                        gradientMonochrome="failure"
                      >
                        DELETE
                      </Button>
                    </Table.Cell>
                  )}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}

      <Modal show={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Header>
          Add Item: {selectedItem?.description || "Item"}
        </Modal.Header>
        <Modal.Body>
          <p>
            Stock Available:{" "}
            <span className="font-bold">{selectedItem?.quantity || 0}</span>
          </p>
          <p>Price: ₱{selectedItem?.price || 0}</p>
          <TextInput
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
            min={1}
            onKeyDown={(e) => {
              // Prevent negative signs, e, and other invalid inputs
              if (["e", "E", "-", "+", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddToCart} gradientMonochrome="success">
            Confirm
          </Button>
          <Button
            onClick={() => setModalVisible(false)}
            gradientMonochrome="failure"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
