import Loading from "@/components/common/Loading";
import useOrders from "@/hooks/useOrders";
import { Helmet } from "react-helmet-async";

const MyOrders = () => {
  const [orders, , isLoading] = useOrders();
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp); // No need for Number() conversion
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-6 w-full">
      {/* Helmet for title and meta tags Start here */}
      <Helmet>
        <title>My Orders | NiN Supply</title>
        <meta
          name="description"
          content="View all your orders on NiN Supply, including order details, status, and payment information."
        />
        <meta
          name="keywords"
          content="orders, order history, order status, payment status, NiN Supply"
        />
        <meta name="author" content="NiN Supply" />

        {/* Open Graph for social media previews */}
        <meta property="og:title" content="My Orders | NiN Supply" />
        <meta
          property="og:description"
          content="View all your orders on NiN Supply, including order details, status, and payment information."
        />
        <meta
          property="og:image"
          content="https://nin-supply.vercel.app/orders-og.jpg"
        />
        <meta
          property="og:url"
          content="https://nin-supply.vercel.app/dashboard/orders"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card for better previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Orders | NiN Supply" />
        <meta
          name="twitter:description"
          content="View all your orders on NiN Supply, including order details, status, and payment information."
        />
        <meta
          name="twitter:image"
          content="https://nin-supply.vercel.app/twitter-orders.jpg"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://nin-supply.vercel.app/dashboard/orders"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://nin-supply.vercel.app/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>

      {/* Helmet for title and meta tags End here */}
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      {isLoading ? (
         <Loading/>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-lg border border-white">
            <thead>
              <tr className="bg-baseColor text-gray-700">
                <th className="py-3 px-4 text-left border-r border-black">
                  Items
                </th>
                <th className="py-3 px-4 text-left border-r border-black">
                  Total Price
                </th>
                <th className="py-3 px-4 text-left border-r border-black">
                  Status
                </th>
                <th className="py-3 px-4 text-left border-r border-black ">
                  Date
                </th>
                <th className="py-3 px-4 text-left ">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order?._id} className="border-b hover:bg-gray-500">
                  <td className="py-3 px-4 border border-white text-wrap text-xs">
                    {order.cartItems.map((item) => {
                      return (
                        <ul key={item._id} className="list-disc pl-1">
                          <li>
                            {item?.productName}{" "}
                            <span className="italic"> - </span>
                            {item?.quantity}
                          </li>
                        </ul>
                      );
                    })}
                  </td>
                  <td className="py-3 px-4 border border-white text-wrap">
                    $ {order?.totalPrice || 0}
                  </td>
                  <td className="py-3 px-4 border border-white text-indigo-600 font-semibold">
                    {order?.status}
                  </td>
                  <td className="py-3 px-4 text-wrap border border-white">
                    {formatDate(order?.orderDate)}
                  </td>
                  <td
                    className={`py-3 px-4 text-center ${
                      order.status === "Pending"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status === "Pending" ? "Unpaid" : "Paid"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
