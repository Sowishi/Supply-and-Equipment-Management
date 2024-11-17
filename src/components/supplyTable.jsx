import { Button, Table } from "flowbite-react";
import moment from "moment";
import { HiPlusCircle } from "react-icons/hi";
import { useSemStore } from "../zustand/store";
import SemInput from "./semInput";

export function SupplyTable({ data, isClient, isCart, error, setError }) {
  const filterData = data.filter((item) => item.category === "Supply");

  const { setCartSupply, cartSupply } = useSemStore();

  const handleAddCart = (item) => {
    const cartSupplyCopy = [...cartSupply];
    cartSupplyCopy.push(item);
    setCartSupply(cartSupplyCopy);
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

  return (
    <div className="overflow-x-auto">
      {data && (
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
                        onClick={() => handleAddCart(item)}
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
      )}
    </div>
  );
}
