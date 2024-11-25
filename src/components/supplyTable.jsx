import { Button, Table, Modal, TextInput } from "flowbite-react";
import moment from "moment";
import { HiPlusCircle } from "react-icons/hi";
import { useState } from "react";
import { useSemStore } from "../zustand/store";
import SemInput from "./semInput";
import { toast } from "react-toastify";

export function SupplyTable({ data, isClient, isCart, error, setError }) {
  const filterData = data.filter((item) => item.category === "Supply");
  const { setCartSupply, cartSupply } = useSemStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState(false);

  // Sanitize input to prevent special characters and negative signs
  const sanitizeInput = (value) => {
    const sanitized = value.replace(/[^0-9]/g, ""); // Allow only numbers
    return sanitized === "" ? "" : Math.max(1, parseInt(sanitized, 10));
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    if (quantity > selectedItem.quantity) {
      setErrorMessage(true);
      toast.error("Request quantity exceeds the available stocks");
      return;
    }
    const updatedCart = [...cartSupply];
    const itemToAdd = { ...selectedItem, borrowedQuantity: quantity };
    updatedCart.push(itemToAdd);
    setCartSupply(updatedCart);
    setErrorMessage(false);
    setModalVisible(false);
  };

  const handleQuantityChange = (e) => {
    const value = sanitizeInput(e.target.value);
    setQuantity(value);
    setError(value > selectedItem.quantity);
  };

  const updateCartQuantity = (data, value) => {
    const sanitizedValue = sanitizeInput(value);
    const updatedCart = cartSupply.map((item) =>
      item.docID === data.docID
        ? { ...item, borrowedQuantity: sanitizedValue }
        : item
    );
    setCartSupply(updatedCart);
    setError(sanitizedValue > data.quantity);
  };

  const handleIncrement = (data) => {
    updateCartQuantity(data, (data.borrowedQuantity || 0) + 1);
  };

  const handleDecrement = (data) => {
    updateCartQuantity(data, Math.max(1, (data.borrowedQuantity || 1) - 1));
  };

  const handleDeleteCartItem = (data) => {
    const updatedCart = cartSupply.filter((item) => item.docID !== data.docID);
    setCartSupply(updatedCart);
  };

  return (
    <div className="overflow-x-auto">
      {data && (
        <>
          <Table striped hoverable>
            <Table.Head>
              <Table.HeadCell>Stock / Property No.</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Unit</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Supplier</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              {isClient && <Table.HeadCell />}
              {isCart && (
                <>
                  <Table.HeadCell />
                  <Table.HeadCell />
                </>
              )}
            </Table.Head>
            <Table.Body>
              {filterData.map((item) => {
                const date = moment(item?.createdAt?.toDate()).format("LLL");
                return (
                  <Table.Row key={item.docID}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell className="font-bold">
                      {item.description}
                    </Table.Cell>
                    <Table.Cell className="font-bold">₱{item.price}</Table.Cell>
                    <Table.Cell className="font-bold">{item.unit}</Table.Cell>
                    <Table.Cell className="font-bold">
                      {item.quantity}
                    </Table.Cell>
                    <Table.Cell className="font-bold">
                      {item.supplier}
                    </Table.Cell>
                    <Table.Cell className="font-bold">{date}</Table.Cell>
                    {isClient && (
                      <Table.Cell>
                        <Button
                          onClick={() => handleOpenModal(item)}
                          gradientMonochrome="success"
                        >
                          <HiPlusCircle className="mr-2 h-5 w-5" />
                          ADD
                        </Button>
                      </Table.Cell>
                    )}
                    {isCart && (
                      <Table.Cell>
                        <div className="flex items-center">
                          <Button
                            disabled={item.borrowedQuantity <= 1}
                            onClick={() => handleDecrement(item)}
                          >
                            -
                          </Button>
                          <SemInput
                            className="mx-3"
                            value={item.borrowedQuantity || 0}
                            event={(e) =>
                              updateCartQuantity(item, e.target.value)
                            }
                          />
                          <Button onClick={() => handleIncrement(item)}>
                            +
                          </Button>
                        </div>
                      </Table.Cell>
                    )}
                    {isCart && (
                      <Table.Cell>
                        <Button
                          onClick={() => handleDeleteCartItem(item)}
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

          {/* Modal */}
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
              {error && (
                <p className="text-red-500 mt-2">
                  Quantity exceeds available stock!
                </p>
              )}
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
        </>
      )}
    </div>
  );
}
