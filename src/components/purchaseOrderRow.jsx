const PurchaseOrderRow = ({
  stockNo,
  unit,
  decription,
  rQuantity,
  stockAvailable,
  iQuantity,
  remarks,
  hide,
}) => {
  return (
    <div className="border border-slate-950 flex border-t-0">
      <div className="basis-2/12 border border-slate-950 p-2 text-center">
        <h1 className={`${hide ? "opacity-0" : ""}`}>{stockNo} </h1>
      </div>
      <div className="basis-6/12 border border-slate-950 p-2 text-center">
        <h1 className={`${hide ? "opacity-0" : ""}`}>{unit}</h1>
      </div>
      <div className="basis-2/12 border border-slate-950 p-2 text-center">
        <h1 className={`${hide ? "opacity-0" : ""}`}>{decription}</h1>
      </div>

      <div className="basis-2/12 border border-slate-950 p-2 text-center">
        <h1 className={`${hide ? "opacity-0" : ""}`}>{rQuantity}</h1>
      </div>
    </div>
  );
};

export default PurchaseOrderRow;
