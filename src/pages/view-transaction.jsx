import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import logo from "../assets/CN.jpg";

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
    <div className="w-full h-screen bg-gray-50 flex justify-center items-center">
      {user && transaction && (
        <div className="w-full max-w-md bg-white border border-gray-300 shadow-md rounded-lg">
          {/* Header */}
          <div
            className="flex items-center justify-between p-4"
            style={{ backgroundColor: "#9E1B21" }}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <h1 className="text-lg font-bold text-white">CNSC PROPERTY</h1>
          </div>

          {/* Table Content */}
          <div className="p-4">
            <div className="flex justify-between items-center border-t border-gray-300 py-2">
              <span className="text-sm text-[#9E1B21]">Classication:</span>
              <span className="text-sm text-gray-800">Equipment</span>
            </div>

            {transaction.item.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-t border-gray-300 py-2"
              >
                <span className="text-sm text-[#9E1B21]">
                  Property Number: #{item.id}
                </span>
                <span className="text-sm text-gray-800">
                  {item.description}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center border-t border-gray-300 py-2">
              <span className="text-sm text-[#9E1B21]">Location:</span>
              <span className="text-sm text-gray-800">{user.address}</span>
            </div>

            <div className="flex justify-between items-center border-t border-gray-300 py-2">
              <span className="text-sm text-[#9E1B21]">End User:</span>
              <div className="flex flex-col">
                {" "}
                <span className="text-sm text-gray-800 font-bold">
                  {user.firstName} {user.lastName}
                </span>
                <span
                  style={{ fontSize: 10 }}
                  className="text-gray-800 font-bold"
                >
                  {user.office}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-300 py-2">
              <span className="text-sm text-[#9E1B21]">Date Acquired:</span>
              <span className="text-sm text-gray-800">
                {moment(transaction.createdAt.toDate()).format("LLL")}
              </span>
            </div>

            <div className="flex justify-between items-center border-t border-gray-300 py-2">
              <span className="text-sm text-[#9E1B21]">Supplier:</span>
              <span className="text-sm text-gray-800">
                {transaction.item[0].supplier}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTransaction;
