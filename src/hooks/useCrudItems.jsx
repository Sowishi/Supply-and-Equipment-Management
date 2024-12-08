import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
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
  const handleAddItem = async (item, info) => {
    const existingItem = data.find((d) => d.description == item.description);

    if (existingItem) {
      // Update the quantity of the existing item
      const docRef = doc(db, "items", existingItem.docID);
      const newQuantity =
        parseInt(existingItem.quantity) + parseInt(item.quantity || 0);
      await updateDoc(docRef, {
        quantity: newQuantity,
      });
    } else {
      await addDoc(colRef, {
        ...item,
        category: info.category,
        supplier: info.supplier,
        fundCluster: info.fundCluster,
        createdAt: serverTimestamp(),
      });
    }
  };

  const handleDecrementQuantity = async (item) => {
    item.item.map(async (data) => {
      const docRef = doc(db, "items", data.docID);
      const docSnap = await getDoc(docRef);
      const currentQuantity = parseInt(docSnap.data().quantity);

      updateDoc(docRef, {
        quantity: currentQuantity - parseInt(data.borrowedQuantity),
      });
    });
  };

  return { handleAddItem, data, handleDecrementQuantity };
};

export default useCrudItems;
