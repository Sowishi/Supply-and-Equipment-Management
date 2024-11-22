import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useCallback } from "react";

const useUpdateUser = () => {
  const updateUser = useCallback(async (id, data) => {
    try {
      console.log("Data to update:", data);
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, data);
      console.log("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Re-throw error for handling in calling code
    }
  }, []);

  return { updateUser };
};

export default useUpdateUser;
