import { Badge, Button, Dropdown, Table, Tooltip } from "flowbite-react";
import moment from "moment";
import useGetSupply from "../hooks/useGetSupply";
import useGetEquipment from "../hooks/useGetEquipment";
import { useSemStore } from "../zustand/store";
import useUpdateTransaction from "../hooks/useUpdateTransaction";
import QRCode from "react-qr-code";
import SemModal from "./semModal";
import { useState } from "react";
import useCrudItems from "../hooks/useCrudItems";

const SemTransactionTable = ({
  data,
  setCurrentTransaction,
  setRisForm,
  setIcsForm,
  setParForm,
}) => {
  const { data: supply } = useGetSupply();
  const { data: equipment } = useGetEquipment();
  const { currentUser } = useSemStore();
  const { approveTransaction, rejectTransaction } = useUpdateTransaction();
  const { handleDecrementQuantity } = useCrudItems();
  const isAdmin = currentUser?.role === "Admin";

  const [qrModal, setQrModal] = useState(false);
  const [selected, setSelected] = useState();

  const handleGetSupply = (id) => supply.find((item) => item.id === id);

  const handleGetEquipment = (id) => equipment.find((item) => item.id === id);

  const getBadgeColor = (status) => {
    if (status === "Pending") return "warning";
    if (status === "Approve") return "green";
    return "failure";
  };

  // Filter transactions by current user
  const userTransactions = data?.filter((transaction) => {
    const user = JSON.parse(transaction.currentUser);
    return user?.email === currentUser?.email; // Adjust property to match unique identifier
  });

  return (
    <div className="overflow-x-auto">
      <SemModal
        title="QR Code for Equipment"
        open={qrModal}
        handleClose={() => setQrModal(false)}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`https://supply-and-equipment-8df9f.web.app/view-transaction/${selected}`}
          viewBox={`0 0 256 256`}
        />
      </SemModal>

      {userTransactions && (
        <Table>
          <Table.Head>
            <Table.HeadCell className="bg-white text-gray-900">
              User
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Office Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Category
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Review By
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Created At
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Form
            </Table.HeadCell>
            {isAdmin && (
              <Table.HeadCell className="bg-white text-gray-900">
                Action
              </Table.HeadCell>
            )}
          </Table.Head>

          {currentUser.role == "Admin" ? (
            <Table.Body className="divide-y">
              {data.map((item) => {
                const user = JSON.parse(item.currentUser);
                const date = moment(item.createdAt?.toDate()).format("LLL");
                const badgeColor = getBadgeColor(item.status);

                const finalItem =
                  item.item.category === "supply"
                    ? handleGetSupply(item.item.id)
                    : handleGetEquipment(item.item.id);

                return (
                  <Table.Row key={item.id}>
                    <Table.Cell className="bg-white text-gray-900">
                      {user.firstName + " " + user.lastName}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      {user.office}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      {item.category}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      {item.reviewBy ? item.reviewBy : "Waiting for approval"}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      {date}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      <Badge color={badgeColor} size="lg">
                        {item.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      <Dropdown
                        placement="left"
                        label="Forms"
                        dismissOnClick={false}
                      >
                        <Tooltip
                          content="You can now view your RIS form"
                          placement="left"
                        >
                          <Dropdown.Item
                            onClick={() => {
                              setCurrentTransaction(item);
                              setRisForm(true);
                            }}
                          >
                            View RIS Form
                          </Dropdown.Item>
                        </Tooltip>
                        <Tooltip
                          placement="left"
                          content={
                            item.status !== "Approve"
                              ? "Your document is not approved yet"
                              : `You can now view your ${
                                  item.category === "Supply" ? "ICS" : "PAR"
                                } form`
                          }
                        >
                          <Dropdown.Item
                            disabled={item.status !== "Approve"}
                            onClick={() => {
                              setCurrentTransaction(item);
                              item.category === "Supply"
                                ? setIcsForm(true)
                                : setParForm(true);
                            }}
                          >
                            {item.category === "Supply"
                              ? "View ICS Form"
                              : "View PAR Form"}
                          </Dropdown.Item>
                        </Tooltip>
                        {item.category === "Equipment" &&
                          item.status == "Approve" && (
                            <Dropdown.Item
                              onClick={() => {
                                setSelected(item.id);
                                setQrModal(true);
                              }}
                            >
                              View QR Code
                            </Dropdown.Item>
                          )}
                      </Dropdown>
                    </Table.Cell>
                    {isAdmin && (
                      <Table.Cell className="bg-white text-gray-900">
                        <div className="flex">
                          <Button
                            disabled={
                              item.status === "Approve" ||
                              item.status === "Rejected"
                            }
                            onClick={() => {
                              handleDecrementQuantity(item);
                              approveTransaction(
                                item.id,
                                currentUser,
                                item.item
                              );
                            }}
                            gradientMonochrome="success"
                          >
                            Approve
                          </Button>
                          <Button
                            disabled={
                              item.status === "Approve" ||
                              item.status === "Rejected"
                            }
                            onClick={() =>
                              rejectTransaction(item.id, currentUser)
                            }
                            gradientMonochrome="failure"
                          >
                            Reject
                          </Button>
                        </div>
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
            </Table.Body>
          ) : (
            <Table.Body className="divide-y">
              {userTransactions.map((item) => {
                const user = JSON.parse(item.currentUser);
                const date = moment(item.createdAt?.toDate()).format("LLL");
                const badgeColor = getBadgeColor(item.status);

                const finalItem =
                  item.item.category === "supply"
                    ? handleGetSupply(item.item.id)
                    : handleGetEquipment(item.item.id);

                return (
                  <Table.Row key={item.id}>
                    <Table.Cell className="bg-white text-gray-900">
                      {user.firstName + " " + user.lastName}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      {user.office}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      {item.category}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      {item.reviewBy ? item.reviewBy : "Waiting for approval"}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      {date}
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      <Badge color={badgeColor} size="lg">
                        {item.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="bg-white text-gray-900">
                      <Dropdown
                        placement="left"
                        label="Forms"
                        dismissOnClick={false}
                      >
                        <Tooltip
                          content="You can now view your RIS form"
                          placement="left"
                        >
                          <Dropdown.Item
                            onClick={() => {
                              setCurrentTransaction(item);
                              setRisForm(true);
                            }}
                          >
                            View RIS Form
                          </Dropdown.Item>
                        </Tooltip>
                        <Tooltip
                          placement="left"
                          content={
                            item.status !== "Approve"
                              ? "Your document is not approved yet"
                              : `You can now view your ${
                                  item.category === "Supply" ? "ICS" : "PAR"
                                } form`
                          }
                        >
                          <Dropdown.Item
                            disabled={item.status !== "Approve"}
                            onClick={() => {
                              setCurrentTransaction(item);
                              item.category === "Supply"
                                ? setIcsForm(true)
                                : setParForm(true);
                            }}
                          >
                            {item.category === "Supply"
                              ? "View ICS Form"
                              : "View PAR Form"}
                          </Dropdown.Item>
                        </Tooltip>
                        {item.category === "Equipment" &&
                          item.status == "Approve" && (
                            <Dropdown.Item
                              onClick={() => {
                                setSelected(item.id);
                                setQrModal(true);
                              }}
                            >
                              View QR Code
                            </Dropdown.Item>
                          )}
                      </Dropdown>
                    </Table.Cell>
                    {isAdmin && (
                      <Table.Cell className="bg-white text-gray-900">
                        <div className="flex">
                          <Button
                            disabled={
                              item.status === "Approve" ||
                              item.status === "Rejected"
                            }
                            onClick={() => {
                              handleDecrementQuantity(item);
                              approveTransaction(
                                item.id,
                                currentUser,
                                item.item
                              );
                            }}
                            gradientMonochrome="success"
                          >
                            Approve
                          </Button>
                          <Button
                            disabled={
                              item.status === "Approve" ||
                              item.status === "Rejected"
                            }
                            onClick={() =>
                              rejectTransaction(item.id, currentUser)
                            }
                            gradientMonochrome="failure"
                          >
                            Reject
                          </Button>
                        </div>
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
            </Table.Body>
          )}
        </Table>
      )}
    </div>
  );
};

export default SemTransactionTable;
