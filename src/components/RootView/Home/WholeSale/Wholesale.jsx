import useProduct from "@/hooks/useProduct";
import ProductCardSkeleton from "../../common/ProductCardSkeleton";
import Container from "@/components/common/Container";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartContext } from "@/providers/CartProvider";
import useCarts from "@/hooks/useCart";
import useRole from "@/hooks/useRole";
import { motion } from "framer-motion";

const Wholesale = () => {
  const [products, isLoading] = useProduct();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsCartOpen } = useCartContext();
  const [, refetch] = useCarts();
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
      const { data: existingCart } = await axiosSecure.get(`/carts?email=${user.email}`);
  
      const isAlreadyInCart = existingCart.some(item => item.itemId === product._id);
  
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


  // const addToCart = async (product) => {
  //   if (user && user?.email) {
  //     const cartsItem = {
  //       itemId: product._id,
  //       userEmail: user?.email,
  //       productName: product.productName,
  //       price: product.price,
  //       quantity: product.quantity,
  //       status: "pending",
  //     };
  //     axiosSecure.post("/carts", cartsItem).then((res) => {
  //       if (res.data.insertedId) {
  //         toast.success("Product added to cart successfully");
  //         refetch();
  //         setIsCartOpen(true);
  //       }
  //     });
  //   } else {
  //     navigate("/auth/login", { state: { from: location } });
  //   }
  // };

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
      <span className=" border-b-2 rounded-md border-baseColor">
        Wholesale Price Supply Only
      </span>
      </h1>
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : products?.length > 0 ? (
            products.map((product,index) => (
              <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                ease: "easeOut",
                duration: 0.4,
                delay: index * 0.2,
              }}
              viewport={{ once: true, amount: 0.2 }}
                key={product?._id}
                className="bg-background2 shadow-lg md:rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative flex flex-col h-full">
                  <img
                    src={product?.thumbnail}
                    alt={product?.productName}
                    className="w-full h-36 md:h-64 object-cover md:rounded-t-lg"
                  />
                  <div className=" p-2 md:p-4 flex-grow">
                    <div className="flex justify-between items-center mb-3 ">
                      <h3 className="text-xs md:text-xl font-semibold text-white">
                        {product?.productName}
                      </h3>
                      <span className="text-xs md:text-lg font-bold text-baseColor flex justify-center items-center">
                        {product?.price || "N/A"}৳
                      </span>
                    </div>
                    {/* Description list */}
                    <ul className="text-sm text-gray-500 hidden md:block">
                      {product.description?.map((desc, index) => (
                        <li key={index} className="list-disc ml-5">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product?.stock === 0}
                    className="text-xs md:text-base font-bold my-2 inline-block md:px-6 py-2 bg-baseColor text-background rounded-md hover:bg-baseColor-dark transition-all w-2/3 mx-auto"
                  >
                    {product?.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
                {product.isPopular && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                    Popular
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg text-gray-500">
              No products available.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Wholesale;
