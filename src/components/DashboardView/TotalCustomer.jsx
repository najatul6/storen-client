import useAllUser from "@/hooks/useAllUser";
import { Users } from "lucide-react"

const TotalCustomer = () => {
    const [allUser] = useAllUser();
  return (
    <div className="bg-gradient-to-b from-pink-300 to-pink-200 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
    <div className="flex flex-row items-center">
      <div className="flex-shrink pr-4">
        <div className="rounded-full p-5 bg-pink-600">
          <Users />
        </div>
      </div>
      <div className="flex-1 text-right md:text-center">
        <h2 className="font-bold uppercase text-gray-600">
          Total Customers
        </h2>
        <p className="font-bold text-3xl text-pink-500">
          {allUser?.length}
        </p>
      </div>
    </div>
  </div>
  )
}

export default TotalCustomer