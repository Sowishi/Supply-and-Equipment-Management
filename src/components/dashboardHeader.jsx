import { HiMenu, HiShoppingCart } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Badge, Tooltip, Modal } from "flowbite-react";
import { useState } from "react";
import { useSemStore } from "../zustand/store";

const DashboardHeader = ({ handleOpenSidebar, setCartModal }) => {
  const { currentUser, cartSupply, cartEquipment } = useSemStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ...currentUser,
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const isAdmin = currentUser.role === "Admin";
  const totalCartLength = cartSupply.length + cartEquipment.length;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePasswords = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validatePasswords()) return;

    const updatedData = { ...formData };
    delete updatedData.confirmPassword; // Remove confirmPassword before submitting

    // Handle the update logic here, such as sending updatedData to the backend
    console.log("Updated data:", updatedData);
    setIsModalOpen(false);
  };

  return (
    <div className="header-wrapper flex items-center justify-between py-10 lg:mb-0 p-5 lg:p-8 lg:mx-10">
      <HiMenu
        className="cursor-pointer mr-5"
        onClick={handleOpenSidebar}
        size={30}
        color="white"
      />

      <div className="user-wrapper flex-row flex items-center">
        <div className="wrapper mr-10">
          <p className="text-blue-500 text-xs lg:text-sm">Logged in as</p>
          <h1 className="text-white text-sm lg:text-xl">
            {currentUser?.firstName} {currentUser?.lastName} -{" "}
            <span className="font-bold">{currentUser?.role}</span>{" "}
          </h1>
          <p className="text-blue-300 font-bold mt-1">{currentUser?.office}</p>
        </div>
        <Tooltip content={`Email used: ${currentUser?.email}`}>
          <FaUserCircle
            className="cursor-pointer"
            size={30}
            color="white"
            onClick={() => setIsModalOpen(true)}
          />
        </Tooltip>
        {!isAdmin && (
          <Tooltip content={"Your item cart"}>
            <div className="flex cursor-pointer mx-5">
              <HiShoppingCart
                onClick={() => setCartModal(true)}
                size={30}
                color="white"
              />
              <Badge>{totalCartLength}</Badge>
            </div>
          </Tooltip>
        )}
      </div>

      {/* User Info Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Edit User Information</Modal.Header>
        <Modal.Body>
          <form className="space-y-4">
            {/* Editable Fields */}
            <div>
              <label className="block font-bold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Gender</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Office</label>
              <input
                type="text"
                name="office"
                value={formData.office}
                readOnly
                className="w-full border px-3 py-2 rounded bg-gray-200"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                readOnly
                className="w-full border px-3 py-2 rounded bg-gray-200"
              />
            </div>

            {/* Password Fields */}
            <div>
              <label className="block font-bold text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardHeader;
