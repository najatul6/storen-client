import useTotalRevenue from "@/hooks/useTotalRevenue"
import { ChartArea } from "lucide-react"

const PendingRevenue = () => {
    const {pendingRevenue}=useTotalRevenue()
    return (
      <div className="bg-gradient-to-b from-indigo-500 to-indigo-300 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded-full p-5 bg-indigo-500">
          <ChartArea />
          </div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h2 className="font-bold uppercase text-gray-200">
            Pending Revenue
          </h2>
          <p className="font-bold text-3xl text-white">${pendingRevenue.toLocaleString()} </p>
        </div>
      </div>
    </div>
    )
}

export default PendingRevenue