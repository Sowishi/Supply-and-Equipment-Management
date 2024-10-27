import { Button, Dropdown, Table, Tooltip } from "flowbite-react";
import { HiOutlineCog, HiOutlinePlusCircle, HiTrash } from "react-icons/hi";
import { useSemStore } from "../zustand/store";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import SemModal from "./semModal";
import PurchaseOrderModal from "./purchaseOrderModal";
import useCrudRequest from "../hooks/useCrudRequest";
import DeliveryModal from "./deliveryModal";
import ConfirmationModal from "./confirmationModal";

export function InspectionTable({ data }) {
  const [viewItemModal, setViewItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const [poModal, setPoModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  const { handleUpdateStatus } = useCrudRequest();

  const filterData = data.filter((item) => {
    if (item.status == "Fully Delivered") {
      return item;
    }
  });

  const handleStatusChange = (item, status) => {
    setConfirmModal(true);
    setCurrentItem(item);
    setCurrentStatus(status);
  };

  return (
    <div className="overflow-x-auto ">
      <SemModal
        title={"Items Requested"}
        size={"5xl"}
        open={viewItemModal}
        handleClose={() => setViewItemModal(false)}
      >
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Stock / Property No.
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Unit
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItem.items?.map((item) => {
                return (
                  <tr
                    key={item.id}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.id}
                    </th>
                    <td class="px-6 py-4">{item?.description}</td>
                    <td class="px-6 py-4">{item?.unit}</td>
                    <td class="px-6 py-4">{item?.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SemModal>

      <DeliveryModal
        handleClose={() => setPoModal(false)}
        title={`Purchase Order Form`}
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
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Po Number
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Supplier
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Items
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Fund Cluster
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Category
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
            {filterData.map((item, index) => {
              const date = moment(item?.createdAt?.toDate()).format("LLL");

              return (
                <Table.Row key={item.id}>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.poNumber}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.supplier}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    <Button
                      color={"warning"}
                      onClick={() => {
                        setCurrentItem(item);
                        setViewItemModal(true);
                      }}
                    >
                      View Item
                    </Button>
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.fundCluster}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.category}
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
                    <Dropdown placement="left" label="Action" title="Action">
                      <Dropdown.Item
                        onClick={() => {
                          handleStatusChange(item, "Completed");
                        }}
                      >
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleStatusChange(item, "Rejected");
                        }}
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
