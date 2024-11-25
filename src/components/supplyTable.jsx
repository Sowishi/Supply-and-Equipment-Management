import { Button, Table, Modal, TextInput } from "flowbite-react";
import moment from "moment";
import { HiPlusCircle } from "react-icons/hi";
import { useState } from "react";
import { useSemStore } from "../zustand/store";
import SemInput from "./semInput";

export function SupplyTable({ data, isClient, isCart, error, setError }) {
  const filterData = data.filter((item) => item.category === "Supply");

  const { setCartSupply, cartSupply } = useSemStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setQuantity(1); // Reset quantity when modal opens
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    if (quantity > selectedItem.quantity) {
      setErrorMessage(true);
      return;
    }
    const cartSupplyCopy = [...cartSupply];
    const itemToAdd = { ...selectedItem, borrowedQuantity: quantity };
    cartSupplyCopy.push(itemToAdd);
    setCartSupply(cartSupplyCopy);
    setErrorMessage(false);
    setModalVisible(false);
  };

  const handlelDeleteCart = (data) => {
    const cartSupplyCopy = [...cartSupply];
    const output = cartSupplyCopy.filter((item) => item.docID !== data.docID);
    setCartSupply(output);
  };

  const handleIncrement = (data) => {
    const cartSupplyCopy = [...cartSupply];
    cartSupplyCopy.forEach((item) => {
      if (item.docID === data.docID) {
        item.borrowedQuantity = (item.borrowedQuantity || 0) + 1;
        setError(item.borrowedQuantity > data.quantity);
      }
    });
    setCartSupply(cartSupplyCopy);
  };

  const handleDecrement = (data) => {
    const cartSupplyCopy = [...cartSupply];
    cartSupplyCopy.forEach((item) => {
      if (item.docID === data.docID) {
        item.borrowedQuantity = (item.borrowedQuantity || 1) - 1;
        setError(item.borrowedQuantity > data.quantity);
      }
    });
    setCartSupply(cartSupplyCopy);
  };

  const handleQuantityChange = (e) => {
    const value =
      e.target.value === "" ? "" : Math.max(1, Number(e.target.value));
    setQuantity(value);
    setError(value > selectedItem.quantity);
  };
  return (
    <div className="overflow-x-auto">
      {data && (
        <>
          <Table striped hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-gray-100 text-gray-700">
                Stock / Property No.
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100 text-gray-700">
                Description
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100 text-gray-700">
                Price
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100 text-gray-700">
                Unit
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100 text-gray-700">
                Quantity
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100 text-gray-700">
                Supplier
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100 text-gray-700">
                Date
              </Table.HeadCell>
              {isClient && (
                <Table.HeadCell className="bg-gray-100 text-gray-700"></Table.HeadCell>
              )}
              {isCart && (
                <>
                  <Table.HeadCell className="bg-gray-100 text-gray-700"></Table.HeadCell>
                  <Table.HeadCell className="bg-gray-100 text-gray-700"></Table.HeadCell>
                </>
              )}
            </Table.Head>
            <Table.Body className="divide-y">
              {filterData.map((item) => {
                const date = moment(item?.createdAt?.toDate()).format("LLL");
                return (
                  <Table.Row key={item.docID}>
                    <Table.Cell className="bg-white text-gray-900">
                      {item.id}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900 font-bold">
                      {item.description}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900 font-bold">
                      ₱{item.price}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900 font-bold">
                      {item.unit}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900 font-bold">
                      {item.quantity}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900 font-bold">
                      {item.supplier}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900 font-bold">
                      {date}
                    </Table.Cell>
                    {isClient && (
                      <Table.Cell className="bg-white text-gray-900 font-bold">
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
                      <Table.Cell className="bg-white text-gray-900">
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
                              const value = parseInt(event.target.value || 0);
                              setError(value > item.quantity);

                              const cartSupplyCopy = [...cartSupply];
                              cartSupplyCopy.forEach((supply) => {
                                if (supply.docID === item.docID) {
                                  supply.borrowedQuantity = value;
                                }
                              });

                              setCartSupply(cartSupplyCopy);
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
                      <Table.Cell className="bg-white text-gray-900 font-bold">
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
