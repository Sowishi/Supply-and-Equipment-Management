import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSemStore } from "./zustand/store";
import Transaction from "./pages/transcation";
import MasterRecords from "./pages/masterRecords";
import ViewTransaction from "./pages/view-transaction";

function App() {
  const { currentUser } = useSemStore();
  return (
    <>
      <Routes>
        <Route path="/" element={currentUser ? <MasterRecords /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/master-records"
          element={currentUser ? <MasterRecords /> : <Login />}
        />

        <Route
          path="/transaction"
          element={currentUser ? <Transaction /> : <Login />}
        />

        <Route path="/view-transaction/:id" element={<ViewTransaction />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
