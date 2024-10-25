import { Button, Dropdown, Table, Tooltip } from "flowbite-react";
import { HiOutlineCog, HiOutlinePlusCircle, HiTrash } from "react-icons/hi";
import { useSemStore } from "../zustand/store";
import { toast } from "react-toastify";
import moment from "moment";

export function SemSupplyTable({ data }) {
  return (
    <div className="overflow-x-auto ">
      {data && (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Po Number
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Supplier
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Date Requested
            </Table.HeadCell>

            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Action
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item, index) => {
              const date = moment(item?.createdAt?.toDate()).format("LLL");

              return (
                <Table.Row key={item.id}>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.poNumber}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.supplier}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white font-bold">
                    {item.status}
                  </Table.Cell>
                  {date && (
                    <Table.Cell className="bg-slate-800  text-white font-bold">
                      {date}
                    </Table.Cell>
                  )}

                  <Table.Cell className="bg-slate-800  text-white">
                    <Button>Action</Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
