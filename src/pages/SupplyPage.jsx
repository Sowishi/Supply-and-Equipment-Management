import useCrudRequest from "../hooks/useCrudRequest";
import { InspectionTable } from "../components/inspectionTable";
import { EquipmentTable } from "../components/equipmentTable";
import useCrudItems from "../hooks/useCrudItems";
import { SupplyTable } from "../components/supplyTable";

const SupplyPage = ({ isClient }) => {
  const { data } = useCrudItems();

  return (
    <>
      <div className="wrapper p-0 lg:p-5">
        <div className="wrapper mb-5">
          <h1 className="text-white font-bold text-3xl">Supplies</h1>
          <p className="text-white">
            This is where you can see all the available supplies
          </p>
        </div>

        <SupplyTable isClient={isClient} data={data} />
      </div>
    </>
  );
};

export default SupplyPage;
