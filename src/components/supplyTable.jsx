import { Button, Dropdown, Table, Tooltip } from "flowbite-react";
import moment from "moment";
import { HiPlus, HiPlusCircle } from "react-icons/hi";

export function SupplyTable({ data, isClient }) {
  const filterData = data.filter((item) => {
    if (item.category == "Supply") {
      return item;
    }
  });

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
                      <Button gradientMonochrome="success">
                        <HiPlusCircle color="white" className="mr-2 h-5 w-5" />
                        ADD
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
