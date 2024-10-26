import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const useCrudRequest = () => {
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

  const handleAddRequest = (forms, cartSupply) => {
    addDoc(colRef, {
      poNumber: forms.poNumber,
      supplier: forms.supplier,
      category: forms.category,
      fundCluster: forms.fundCluster,
      items: cartSupply,
      status: "Pending",
      createdAt: serverTimestamp(),
    });
  };

  const handleDeleteRequest = (id) => {
    const docRef = doc(db, "supply", id);
    deleteDoc(docRef);
  };

  return { handleAddRequest, data, handleDeleteRequest };
};

export default useCrudRequest;
