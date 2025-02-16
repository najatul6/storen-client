import useAxiosSecure from "@/hooks/useAxiosSecure";
import PropTypes from "prop-types";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

const OrderCard = ({ product, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleRemove = (id) => {
    axiosSecure.delete(`/carts/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("Product removed from cart successfully");
        refetch();
      }
    });
  };

  return (
    <div className="border p-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">{product?.productName}</h1>
        </div>
        <div>
          <p className="text-lg font-bold">{product?.price}৳</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="px-4 capitalize">
          quantity :{" "}
          <select
            name="quantity"
            value={product?.quantity}
            onChange={(e) => {
              axiosSecure
                .put(`/carts/${product._id}`, {
                  quantity: e.target.value,
                })
                .then((res) => {
                  if (res.data.matchedCount > 0) {
                    toast.success("Quantity updated successfully");
                    refetch();
                  }
                });
            }}
            className="px-2 bg-background border cursor-pointer"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </span>

        <div>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-md"
            onClick={() => handleRemove(product._id)}
          >
            <RiDeleteBin2Fill />
          </button>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  product: PropTypes.object,
  refetch: PropTypes.func,
};

export default OrderCard;
