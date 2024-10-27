import useCrudRequest from "../hooks/useCrudRequest";
import { InspectionTable } from "../components/inspectionTable";

const Inspection = ({ cart }) => {
  const { data } = useCrudRequest();

  return (
    <>
      <div className="wrapper p-0 lg:p-5">
        <div className="wrapper mb-5">
          <h1 className="text-white font-bold text-3xl">
            Inspection & Acceptance
          </h1>
          <p className="text-white">
            This is where you can inspect the fully delivered items and update
            the status
          </p>
        </div>

        <InspectionTable data={data} />
      </div>
    </>
  );
};

export default Inspection;
