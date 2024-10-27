import { Button, Dropdown, Table, Tooltip } from "flowbite-react";
import moment from "moment";
import { HiPlusCircle } from "react-icons/hi";
import { useSemStore } from "../zustand/store";
import SemInput from "./semInput";

export function EquipmentTable({ data, isClient, isCart, setErrorEquipment }) {
  const filterData = data.filter((item) => {
    if (item.category == "Equipment") {
      return item;
    }
  });

  const { setCartEquipment, cartEquipment } = useSemStore();

  const handleAddCart = (item) => {
    const cartEquipmentCopy = [...cartEquipment];
    cartEquipmentCopy.push(item);
    setCartEquipment(cartEquipmentCopy);
  };

  const handlelDeleteCart = (data) => {
    const cartEquipmentCopy = [...cartEquipment];
    const output = cartEquipmentCopy.filter((item) => {
      if (item.docID !== data.docID) {
        return item;
      }
    });
    setCartEquipment(output);
  };

  const handleIncrement = (data) => {
    const cartEquipmentCopy = [...cartEquipment];
    cartEquipmentCopy.map((item) => {
      if (item.docID == data.docID) {
        if (item.borrowedQuantity == undefined) {
          item.borrowedQuantity = 1;
        } else {
          item.borrowedQuantity = parseInt(item.borrowedQuantity) + 1;
        }

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
      if (item.docID == data.docID) {
        item.borrowedQuantity = parseInt(item.borrowedQuantity) - 1;
        if (item.borrowedQuantity > data.quantity) {
          setErrorEquipment(true);
        } else {
          setErrorEquipment(false);
        }
      }
    });
    setCartEquipment(cartEquipmentCopy);
  };
  return (
    <div className="overflow-x-auto ">
      {data && (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Stock / Property No.
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Description
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Unit
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Quantity
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Supplier
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Date
            </Table.HeadCell>
            {isClient && (
              <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500"></Table.HeadCell>
            )}
            {isCart && (
              <>
                <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500"></Table.HeadCell>
                <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500"></Table.HeadCell>
              </>
            )}
          </Table.Head>
          <Table.Body className="divide-y">
            {filterData.map((item, index) => {
              const date = moment(item?.createdAt?.toDate()).format("LLL");

              return (
                <Table.Row key={item.id}>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.id}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white font-bold">
                    {item.description}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white font-bold">
                    {item.unit}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white font-bold">
                    {item.quantity}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white font-bold">
                    {item.supplier}
                  </Table.Cell>

                  <Table.Cell className="bg-slate-800  text-white font-bold">
                    {date}
                  </Table.Cell>
                  {isClient && (
                    <Table.Cell className="bg-slate-800  text-white font-bold">
                      <Button
                        onClick={() => handleAddCart(item)}
                        gradientMonochrome="success"
                      >
                        <HiPlusCircle color="white" className="mr-2 h-5 w-5" />
                        ADD
                      </Button>
                    </Table.Cell>
                  )}
                  {isCart && (
                    <Table.Cell className="bg-slate-800  text-white ">
                      <div className="flex justify-center items-center ">
                        <Button
                          className="mx-3"
                          disabled={item.borrowedQuantity <= 1}
                          onClick={() => handleDecrement(item)}
                        >
                          -
                        </Button>

                        <SemInput
                          className="mx-3"
                          value={
                            item.borrowedQuantity ? item.borrowedQuantity : 0
                          }
                          event={(event) => {
                            if (parseInt(event.target.value) > item.quantity) {
                              setErrorEquipment(true);
                            } else {
                              setErrorEquipment(false);
                            }

                            const cartEquipmentCopy = [...cartEquipment];
                            cartEquipmentCopy.map((supply) => {
                              if (supply.docID == item.docID) {
                                if (event.target.value == "") {
                                  supply.borrowedQuantity = parseInt(0);
                                } else {
                                  supply.borrowedQuantity = parseInt(
                                    event.target.value
                                  );
                                }
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
                    <Table.Cell className="bg-slate-800  text-white font-bold">
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
    </div>
  );
}
