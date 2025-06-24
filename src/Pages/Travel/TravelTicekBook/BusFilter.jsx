import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useTravelContext from "../../../Hooks/TrevalHook/useTravelContext";

const BusFilter = () => {
  const { darkMode } = useAuth();
  const { allBusData, setFilterBus } = useTravelContext();

  const [filters, setFilters] = useState({
    ac: false,
    nonAc: false,
    shohagh: false,
    greenLine: false,
  });

  const handleChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleReset = () => {
    setFilters({
      ac: false,
      nonAc: false,
      shohagh: false,
      greenLine: false,
    });
  };

  useEffect(() => {
    const result = allBusData.filter((bus) => {
      const matchAC =
        (filters.ac && bus.type === "AC") ||
        (filters.nonAc && bus.type === "Non AC") ||
        (!filters.ac && !filters.nonAc); // Show all if none selected

      const matchOperator =
        (filters.shohagh && bus.operator === "Shohagh Paribahan") ||
        (filters.greenLine && bus.operator === "Green Line Paribahan") ||
        (!filters.shohagh && !filters.greenLine); // Show all if none selected

      return matchAC && matchOperator;
    });

    setFilterBus(result);
  }, [filters, allBusData, setFilterBus]);

  return (
    <div
      className={`hidden lg:flex flex-col gap-2  ${
        darkMode ? " text-white" : "text-[#111111]"
      }`}
    >
      {/* Header with Reset */}
      <div className="flex gap-5">
        <h2 className="text-xl font-semibold">Filter</h2>
        <button
          onClick={handleReset}
          className="btn btn-sm bg-white border-main text-main"
        >
          RESET
        </button>
      </div>

      {/* Bus Type Filter */}
      <div className="flex flex-col gap-2">
        <h3 className="text-supporting mb-2">Bus type</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.ac}
            onChange={() => handleChange("ac")}
            className="checkbox checked:bg-white bg-white"
          />
          <p>AC</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.nonAc}
            onChange={() => handleChange("nonAc")}
            className="checkbox checked:bg-white bg-white"
          />
          <p>Non AC</p>
        </div>
      </div>

      {/* Operator Filter */}
      <div className="flex flex-col gap-2 mt-2">
        <h3 className="text-supporting mb-2">Operator</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.shohagh}
            onChange={() => handleChange("shohagh")}
            className="checkbox checked:bg-white bg-white"
          />
          <p>Shohagh Paribahan</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.greenLine}
            onChange={() => handleChange("greenLine")}
            className="checkbox checked:bg-white bg-white"
          />
          <p>Green Line Paribahan</p>
        </div>
      </div>
    </div>
  );
};

export default BusFilter;
