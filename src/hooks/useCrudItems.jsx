import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const useCrudItems = () => {
  const colRef = collection(db, "items");

  const handleAddItem = (item, category) => {
    addDoc(colRef, { ...item, category });
  };

  return { handleAddItem };
};

export default useCrudItems;
