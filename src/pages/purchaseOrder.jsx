import { HiOutlineTable, HiPlus } from "react-icons/hi";
import ContentHeader from "../components/contentHeader";
import { useState } from "react";
import { toast } from "react-toastify";
import { SemSupplyTable } from "../components/semSupplyTable";
import ConfirmationModal from "../components/confirmationModal";
import AddSupplyModal from "../components/addSupplyModal";
import SemModal from "../components/semModal";
import SemInput from "../components/semInput";
import { Button } from "flowbite-react";
import SemSelect from "../components/semSelect";
import useCrudRequest from "../hooks/useCrudRequest";

const PurchaseOrder = ({ cart }) => {
  //State

  const [supplyModal, setSupplyModal] = useState(false);
  const [addSupplyModal, setAddSupplyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [cartSupply, setCartSupply] = useState([]);
  const [search, setSearch] = useState("");

  const { handleAddRequest, data } = useCrudRequest();
  const [forms, setForms] = useState({
    poNumber: "",
    supplier: "",
    fundCluster: "Regular Agency Fund",
    category: "Supply",
  });

  const handleAddingSupply = () => {
    setSupplyModal(true);
  };

  const handleDelete = (id) => {
    const cartSupplyCopy = [...cartSupply];
    const output = cartSupplyCopy.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });

    setCartSupply(output);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const output = { ...forms, [name]: value };
    setForms(output);
  };

  const handleSubmit = () => {
    handleAddRequest(forms, cartSupply);
    setSupplyModal(false);
    setCartSupply([]);
  };

  return (
    <>
      <ConfirmationModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />

      <AddSupplyModal
        open={addSupplyModal}
        setCartSupply={setCartSupply}
        cartSupply={cartSupply}
        handleClose={() => setAddSupplyModal(false)}
      ></AddSupplyModal>

      {/* Request Supply Modal */}
      <SemModal
        size={"5xl"}
        title={"Request Items"}
        open={supplyModal}
        handleClose={() => setSupplyModal(false)}
      >
        <div className="wrapper my-5">
          <>
            <SemInput
              event={handleChange}
              name={"poNumber"}
              placeholder={"Please enter the PO Number"}
              label={"Purchase Order No."}
            />
            <SemInput
              event={handleChange}
              name={"supplier"}
              placeholder={"Please Enter the supplier"}
              label={"Supplier"}
            />
            <SemSelect
              event={handleChange}
              name={"fundCluter"}
              label={"Fund Cluster"}
              data={[
                "Regular Agency Fund",
                "Internally Generated Fund",
                "Business Related Fund",
                "Trust Receipts",
              ]}
            />
            <SemSelect
              event={handleChange}
              name={"category"}
              label={"Category"}
              data={["Supply", "Equipment"]}
            />
          </>
          <div className="wrapper flex justify-between items-center my-10">
            <h1 className="font-bold">Requested Supplies</h1>
            <Button
              gradientMonochrome="success"
              onClick={() => setAddSupplyModal(true)}
            >
              <HiPlus color="white" className="mr-2 h-5 w-5" />
              Add
            </Button>
          </div>

          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Stock / Property No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Unit
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Quantity
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartSupply.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item?.id}
                      </th>
                      <td class="px-6 py-4">{item?.description}</td>
                      <td class="px-6 py-4">{item?.unit}</td>
                      <td class="px-6 py-4">{item?.quantity}</td>
                      <td>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          color={"failure"}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full py-3"
          gradientMonochrome="success"
        >
          Submit Request
        </Button>
      </SemModal>

      <div className="wrapper p-0 lg:p-5">
        <div className="wrapper mb-5">
          <h1 className="text-white font-bold text-3xl">
            Purchase Order / Request Supplies & Equipment
          </h1>
          <p className="text-white">
            This is where you can request supplies & equipments
          </p>
        </div>

        <ContentHeader
          setSearch={setSearch}
          cart={cart}
          title="Request"
          Icon={HiOutlineTable}
          event={handleAddingSupply}
        />
        <SemSupplyTable data={data} />
      </div>
    </>
  );
};

export default PurchaseOrder;
