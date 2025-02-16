import useAllOrders from "@/hooks/useAllOrders"
import { Weight } from "lucide-react"

const TotalSales = () => {
    const [allOrders]=useAllOrders()
    const totalSale=allOrders.filter(order=>order.status==="Processing")
  return (
    <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
          <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
              <div className="rounded-full p-5 bg-yellow-600">
              <Weight />
              </div>
            </div>
            <div className="flex-1 text-right md:text-center">
              <h2 className="font-bold uppercase text-gray-600">Processing Sales</h2>
              <p className="font-bold text-3xl text-yellow-600">{totalSale?.length}</p>
            </div>
          </div>
        </div>
  )
}

export default TotalSales