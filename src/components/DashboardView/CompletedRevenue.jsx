import useTotalRevenue from "@/hooks/useTotalRevenue";
import { Wallet } from "lucide-react";

const CompletedRevenue = () => {
  const { completedRevenue } = useTotalRevenue();
  return (
    <div className="bg-gradient-to-b from-green-600 to-green-300 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded-full p-5 bg-green-600">
            <Wallet />
          </div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h2 className="font-bold uppercase text-gray-200">Owned Revenue</h2>
          <p className="font-bold text-3xl text-white">
            ${completedRevenue.toLocaleString()}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletedRevenue;
