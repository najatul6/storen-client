import useAllOrders from "@/hooks/useAllOrders";
import { Truck } from "lucide-react";

const TotalOrders = () => {
  const [allOrders] = useAllOrders();
  const totalOrder =
    allOrders?.filter((order) => order?.status && order.status === "Complete") ||
    [];
  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded-full p-5 bg-blue-600">
            <Truck />
          </div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h2 className="font-bold uppercase text-gray-600">Complete Orders</h2>
          <p className="font-bold text-3xl text-blue-600">
            {totalOrder?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalOrders;
