import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const useDeleteUser = () => {
  const deleteUser = (id) => {
    try {
      const colRef = doc(db, "users", id);
      deleteDoc(colRef);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { deleteUser };
};

export default useDeleteUser;
