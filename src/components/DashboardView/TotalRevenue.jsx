import useTotalRevenue from "@/hooks/useTotalRevenue";
import { ChartNoAxesCombined } from "lucide-react";

const TotalRevenue = () => {
  const { totalRevenue } = useTotalRevenue();
  return (
    <div className="bg-gradient-to-b from-purple-600 to-purple-400 border-b-4 border-purple-500 rounded-lg shadow-xl p-5">
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded-full p-5 bg-purple-500">
            <ChartNoAxesCombined />
          </div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h2 className="font-bold uppercase text-gray-200">Total Revenue</h2>
          <p className="font-bold text-3xl text-white">
            ${totalRevenue.toLocaleString()}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;
