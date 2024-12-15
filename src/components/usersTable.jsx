import {
  Button,
  Table,
  Tooltip,
  Modal,
  TextInput,
  Label,
} from "flowbite-react";
import moment from "moment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import useDeleteUser from "../hooks/useDeleteUser";
import useUpdateUser from "../hooks/useUpdateUser"; // Import the update user hook

export function UsersTable({ data }) {
  const { deleteUser } = useDeleteUser();
  const { updateUser } = useUpdateUser(); // Hook to update the user
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setUpdatedUser(user); // Pre-fill form with user data
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setUpdatedUser({});
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      closeDeleteModal();
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const confirmUpdate = () => {
    if (updatedUser) {
      updateUser(updatedUser.id, updatedUser);
      closeEditModal();
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
                    <div className="flex space-x-2">
                      <Button onClick={() => openEditModal(item)} color="info">
                        Edit
                      </Button>
                      <Button
                        onClick={() => openDeleteModal(item)}
                        color="failure"
                      >
                        Delete
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
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
          <Button color="gray" onClick={closeDeleteModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={isEditModalOpen} onClose={closeEditModal}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body>
          <form className="space-y-4">
            <div>
              <Label htmlFor="firstName" value="First Name" />
              <TextInput
                id="firstName"
                name="firstName"
                value={updatedUser.firstName || ""}
                onChange={handleUpdateChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName" value="Last Name" />
              <TextInput
                id="lastName"
                name="lastName"
                value={updatedUser.lastName || ""}
                onChange={handleUpdateChange}
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                type="email"
                value={updatedUser.email || ""}
                onChange={handleUpdateChange}
              />
            </div>
            <div>
              <Label htmlFor="contact" value="Contact" />
              <TextInput
                id="contact"
                name="contact"
                value={updatedUser.contact || ""}
                onChange={handleUpdateChange}
              />
            </div>
            <div>
              <Label htmlFor="role" value="Role" />
              <TextInput
                id="role"
                name="role"
                value={updatedUser.role || ""}
                onChange={handleUpdateChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={confirmUpdate}>
            Save Changes
          </Button>
          <Button color="gray" onClick={closeEditModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
