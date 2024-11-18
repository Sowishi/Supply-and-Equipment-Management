import { Button, Table, Tooltip } from "flowbite-react";
import moment from "moment";
import { HiLogin, HiOutlineCog, HiTrash } from "react-icons/hi";
import { useSemStore } from "../zustand/store";
import useDeleteUser from "../hooks/useDeleteUser";

export function UsersTable({ data }) {
  const { deleteUser } = useDeleteUser();

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
              const date = moment(firebaseDate?.toDate()).format("LLL");

              return (
                <Table.Row key={item.id}>
                  <Table.Cell className="bg-white text-gray-900 font-bold">
                    {item.firstName +
                      " " +
                      item.middleName +
                      " " +
                      item.lastName}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-white text-gray-900">
                    {item.email}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-white text-gray-900">
                    {item.contact}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-white text-gray-900">
                    {item.office ? item.office : "---"}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-white text-gray-900">
                    {item.role}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-white text-gray-900">
                    {date}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-white text-gray-900">
                    {item.password}
                  </Table.Cell>{" "}
                  <Table.Cell className="bg-white text-gray-900">
                    <Button
                      onClick={() => {
                        deleteUser(item.id);
                      }}
                      color={"failure"}
                    >
                      Delete
                    </Button>
                  </Table.Cell>{" "}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
