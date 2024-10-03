import { useParams } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Table } from "flowbite-react";
import moment from "moment";

const ViewTransaction = () => {
  const { id } = useParams();

  const [transaction, setTransaction] = useState();
  const [user, setUser] = useState();

  const getTransaction = async () => {
    const docRef = doc(db, "transaction", id);
    const snapshot = await getDoc(docRef);
    setTransaction(snapshot.data());
    setUser(JSON.parse(snapshot.data().currentUser));
  };

  useEffect(() => {
    getTransaction();
  }, []);

  console.log(user);
  return (
    <div className="w-full h-screen bg-slate-950 overflow-scroll">
      {user && transaction && (
        <>
          <div className="container mx-auto py-10 px-10">
            <h1 className="text-3xl text-white font-bold">
              Transaction Details
            </h1>
            <div className="flex flex-wrap">
              <div className="basis-full my-10">
                <h1 className="text-white font-bold text-2xl mb-1">Borrower</h1>
                <Table>
                  <Table.Head>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Full Name
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Office Name
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Contact
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Email
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Role
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    <Table.Row>
                      <Table.Cell className="bg-slate-800  text-white">
                        {user.firstName + " " + user.lastName}
                      </Table.Cell>
                      <Table.Cell className="bg-slate-800  text-white">
                        {user.office}
                      </Table.Cell>
                      <Table.Cell className="bg-slate-800  text-white">
                        {user.contact}
                      </Table.Cell>
                      <Table.Cell className="bg-slate-800  text-white">
                        {user.email}
                      </Table.Cell>
                      <Table.Cell className="bg-slate-800  text-white">
                        {user.role}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>

              <div className="basis-full my-10">
                <h1 className="text-white font-bold text-2xl mb-1">
                  Approve By
                </h1>
                <Table>
                  <Table.Head>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Full Name
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Date Review
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Stattus
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    <Table.Row>
                      <Table.Cell className="bg-slate-800  text-white">
                        {transaction.reviewBy}
                      </Table.Cell>
                      <Table.Cell className="bg-slate-800  text-white">
                        {moment(transaction.reviewDate.toDate()).format("LLL")}
                      </Table.Cell>
                      <Table.Cell className="bg-slate-800  text-white">
                        {transaction.status}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>

              <div className="basis-full my-10">
                <h1 className="text-white font-bold text-2xl mb-1">
                  Equipment
                </h1>
                <Table>
                  <Table.Head>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Name
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Description
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-transparent text-gray-200 bg-slate-500">
                      Property Number
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {transaction.item.map((item) => {
                      return (
                        <Table.Row key={item.id}>
                          <Table.Cell className="bg-slate-800  text-white">
                            {item.name}
                          </Table.Cell>
                          <Table.Cell className="bg-slate-800  text-white">
                            {item.description}
                          </Table.Cell>
                          <Table.Cell className="bg-slate-800  text-white">
                            {item.propertyNumber}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewTransaction;
