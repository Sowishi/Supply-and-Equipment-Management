import { useState } from "react";
import SemInput from "../components/semInput";
import SemTitle from "../components/semTitle";
import SemTransactionTable from "../components/semTransactionTable";
import useGetTransaction from "../hooks/useGetTransaction";
import DashboardLayout from "../layout/dashboardLayout";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Button } from "flowbite-react";
import { HiOutlineTable, HiUserCircle, HiViewGrid } from "react-icons/hi";
import Loading from "../components/loading";
import RisFormModal from "../components/risFormModal";
import IcsFormModal from "../components/IcsFormModal";
import ParFormModal from "../components/parFormModal";

const Transaction = () => {
  const { data, loading } = useGetTransaction();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentTransaction, setCurrentTransaction] = useState();
  const [risForm, setRisForm] = useState(false);
  const [icsForm, setIcsForm] = useState(false);
  const [parForm, setParForm] = useState(false);

  const filterByCategory = data.filter((item) => {
    if (item.category == category) {
      return item;
    }
  });

  return (
    <DashboardLayout>
      {loading && <Loading />}

      <RisFormModal
        title={`RIS Form`}
        size={"6xl"}
        open={risForm}
        handleClose={() => setRisForm(false)}
        data={currentTransaction}
      />

      <IcsFormModal
        title={`ICS Form`}
        size={"6xl"}
        open={icsForm}
        handleClose={() => setIcsForm(false)}
        data={currentTransaction}
      />

      <ParFormModal
        title={`PAR Form`}
        size={"6xl"}
        open={parForm}
        handleClose={() => setParForm(false)}
        data={currentTransaction}
      />

      {!loading && (
        <div className="wrapper p-0 lg:p-5 m-5 lg:m-0">
          <div className="wrapper flex items-center justify-between">
            <Button.Group className="mb-2">
              <Button
                color={category === "all" ? "info" : "gray"}
                onClick={() => setCategory("all")}
              >
                All
              </Button>
              <Button
                color={category === "Supply" ? "info" : "gray"}
                onClick={() => setCategory("Supply")}
              >
                <HiOutlineTable className="mr-3 h-4 w-4" />
                Supply
              </Button>
              <Button
                color={category === "Equipment" ? "info" : "gray"}
                onClick={() => setCategory("Equipment")}
              >
                <HiViewGrid className="mr-3 h-4 w-4" />
                Equipment
              </Button>
            </Button.Group>
          </div>
          <div className="wrapper my-5">
            <h1 className="text-white font-bold text-3xl">Transaction</h1>
            <p className="text-white">
              This is where you can monitor all the transactions
            </p>
          </div>{" "}
          <SemTransactionTable
            setCurrentTransaction={setCurrentTransaction}
            setIcsForm={setIcsForm}
            setRisForm={setRisForm}
            setParForm={setParForm}
            data={category !== "all" ? filterByCategory : data}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Transaction;
