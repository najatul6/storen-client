import { useState } from "react";
import useCategory from "@/hooks/useCategory";
import useProduct from "@/hooks/useProduct";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import CategoryFormModal from "@/components/DashboardView/CategoryFormModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Loading from "@/components/common/Loading";

const CategoriesControl = () => {
  const [categories, isLoading, refetch] = useCategory();
  const [products] = useProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const axiosSecure = useAxiosSecure();
  const popularProduct = products.filter(
    (product) => product.isPopular === true
  );
  const handleAdd = () => {
    setEditCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

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
          const response = await axiosSecure.delete(`/category/${id}`);
          if (response.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Category has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Error!", "Failed to delete category.", "error");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  return (
    <div className="p-6 text-white rounded-lg shadow-lg">
      {/* Helmet for title and meta tags Start here */}
      <Helmet>
        <title>Categories Control | NiN Supply</title>
        <meta
          name="description"
          content="Manage product categories efficiently on NiN Supply. Add, edit, and delete categories with ease."
        />
        <meta
          name="keywords"
          content="categories, category management, product categories, ecommerce, NiN Supply, admin panel"
        />
        <meta name="author" content="NiN Supply" />

        {/* Open Graph for social media previews */}
        <meta property="og:title" content="Categories Control | NiN Supply" />
        <meta
          property="og:description"
          content="Manage product categories efficiently on NiN Supply. Add, edit, and delete categories with ease."
        />
        <meta
          property="og:image"
          content="https://nin-supply.vercel.app/categories-control-og.jpg"
        />
        <meta
          property="og:url"
          content="https://nin-supply.vercel.app/categories-control"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card for better previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Categories Control | NiN Supply" />
        <meta
          name="twitter:description"
          content="Manage product categories efficiently on NiN Supply. Add, edit, and delete categories with ease."
        />
        <meta
          name="twitter:image"
          content="https://nin-supply.vercel.app/twitter-categories-control.jpg"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://nin-supply.vercel.app/categories-control"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://nin-supply.vercel.app/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>

      {/* Helmet for title and meta tags End here */}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <AiOutlinePlus /> Add Category
        </Button>
      </div>

      {isLoading ? (
         <Loading/>
      ) : (
        <Table className="border rounded-xl">
          <TableHeader className="bg-gray-500 text-white">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-baseColor border-r">
                Package Name
              </TableHead>
              <TableHead className="text-baseColor border-r">
                Category
              </TableHead>
              <TableHead className="text-baseColor border-r">
                Total Products
              </TableHead>
              <TableHead className="text-baseColor border-r w-36">
                Thumbnail
              </TableHead>
              <TableHead className="text-baseColor w-5">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Default Row */}
            <TableRow>
              <TableCell className="border-r capitalize">
                Popular Zone
              </TableCell>
              <TableCell className="border-r capitalize">Popular</TableCell>
              <TableCell className="border-r capitalize">
                {popularProduct?.length}
              </TableCell>
              <TableCell className="border-r capitalize h-28">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/024/119/881/small_2x/most-popular-banner-design-modern-label-icon-popularity-concept-modern-style-illustration-vector.jpg"
                  alt="Popular Zone"
                  className="w-full h-full object-cover rounded"
                />
              </TableCell>
              <TableCell className="flex gap-2 justify-center items-center h-28">
                <Button variant="outline" size="icon">
                  <AiOutlineEdit className="text-yellow-400" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <AiOutlineDelete className="text-red-500" size={20} />
                </Button>
              </TableCell>
            </TableRow>

            {/* Dynamic Rows */}
            {categories.map((category) => {
              // Count the total products belonging to the current category
              const totalProduct = products.filter(
                (product) => product.category === category.category
              );
              return (
                <TableRow key={category._id}>
                  <TableCell className="border-r capitalize">
                    {category.packageName}
                  </TableCell>
                  <TableCell className="border-r capitalize">
                    {category.category}
                  </TableCell>
                  <TableCell className="border-r capitalize">
                    {totalProduct?.length}
                  </TableCell>
                  <TableCell className="border-r capitalize h-28">
                    <img
                      src={category.thumbnail}
                      alt={category.packageName}
                      className="w-full h-full object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center items-center h-28">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(category)}
                      title="Edit Category"
                    >
                      <AiOutlineEdit className="text-yellow-400" size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(category._id)}
                      className="hover:bg-red-600 hover:text-white"
                      title="Delete Category"
                    >
                      <AiOutlineDelete className="text-red-500 " size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      {isModalOpen && (
        <CategoryFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={editCategory}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default CategoriesControl;
