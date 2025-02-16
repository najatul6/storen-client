import useProduct from "@/hooks/useProduct"
import { Store } from "lucide-react"

const TotalProducts = () => {
    const[products] = useProduct()
  return (
   <div className="bg-gradient-to-b from-orange-200 to-orange-100 border-b-4 border-orange-500 rounded-lg shadow-xl p-5">
             <div className="flex flex-row items-center">
               <div className="flex-shrink pr-4">
                 <div className="rounded-full p-5 bg-orange-600">
                   <Store />
                 </div>
               </div>
               <div className="flex-1 text-right md:text-center">
                 <h2 className="font-bold uppercase text-gray-600">Products</h2>
                 <p className="font-bold text-3xl text-orange-600">
                   {products?.length}
                 </p>
               </div>
             </div>
           </div>
  )
}

export default TotalProducts