import { Badge, Button, Dropdown, Table, Tooltip } from "flowbite-react";
import moment from "moment";
import useGetSupply from "../hooks/useGetSupply";
import useGetEquipment from "../hooks/useGetEquipment";
import { useSemStore } from "../zustand/store";
import useUpdateTransaction from "../hooks/useUpdateTransaction";
import QRCode from "react-qr-code";
import SemModal from "./semModal";
import { useState } from "react";

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
  const isAdmin = currentUser?.role == "Admin";

  const [qrModal, setQrModal] = useState(false);

  const handleGetSupply = (id) => {
    const output = supply.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });

    return output[0];
  };

  const handleGetEquipment = (id) => {
    const output = equipment.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });

    return output[0];
  };

  const getBadgeColor = (status) => {
    if (status === "Pending") {
      return "warning";
    } else if (status === "Approve") {
      return "green";
    } else {
      return "failure";
    }
  };

  return (
    <div className="overflow-x-auto">
      <SemModal
        title={"QR Code for Equipment"}
        open={qrModal}
        handleClose={() => setQrModal(false)}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={"fd"}
          viewBox={`0 0 256 256`}
        />
      </SemModal>

      {data && (
        <Table>
          <Table.Head>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              User
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Office Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Category
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Review By
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Created At
            </Table.HeadCell>
            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Status
            </Table.HeadCell>

            <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
              Form
            </Table.HeadCell>

            {isAdmin && (
              <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                Action
              </Table.HeadCell>
            )}
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.map((item) => {
              const user = JSON.parse(item.currentUser);
              const firebaseDate = item.createdAt;
              const date = moment(firebaseDate?.toDate()).format("LLL");
              const badgeColor = getBadgeColor(item.status);

              let finalItem = undefined;

              if (item.item.category == "supply") {
                finalItem = handleGetSupply(item.item.id);
              } else {
                finalItem = handleGetEquipment(item.item.id);
              }

              return (
                <Table.Row key={item.id}>
                  <Table.Cell className="bg-slate-800  text-white">
                    {user.firstName + " " + user.lastName}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    {user.office}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.category}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    {item.reviewBy ? item.reviewBy : "Waiting for approval"}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    {date}
                  </Table.Cell>
                  <Table.Cell className="bg-slate-800  text-white">
                    <Badge color={badgeColor} size={"lg"}>
                      {item.status}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell className="bg-slate-800  text-white">
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
                            ? "Your document is not approve yet"
                            : "You can now view your ICS form"
                        }
                      >
                        {item.category == "Supply" && (
                          <Dropdown.Item
                            style={{
                              cursor:
                                item.status !== "Approve"
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            disabled={item.status !== "Approve"}
                            onClick={() => {
                              setCurrentTransaction(item);
                              setIcsForm(true);
                            }}
                          >
                            {" "}
                            View ICS Form
                          </Dropdown.Item>
                        )}

                        {item.category == "Equipment" && (
                          <>
                            <Dropdown.Item
                              style={{
                                cursor:
                                  item.status !== "Approve"
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                              disabled={item.status !== "Approve"}
                              onClick={() => {
                                setCurrentTransaction(item);
                                setParForm(true);
                              }}
                            >
                              View PAR Form
                            </Dropdown.Item>
                          </>
                        )}
                      </Tooltip>
                      {item.category == "Equipment" && (
                        <>
                          <Dropdown.Item onClick={() => setQrModal(true)}>
                            View QR Code
                          </Dropdown.Item>
                        </>
                      )}
                    </Dropdown>
                  </Table.Cell>
                  {isAdmin && (
                    <Table.Cell className="bg-slate-800  text-white ">
                      <div className="wrapper flex">
                        <Button
                          disabled={
                            item.status == "Approve" ||
                            item.status === "Rejected"
                          }
                          onClick={() =>
                            approveTransaction(item.id, currentUser, item.item)
                          }
                          className="mr-2"
                          gradientMonochrome="success"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() =>
                            rejectTransaction(item.id, currentUser)
                          }
                          disabled={
                            item.status == "Approve" ||
                            item.status === "Rejected"
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
        </Table>
      )}
    </div>
  );
};

export default SemTransactionTable;
