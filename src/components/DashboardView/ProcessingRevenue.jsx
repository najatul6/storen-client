import useTotalRevenue from "@/hooks/useTotalRevenue"
import { ChartScatter } from "lucide-react"

const ProcessingRevenue = () => {
    const {processingRevenue}=useTotalRevenue()
    return (
      <div className="bg-gradient-to-b from-blue-600 to-blue-300 border-b-4 border-blue-600 rounded-lg shadow-xl p-5">
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded-full p-5 bg-blue-600">
          <ChartScatter />
          </div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h2 className="font-bold uppercase text-gray-200">
            UpComing Revenue
          </h2>
          <p className="font-bold text-3xl text-white">${processingRevenue.toLocaleString()} </p>
        </div>
      </div>
    </div>
    )
}

export default ProcessingRevenue