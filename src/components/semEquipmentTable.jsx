import { Button, Dropdown, Table, Tooltip } from "flowbite-react";
import { HiOutlineCog, HiOutlinePlusCircle, HiTrash } from "react-icons/hi";
import { useSemStore } from "../zustand/store";
import { toast } from "react-toastify";

export function SemEquipmentTable({
  data,
  setSelectedEquip,
  setDeleteModal,
  setEquipModal,
  setIsUpdate,
  handleUpdateEquipForm,
  cart,
}) {
  const { currentUser, setCartEquipment, cartEquipment } = useSemStore();
  const isAdmin = currentUser.role == "Admin";

  const handleAddCart = (item) => {
    const isAdded = cartEquipment.includes(item);
    if (!isAdded) {
      const newItem = [...cartEquipment, item];
      setCartEquipment(newItem);
      toast.success("Successfull added to cart.", { position: "bottom-right" });
    } else {
      toast.info("it's already in your cart.", { position: "bottom-right" });
    }
  };

  const handleRemoveCart = (item) => {
    const newCarts = cartEquipment.filter((cart) => {
      if (cart.id !== item.id) {
        return cart;
      }
    });
    setCartEquipment(newCarts);
  };

  const handleIncrement = (data) => {
    const cartEquipmentCopy = [...cartEquipment];
    cartEquipmentCopy.map((item) => {
      if (item.id == data.id) {
        if (item.borrowedQuantity == undefined) {
          item.borrowedQuantity = 2;
        } else {
          item.borrowedQuantity = parseInt(item.borrowedQuantity) + 1;
        }
      }
    });
    setCartEquipment(cartEquipment);
  };
  const handleDecrement = (data) => {
    const cartEquipmentCopy = [...cartEquipment];
    cartEquipmentCopy.map((item) => {
      if (item.id == data.id) {
        item.borrowedQuantity = parseInt(item.borrowedQuantity) - 1;
      }
    });
    setCartEquipment(cartEquipment);
  };
  return (
    <div className="overflow-x-auto ">
      {data && (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              #
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Property Number
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Quantity
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Unit
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Unit Cost
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Description
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Action
            </Table.HeadCell>
            {cart && (
              <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                Borrowed Quantity
              </Table.HeadCell>
            )}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item, index) => {
              return (
                <Table.Row key={item.id}>
                  <Table.Cell className="bg-slate-800  text-white">
                    {index + 1}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.propertyNumber}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-slate-800  text-white font-bold">
                    {item.name}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.quantity}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.unit}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.unitCost}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.description}
                  </Table.Cell>{" "}
                  {isAdmin && (
                    <Table.Cell className="bg-slate-800 rounded-lg text-white ">
                      <div className="flex">
                        <Tooltip content="Update office name">
                          <Button
                            className="mr-5"
                            onClick={() => {
                              setEquipModal(true);
                              handleUpdateEquipForm(item);
                              setIsUpdate(true);
                            }}
                            gradientMonochrome="info"
                          >
                            <HiOutlineCog
                              color="white"
                              className="mr-2 h-5 w-5"
                            />
                            Update
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete the office permanently">
                          <Button
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedEquip(item);
                            }}
                            gradientMonochrome="failure"
                          >
                            {" "}
                            <HiTrash color="white" className="mr-2 h-5 w-5" />
                            Delete
                          </Button>
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  )}
                  {!isAdmin && !cart && (
                    <Table.Cell className="bg-slate-800 rounded-lg text-white ">
                      <Tooltip content="Add this item to your cart">
                        <Button
                          gradientMonochrome="info"
                          onClick={() => handleAddCart(item)}
                        >
                          <HiOutlinePlusCircle
                            color="white"
                            className="mr-2 h-5 w-5"
                          />
                          Add
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  )}
                  {cart && (
                    <Table.Cell className="bg-slate-800  text-white ">
                      <Tooltip content="Remove item from cart">
                        <Button
                          gradientMonochrome="failure"
                          onClick={() => handleRemoveCart(item)}
                        >
                          <HiTrash color="white" className="mr-2 h-5 w-5" />
                          Remove
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  )}
                  {cart && (
                    <Table.Cell className="bg-slate-800  text-white ">
                      <div className="flex justify-center items-center">
                        <Button
                          disabled={item.borrowedQuantity == 1}
                          onClick={() => handleDecrement(item)}
                        >
                          -
                        </Button>
                        <h1 className="mx-3">
                          {item.borrowedQuantity ? item.borrowedQuantity : 1}
                        </h1>
                        <Button onClick={() => handleIncrement(item)}>+</Button>
                      </div>
                    </Table.Cell>
                  )}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
