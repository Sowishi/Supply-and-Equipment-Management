import { Button, Dropdown, Table } from "flowbite-react";
import { useState } from "react";
import moment from "moment";
import SemModal from "./semModal";
import DeliveryModal from "./deliveryModal";
import ConfirmationModal from "./confirmationModal";
import useCrudRequest from "../hooks/useCrudRequest";

export function DeliveryTable({ data }) {
  const [viewItemModal, setViewItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const [poModal, setPoModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const { handleUpdateStatus } = useCrudRequest();

  const handleStatusChange = (item, status) => {
    setConfirmModal(true);
    setCurrentItem(item);
    setCurrentStatus(status);
  };

  return (
    <div className="overflow-x-auto">
      <SemModal
        title={"Items Requested"}
        size={"5xl"}
        open={viewItemModal}
        handleClose={() => setViewItemModal(false)}
      >
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-200 text-gray-600">
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
                <tr key={item.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900"
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

      <DeliveryModal
        handleClose={() => setPoModal(false)}
        title={`Delivery Receipts Form`}
        size={"6xl"}
        open={poModal}
        data={currentItem}
      />

      <ConfirmationModal
        text={currentStatus}
        event={() => {
          handleUpdateStatus(currentItem.id, currentStatus);
          setConfirmModal(false);
        }}
        open={confirmModal}
        handleClose={() => setConfirmModal(false)}
        success={true}
      />

      {data && (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell className="bg-gray-200 text-gray-600">
              Po Number
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-200 text-gray-600">
              Supplier
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-200 text-gray-600">
              Items
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-200 text-gray-600">
              Fund Cluster
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-200 text-gray-600">
              Category
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-200 text-gray-600">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-200 text-gray-600">
              Date Requested
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-200 text-gray-600">
              Action
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item) => {
              const date = moment(item?.createdAt?.toDate()).format("LLL");
              return (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.poNumber}</Table.Cell>
                  <Table.Cell>{item.supplier}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="gray"
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
                  <Table.Cell className="font-bold">{date}</Table.Cell>
                  <Table.Cell>
                    <Dropdown placement="left" label="Action">
                      <Dropdown.Item
                        onClick={() => {
                          setCurrentItem(item);
                          setPoModal(true);
                        }}
                      >
                        View Delivery Receipts
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleStatusChange(item, "Partial Delivered");
                        }}
                      >
                        Update as Partial Delivered
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleStatusChange(item, "Fully Delivered");
                        }}
                      >
                        Update as Fully Delivered
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleStatusChange(item, "Rejected");
                        }}
                      >
                        Reject
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
