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
    setUser(JSON.parse(snapshot.data().currentUser));
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
            <h1 className="text-4xl ml-5 font-bold text-white">
              CNSC Property
            </h1>
          </div>
          <div className="content mt-10 p-5">
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-lg text-red-500 font-bold">
                  Classification
                </h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-lg text-black">
                  {transaction.item[0].name}
                </h1>
              </div>
            </div>
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-lg text-red-500 font-bold">
                  Property Number
                </h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-lg text-black">
                  {" "}
                  {transaction.item[0].propertyNumber}
                </h1>
              </div>
            </div>
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-lg text-red-500 font-bold">
                  End User/Location
                </h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-lg text-black font-bold">
                  {user.address + " -- "}
                </h1>
                <h1 className="text-lg text-black">
                  {user.firstName + " " + user.lastName}
                </h1>
              </div>
            </div>
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-lg text-red-500 font-bold">
                  Date Accquired
                </h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-lg text-black">
                  {moment(transaction.createdAt.toDate()).format("LLL")}
                </h1>
              </div>
            </div>
            <div className="card flex my-2">
              <div className="basis-5/12">
                <h1 className="text-lg text-red-500 font-bold">Supplier</h1>
              </div>
              <div className="basis-7/12 border-b-2 border-red-500">
                <h1 className="text-lg text-black">Admin</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTransaction;
