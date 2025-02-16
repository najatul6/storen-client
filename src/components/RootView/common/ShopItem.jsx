import Lottie from "lottie-react";
import sorry from "../../../assets/Animations/sorry.json";
import PropTypes from "prop-types";
import useAuth from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCarts from "@/hooks/useCart";
import { toast } from "react-toastify";
import { useCartContext } from "@/providers/CartProvider";
import useRole from "@/hooks/useRole";
import { motion } from "framer-motion";

const ShopItem = ({ item }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCarts();
  const { setIsCartOpen } = useCartContext();
  const [userRole] = useRole();

  const addToCart = async (product) => {
    if (!user || !user?.email) {
      return navigate("/auth/login", { state: { from: location } });
    }
    if (userRole !== "user") {
      toast.error("Only customers can add products to cart");
      return navigate("/dashboard/overview", { state: { from: location } });
    }

    try {
      // Check if the product already exists in the cart
      const { data: existingCart } = await axiosSecure.get(
        `/carts?email=${user.email}`
      );

      const isAlreadyInCart = existingCart.some(
        (item) => item.itemId === product._id
      );

      if (isAlreadyInCart) {
        return toast.error("Product already in cart");
      }

      // If not in cart, add the product
      const cartsItem = {
        itemId: product._id,
        userEmail: user.email,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        status: "pending",
      };

      const { data } = await axiosSecure.post("/carts", cartsItem);
      if (data.insertedId) {
        toast.success("Product added to cart successfully");
        refetch(); // Refresh cart data
        setIsCartOpen(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {!item || item.length === 0 ? (
        <div className="flex flex-col justify-center items-center col-span-full">
          <div className="w-40 h-40 mb-4">
            <Lottie animationData={sorry} />
          </div>
          <p className="text-center text-xl text-gray-500">
            No products available in this category.
          </p>
        </div>
      ) : (
        item.map((product, index) => {
          const isOutOfStock = product?.stock === 0;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ damping: 20, duration: 0.4, delay: index * 0.2 }}
              key={product?._id}
              className="bg-background2 shadow-lg md:rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative flex flex-col h-full">
                <img
                  src={product?.thumbnail}
                  alt={product?.productName}
                  className="w-full h-36 md:h-64 object-cover md:rounded-t-lg"
                />
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs md:text-xl font-semibold text-white">
                      {product?.productName}
                    </h3>
                    <span className="text-xs md:text-lg font-bold text-baseColor flex justify-center items-center">
                      {product?.price || "N/A"}৳
                    </span>
                  </div>
                  {/* Description list */}
                  {product.description?.length > 0 && (
                    <ul className="text-sm text-gray-500 hidden md:block">
                      {product.description.map((desc, index) => (
                        <li key={index} className="list-disc ml-5">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={isOutOfStock}
                  aria-disabled={isOutOfStock}
                  className={`text-xs md:text-base font-bold my-2 inline-block md:px-6 py-2 rounded-md transition-all w-2/3 mx-auto ${
                    isOutOfStock
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-baseColor text-background hover:bg-baseColor-dark"
                  }`}
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>

              {product.isPopular && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                  Popular
                </div>
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
};

ShopItem.propTypes = {
  item: PropTypes.array,
};

export default ShopItem;
