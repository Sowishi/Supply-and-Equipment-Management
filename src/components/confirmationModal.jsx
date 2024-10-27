import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmationModal({
  open,
  handleClose,
  event,
  success,
  text,
}) {
  return (
    <>
      <Modal show={open} size="md" onClose={handleClose} popup>
        <Modal.Header />
        {success ? (
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to update the status as {text} ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="success" onClick={event}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={event}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}
