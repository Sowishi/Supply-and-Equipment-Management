import { Button, Dropdown, Table, Tooltip } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import SemModal from "./semModal";
import ConfirmationModal from "./confirmationModal.jsx";
import PurchaseOrderModal from "./purchaseOrderModal";
import useCrudRequest from "../hooks/useCrudRequest";
import { toast } from "react-toastify";

export function SemSupplyTable({ data }) {
  const [viewItemModal, setViewItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const [poModal, setPoModal] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { handleDeleteRequest } = useCrudRequest();

  return (
    <div className="overflow-x-auto">
      <SemModal
        title={"Items Requested"}
        size={"5xl"}
        open={viewItemModal}
        handleClose={() => setViewItemModal(false)}
      >
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Stock / Property No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItem.items?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b last:border-0 hover:bg-gray-100"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item?.id}
                  </th>
                  <td className="px-6 py-4">{item?.description}</td>
                  <td className="px-6 py-4">{item?.unit}</td>
                  <td className="px-6 py-4">{item?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SemModal>

      <PurchaseOrderModal
        handleClose={() => setPoModal(false)}
        title={`Purchase Order Form`}
        size={"6xl"}
        open={poModal}
        data={currentItem}
      />

      <ConfirmationModal
        event={() => {
          handleDeleteRequest(currentItem.id);
          setConfirmDelete(false);
          toast.success("Successfully Deleted Request");
        }}
        handleClose={() => setConfirmDelete(false)}
        open={confirmDelete}
      />

      {data && (
        <Table striped hoverable>
          <Table.Head>
            {[
              "Po Number",
              "Supplier",
              "Items",
              "Fund Cluster",
              "Category",
              "Status",
              "Date Requested",
              "Action",
            ].map((head) => (
              <Table.HeadCell key={head} className="bg-gray-100 text-gray-800">
                {head}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item) => {
              const date = moment(item?.createdAt?.toDate()).format("LLL");

              return (
                <Table.Row key={item.id} className="bg-white hover:bg-gray-50">
                  <Table.Cell>{item.poNumber}</Table.Cell>
                  <Table.Cell>{item.supplier}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color={"info"}
                      onClick={() => {
                        setCurrentItem(item);
                        setViewItemModal(true);
                      }}
                    >
                      View Item
                    </Button>
                  </Table.Cell>
                  <Table.Cell>{item.fundCluster}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell className="font-bold">{item.status}</Table.Cell>
                  {date && (
                    <Table.Cell className="font-bold">{date}</Table.Cell>
                  )}
                  <Table.Cell>
                    <Dropdown placement="left" label="Action">
                      <Dropdown.Item
                        onClick={() => {
                          setCurrentItem(item);
                          setPoModal(true);
                        }}
                      >
                        View Purchase Order
                      </Dropdown.Item>
                      {item.status === "Completed" && (
                        <Dropdown.Item
                          onClick={() => {
                            setCurrentItem(item);
                            setPoModal(true);
                          }}
                        >
                          View Inspection and Acceptance Report
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        onClick={() => {
                          setConfirmDelete(true);
                          setCurrentItem(item);
                        }}
                      >
                        Delete Request
                      </Dropdown.Item>
                    </Dropdown>
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
