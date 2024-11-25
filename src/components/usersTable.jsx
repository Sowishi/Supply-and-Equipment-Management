import { Button, Table, Tooltip, Modal } from "flowbite-react";
import moment from "moment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import useDeleteUser from "../hooks/useDeleteUser";

export function UsersTable({ data }) {
  const { deleteUser } = useDeleteUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      closeModal();
    }
  };

  return (
    <div className="overflow-x-auto">
      {data && (
        <Table striped>
          <Table.Head>
            <Table.HeadCell className="bg-white text-gray-900">
              Full Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Email
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Contact
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Office Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Role
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Created At
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Password
            </Table.HeadCell>
            <Table.HeadCell className="bg-white text-gray-900">
              Action
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item) => {
              const firebaseDate = item?.createdAt;
              const date =
                firebaseDate && typeof firebaseDate.toDate === "function"
                  ? moment(firebaseDate.toDate()).format("LLL")
                  : "Invalid Date";

              return (
                <Table.Row key={item.id}>
                  <Table.Cell className="bg-white text-gray-900 font-bold">
                    {item.firstName +
                      " " +
                      item.middleName +
                      " " +
                      item.lastName}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-900">
                    {item.email}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-900">
                    {item.contact}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-900">
                    {item.office ? item.office : "Supply Office"}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-900">
                    {item.role}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-900">
                    {date}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-900">
                    {item.password}
                  </Table.Cell>
                  <Table.Cell className="bg-white text-gray-900">
                    <Button onClick={() => openModal(item)} color={"failure"}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}

      {/* Confirmation Modal */}
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <div className="flex items-center">
            <HiOutlineExclamationCircle className="text-red-600 mr-2 text-xl" />
            <span>
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </span>
              ?
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={confirmDelete}>
            Yes, Delete
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
