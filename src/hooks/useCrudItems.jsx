import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const useCrudItems = () => {
  const colRef = collection(db, "items");
  const [data, setData] = useState([]);

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = { ...doc.data(), docID: doc.id };
        output.push(data);
      });
      setData(output);
    });
  }, []);
  const handleAddItem = (item, data) => {
    addDoc(colRef, {
      ...item,
      category: data.category,
      supplier: data.supplier,
      createdAt: serverTimestamp(),
    });
  };

  return { handleAddItem, data };
};

export default useCrudItems;
