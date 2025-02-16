import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useProduct from "@/hooks/useProduct";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import ProductFormModal from "@/components/DashboardView/ProductFormModal";
import { Edit, Trash2 } from "lucide-react";
import Loading from "@/components/common/Loading";

const ProductsControl = () => {
  const [products, isLoading, refetch] = useProduct();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleAdd = () => {
    setEditProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditProduct(category);
    setIsModalOpen(true);
  };
  // Handle Delete Product with SweetAlert
  const handleDelete = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/products/${productId}`);
          if (res.data.deletedCount > 0) {
            toast.success("Product deleted successfully!");
            refetch();
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete product!");
        }
      }
    });
  };

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products Control</h2>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <AiOutlinePlus /> Add Product
        </Button>
      </div>

      <div className="flex justify-between items-center gap-6 w-full mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2  bg-transparent border rounded-lg text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h2 className="text-xl font-semibold flex-shrink-0">
          Total Products :{" "}
          {filteredProducts?.length.toString().padStart(2, "0") || 0}
        </h2>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <Table className="border rounded-xl">
            <TableHeader className="bg-gray-500 text-white">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-baseColor border-r text-center">
                  No.
                </TableHead>
                <TableHead className="text-baseColor border-r w-20">
                  Thumbnail
                </TableHead>
                <TableHead className="text-baseColor border-r">
                  Product Name
                </TableHead>
                <TableHead className="text-baseColor border-r">
                  Category
                </TableHead>
                <TableHead className="text-baseColor border-r">Stock</TableHead>
                <TableHead className="text-baseColor border-r">Price</TableHead>
                <TableHead className="text-baseColor border-r">
                  Discount
                </TableHead>
                <TableHead className="text-baseColor w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <TableRow key={product._id} className="hover:bg-gray-600">
                    <TableCell className="text-baseColor border-r text-center">
                      {(index + 1).toString().padStart(2, "0")}
                    </TableCell>
                    <TableCell className="border-r">
                      <img
                        src={product.thumbnail}
                        alt={product.productName}
                        className="w-20 h-14 rounded"
                      />
                    </TableCell>
                    <TableCell className="border-r capitalize">
                      {product.productName}
                    </TableCell>
                    <TableCell className="border-r capitalize">
                      {product.category}
                    </TableCell>
                    <TableCell className=" border-r">{product.stock}</TableCell>
                    <TableCell className=" border-r">
                      ${product.price}
                    </TableCell>
                    <TableCell className="border-r">
                      {product.discount}%
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center items-center min-h-14">
                      <Button
                        onClick={() => handleEdit(product)}
                        variant="outline"
                        size="sm"
                        className="hover:bg-baseColor"
                        title="Edit Product"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                        className="hover:bg-red-600"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8" className="text-center text-gray-400">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {isModalOpen && (
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={editProduct}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ProductsControl;
