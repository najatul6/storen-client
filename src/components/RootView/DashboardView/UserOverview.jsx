import Loading from "@/components/common/Loading";
import useAuth from "@/hooks/useAuth";
import useCarts from "@/hooks/useCart";
import useOrders from "@/hooks/useOrders";
import { motion } from "framer-motion";

const UserOverview = () => {
  const { user } = useAuth();
  const [orders, , isLoading] = useOrders();
  const [cart] = useCarts();

  // Format timestamps
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    const date = new Date(parseInt(timestamp));
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long", // Full month name (e.g., January)
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Ensures 12-hour format
    });
  };

  return (
    <div className=" text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {isLoading ? (
         <Loading/>
      ) : (
        <div className="space-y-6">
          {/* User Info Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Welcome, {user?.displayName}!
              </h2>
              <p className="text-sm">
                <span className="font-bold">Email : </span>
                {user?.email}
              </p>
              <p className="text-sm">
                <span className="font-bold">Email Validation : </span>
                {user?.emailVerified ? "Unverified" : "Verified"}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-bold">Account Created : </span>
                {formatDate(user?.metadata?.createdAt)}
              </p>
              <p className="text-sm">
                <span className="font-bold">Last Login : </span>
                {formatDate(user?.metadata?.lastLoginAt)}
              </p>
              <p className="text-sm">
                <span className="font-bold">Last Sign-In : </span>
                {user?.metadata?.lastSignInTime}
              </p>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((cartItem,index) => (
                  <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      ease: "easeOut",
                      duration: 0.6,
                      delay: index * 0.2,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    key={cartItem._id}
                    className="flex justify-between items-center"
                  >
                    <span>{cartItem.productName}</span>
                    <span>
                      {cartItem.quantity} x ${cartItem.price}
                    </span>
                  </motion.div>
                ))}
                <hr />
                <div className="flex justify-between items-center mt-4">
                  <strong>Total: </strong>
                  <span>
                    $
                    {cart
                      .reduce(
                        (total, item) => total + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {/* Recent Orders Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((order) => (
                  <div
                    key={order._id}
                    className="flex justify-between items-center"
                  >
                    <span>Order #{order._id.slice(0, 8)}</span>
                    <span>{order.status}</span>
                    <span className={`${order.status === "Pending" ? "text-red-500" : "text-green-500"}`}> {order.status === "Pending" ? "Unpaid" : "Paid"}</span>
                    <span>
                      $
                      {order.cartItems
                        .reduce(
                          (total, item) => total + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>You have no orders yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOverview;
