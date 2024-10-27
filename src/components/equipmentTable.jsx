import { Button, Dropdown, Table, Tooltip } from "flowbite-react";
import moment from "moment";

export function EquipmentTable({ data }) {
  const filterData = data.filter((item) => {
    if (item.category == "Equipment") {
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
            {/* <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500"></Table.HeadCell> */}
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
                  {/* <Table.Cell className="bg-slate-800  text-white font-bold">
                    <Button color={"failure"}>Delete</Button>
                  </Table.Cell> */}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
