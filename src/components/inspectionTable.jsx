import { Button, Dropdown, Table, Tooltip } from "flowbite-react";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import SemModal from "./semModal";
import InspectionModal from "./inspectionModal";
import ConfirmationModal from "./confirmationModal";
import useCrudRequest from "../hooks/useCrudRequest";
import useCrudItems from "../hooks/useCrudItems";

export function InspectionTable({ data }) {
  const [viewItemModal, setViewItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const [poModal, setPoModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  const { handleUpdateStatus } = useCrudRequest();
  const { handleAddItem } = useCrudItems();

  const filterData = data.filter((item) => item.status === "Fully Delivered");

  const handleStatusChange = (item, status) => {
    setConfirmModal(true);
    setCurrentItem(item);
    setCurrentStatus(status);
  };

  const handleCompleted = () => {
    currentItem.items.forEach((item) => handleAddItem(item, currentItem));
    toast.success("Successfully Added Items");
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
          <table className="w-full text-sm text-left text-gray-700 bg-white">
            <thead className="text-xs text-gray-500 uppercase bg-gray-100">
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

      <InspectionModal
        handleClose={() => setPoModal(false)}
        title={`Inspection & Acceptance Report`}
        size={"6xl"}
        open={poModal}
        data={currentItem}
      />

      <ConfirmationModal
        text={currentStatus}
        event={() => {
          handleUpdateStatus(currentItem.id, currentStatus);
          setConfirmModal(false);
          handleCompleted();
        }}
        open={confirmModal}
        handleClose={() => setConfirmModal(false)}
        success={true}
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
              <Table.HeadCell key={head} className="text-gray-700 bg-gray-100">
                {head}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {filterData.map((item) => {
              const date = moment(item?.createdAt?.toDate()).format("LLL");
              return (
                <Table.Row key={item.id} className="bg-white">
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
                  <Table.Cell className="font-bold">{date}</Table.Cell>
                  <Table.Cell>
                    <Dropdown placement="left" label="Action">
                      <Dropdown.Item
                        onClick={() => {
                          setPoModal(true);
                          setCurrentItem(item);
                        }}
                      >
                        View Inspection & Acceptance Report
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleStatusChange(item, "Completed")}
                      >
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleStatusChange(item, "Rejected")}
                      >
                        Rejected
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
