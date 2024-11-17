import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCrudRequest = () => {
  const colRef = collection(db, "request");

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        output.push(data);
      });
      setData(output);
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  const handleAddRequest = async (forms, cartSupply) => {
    try {
      let basePoNumber = forms.poNumber;
      let suffix = "";
      let attempts = 0;

      // Extract the base PO number and the current suffix (if any)
      const match = forms.poNumber.match(/^(.+?)(?:-([A-Z]))?$/); // Matches base and optional suffix
      if (match) {
        basePoNumber = match[1]; // Base PO number (e.g., "1738")
        suffix = match[2] || ""; // Existing suffix (e.g., "A"), if present
      }

      while (true) {
        // Query Firestore for documents with the current PO number
        const currentPoNumber = suffix
          ? `${basePoNumber}-${suffix}`
          : basePoNumber;
        const q = query(colRef, where("poNumber", "==", currentPoNumber));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // If no match found, use this PO number
          basePoNumber = currentPoNumber;
          break;
        }

        // If there's a match, calculate the next suffix
        attempts++;
        suffix = String.fromCharCode(64 + attempts); // Generate suffix as A, B, etc.

        if (attempts > 26) {
          throw new Error(
            "Too many duplicates; please use a different PO Number."
          );
        }
      }

      // Add the document with the unique PO number
      await addDoc(colRef, {
        poNumber: basePoNumber,
        supplier: forms.supplier,
        category: forms.category,
        fundCluster: forms.fundCluster,
        items: cartSupply,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      toast.success(`Successfully Requested: ${basePoNumber}`);
    } catch (error) {
      toast.error(error.message);
      throw error; // Re-throw the error so the calling component can handle it
    }
  };

  const handleDeleteRequest = (id) => {
    const docRef = doc(db, "request", id);
    deleteDoc(docRef);
  };

  const handleUpdateStatus = (id, status) => {
    const docRef = doc(db, "request", id);
    updateDoc(docRef, { status });
  };

  return { handleAddRequest, data, handleDeleteRequest, handleUpdateStatus };
};

export default useCrudRequest;
