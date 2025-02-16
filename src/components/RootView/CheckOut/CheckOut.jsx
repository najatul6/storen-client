import useCarts from "@/hooks/useCart";
import CheckOutDataForm from "./CheckOutDataForm";

const CheckOut = () => {
  const [cart] = useCarts();
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Side - Cart Items */}
      <div className="bg-black lg:w-1/2 px-4 sm:px-6 lg:px-12 py-6 lg:py-12 flex flex-col overflow-y-auto h-72 lg:h-screen">
        <div className="w-full space-y-6 text-center text-primary-foreground">
          {/* Title */}
          <h1 className="text-2xl font-extrabold tracking-tight flex justify-between items-center">
            Your selected Products: {cart.length || 0}
            <span className="text-baseColor">Total: {totalPrice}৳</span>
          </h1>
          <hr />
        </div>

        {/* Cart Items Section - This will be scrollable */}
        <div className="flex-grow overflow-y-auto no-scrollbar mt-5 p-2">
          <div className="grid gap-4 py-4">
            {cart.map((product, index) => (
              <div key={product._id} className="flex items-center gap-2">
                {/* Item Number */}
                <span className="text-lg font-bold">{index + 1}.</span>

                {/* Product Details */}
                <div className="border p-2 rounded-md flex-grow">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold">
                      {product?.productName}
                    </h1>
                    <p className="text-lg font-bold">{product?.price}৳</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="px-4 capitalize">
                      Quantity: {product.quantity}
                    </span>
                    <span className="px-4 capitalize">
                      Total Price: {product.price * product.quantity}৳
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Checkout Form */}
      <div className="flex flex-col flex-1 justify-center items-center bg-gray-200">
        <div className="w-full">
          <CheckOutDataForm totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
