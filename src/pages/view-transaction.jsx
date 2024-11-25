import { useParams } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Table } from "flowbite-react";
import moment from "moment";
import logo from "../assets/CN-removebg-preview.png";

const ViewTransaction = () => {
  const { id } = useParams();

  const [transaction, setTransaction] = useState();
  const [user, setUser] = useState();

  const getTransaction = async () => {
    const docRef = doc(db, "transaction", id);
    const snapshot = await getDoc(docRef);

    setTransaction(snapshot.data());
    setUser(JSON.parse(snapshot.data()?.currentUser));
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className="w-full h-screen bg-white overflow-scroll">
      {user && transaction && (
        <div className="container mx-auto h-screen">
          <div
            className="header flex items-center justify-start p-5"
            style={{ background: "#835863" }}
          >
            <img width={80} src={logo} alt="" />
            <h1 className="text-4xl ml-5  text-white">CNSC Property</h1>
          </div>
          <div className="content mt-10 p-5">
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-md text-red-500 ">Classification</h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-md text-black">Equipment</h1>
              </div>
            </div>
            {transaction.item.map((item) => {
              return (
                <div className="card flex my-2">
                  <div className="basis-5/12">
                    <h1 className="text-md text-red-500 ">
                      Property Number: #{item.id}
                    </h1>
                  </div>
                  <div className="basis-7/12 border-b-2 border-red-500">
                    <h1 className="text-md text-black">{item.description}</h1>
                  </div>
                </div>
              );
            })}
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-md text-red-500 ">Location</h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-md text-black ">{user.address + " -- "}</h1>
              </div>
            </div>
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-md text-red-500 ">End User</h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-md text-black font-bold">
                  {user.firstName + " " + user.lastName}
                </h1>
              </div>
            </div>
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-md text-red-500 ">Date Accquired</h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-md text-black">
                  {moment(transaction.createdAt.toDate()).format("LLL")}
                </h1>
              </div>
            </div>
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-md text-red-500 ">Supplier</h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-md text-black">
                  {transaction.item[0].supplier}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTransaction;
