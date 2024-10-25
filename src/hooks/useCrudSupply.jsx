import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const useCrudSupply = () => {
  const colRef = collection(db, "supply");

  const [data, setData] = useState([]);

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        output.push(data);
      });
      setData(output);
    });
  }, []);

  const handleAddSupply = (forms, cartSupply) => {
    addDoc(colRef, {
      poNumber: forms.poNumber,
      supplier: forms.supplier,
      items: cartSupply,
      status: "Pending",
      createdAt: serverTimestamp(),
    });
  };

  return { handleAddSupply, data };
};

export default useCrudSupply;
