import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAllOrders from "@/hooks/useAllOrders";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const ProcessingOrders = () => {
  const [allOrders, refetch] = useAllOrders();
  const axiosSecure = useAxiosSecure();
  const totalOrder =
    allOrders?.filter(
      (order) => order?.status && order.status === "Processing"
    ) || [];
  const [search, setSearch] = useState("");
  // Filter orders based on search input
  const filteredOrders =
    totalOrder?.filter((order) => {
      const customerName = order.customer ? order.customer.toLowerCase() : "";
      const orderId = order._id ? order._id.toString() : "";
      return (
        customerName.includes(search.toLowerCase()) || orderId.includes(search)
      );
    }) || [];

  // View Order Details in SweetAlert
  const handleView = (order) => {
    Swal.fire({
      title: `Order Details - ${order._id}`,
      html: `
            <div style='text-align:left'>
              <p><strong>Customer:</strong> ${order.fullName}</p>
              <p><strong>Email:</strong> ${order.userEmail}</p>
              <p><strong>WhatsappNumber:</strong> ${order.whatsappNumber}</p>
              <p><strong>CompanyUrl:</strong> ${order.companyUrl || "N/A"}</p>
              <p><strong>SkypeId:</strong> ${order.skypeId || "N/A"}</p>
              <p><strong>Total Price:</strong> $${order.totalPrice.toFixed(
                2
              )}</p>
              <p><strong>Items:</strong></p>
              <ul>${order.cartItems
                .map(
                  (item) => `<li>${item.productName} - ${item.quantity}</li>`
                )
                .join("")}</ul>
            </div>`,
      confirmButtonText: "Close",
      confirmButtonColor: "#3085d6",
    });
  };

  // Update Order Status with SweetAlert2
  const handleStatusUpdate = async (order) => {
    const { value: newStatus } = await Swal.fire({
      title: "Update Order Status",
      input: "select",
      inputOptions: {
        Pending: "Pending",
        Processing: "Processing",
        Complete: "Completed",
      },
      inputValue: order.status,
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (newStatus && newStatus !== order.status) {
      try {
        await axiosSecure.put(`/orders/${order._id}`, { status: newStatus });
        Swal.fire("Updated!", "Order status has been updated.", "success");
        refetch(); // Refresh orders after update
      } catch (error) {
        Swal.fire("Error!", "Failed to update order status.", error);
      }
    }
  };

  // Delete Order with SweetAlert2
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/orders/${id}`);
          if (response.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Order has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Error!", "Failed to delete order.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete order.", error);
        }
      }
    });
  };

  return (
    <div className="p-6 w-full">
      {/* Helmet for title and meta tags Start here */}
      <Helmet>
        <title>Processing Orders | NiN Supply</title>
        <meta
          name="description"
          content="Track and manage processing orders on NiN Supply to ensure timely fulfillment."
        />
        <meta
          name="keywords"
          content="processing orders, order management, order tracking, ecommerce, NiN Supply, pending fulfillment"
        />
        <meta name="author" content="NiN Supply" />

        {/* Open Graph for social media previews */}
        <meta property="og:title" content="Processing Orders | NiN Supply" />
        <meta
          property="og:description"
          content="Track and manage processing orders on NiN Supply to ensure timely fulfillment."
        />
        <meta
          property="og:image"
          content="https://nin-supply.vercel.app/processing-orders-og.jpg"
        />
        <meta
          property="og:url"
          content="https://nin-supply.vercel.app/processing-orders"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card for better previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Processing Orders | NiN Supply" />
        <meta
          name="twitter:description"
          content="Track and manage processing orders on NiN Supply to ensure timely fulfillment."
        />
        <meta
          name="twitter:image"
          content="https://nin-supply.vercel.app/twitter-processing-orders.jpg"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://nin-supply.vercel.app/processing-orders"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://nin-supply.vercel.app/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>

      {/* Helmet for title and meta tags End here */}

      <h2 className="text-2xl font-semibold mb-6">
        Orders Processing Management
      </h2>

      {/* Search Bar */}
      <div className="flex justify-end items-center mb-4">
        <Input
          type="text"
          placeholder="Search by order ID or customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 border border-gray-300 rounded-lg p-2"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <Table className="w-full border-collapse">
          <TableHeader className="border-b bg-gray-500 text-white">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-baseColor border-r">Items</TableHead>
              <TableHead className="text-baseColor border-r">
                Customer Name
              </TableHead>
              <TableHead className="text-baseColor border-r">
                Total ($)
              </TableHead>
              <TableHead className="text-baseColor border-r">Status</TableHead>
              <TableHead className="text-baseColor border-r">Date</TableHead>
              <TableHead className="text-baseColor w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((order) => (
                <TableRow
                  key={order._id}
                  className="border-b hover:bg-background2 transition-all"
                >
                  <TableCell className="py-3 px-4 border-r">
                    {order.cartItems.map((item) => (
                      <ul key={item._id} className="list-disc pl-1">
                        <li>
                          {item?.productName} - {item?.quantity}
                        </li>
                      </ul>
                    ))}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-r">
                    {order?.fullName}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-r">
                    ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-r">
                    <span
                      className={`px-3 py-1 rounded text-white text-sm font-medium bg-blue-500`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-r">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="flex flex-grow gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-green-600"
                      onClick={() => handleView(order)}
                      title="View Order Details"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-baseColor"
                      onClick={() => handleStatusUpdate(order)}
                      title="Update Order Status"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-600"
                      onClick={() => handleDelete(order._id)}
                      title="Delete Order"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="6"
                  className="text-center text-gray-500 py-4"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProcessingOrders;


