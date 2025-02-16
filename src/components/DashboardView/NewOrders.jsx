import useAllOrders from "@/hooks/useAllOrders";
import { PackagePlus } from "lucide-react"

const NewOrders = () => {
    const [allOrders] = useAllOrders();
    const newOrder=allOrders?.filter((order) => order?.status === "Pending") || [];
  return (
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
    <div className="flex flex-row items-center">
      <div className="flex-shrink pr-4">
        <div className="rounded-full p-5 bg-indigo-600">
          <PackagePlus />
        </div>
      </div>
      <div className="flex-1 text-right md:text-center">
        <h2 className="font-bold uppercase text-gray-600">Pending Orders</h2>
        <p className="font-bold text-3xl text-indigo-600">
          {newOrder?.length}
        </p>
      </div>
    </div>
  </div>
  )
}

export default NewOrders