import useAxiosSecure from "@/hooks/useAxiosSecure";
import { imageUpload } from "@/lib/imageUpload";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../common/Loading";

const ProductFormModal = ({ isOpen, onClose, product, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    description: [""],
    price: "",
    discount: "",
    thumbnail: "",
    category: "",
    stock: "",
    quantity: "",
    isPopular: false,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product._id || "",
        productName: product.productName || "",
        description: product.description || [""],
        price: product.price || "",
        discount: product.discount || "",
        thumbnail: product.thumbnail || "",
        category: product.category || "",
        stock: product.stock || "",
        quantity: product.quantity || "",
        isPopular: product.isPopular || false,
      });
      setImagePreview(product.thumbnail || null);
    } else {
      setFormData({
        id: "",
        productName: "",
        description: [""],
        price: "",
        discount: "",
        thumbnail: "",
        category: "",
        stock: "",
        quantity: "",
        isPopular: false,
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...formData.description];
    updatedDescriptions[index] = value;
    setFormData({ ...formData, description: updatedDescriptions });
  };

  const addDescriptionField = () => {
    setFormData({ ...formData, description: [...formData.description, ""] });
  };

  const removeDescriptionField = (index) => {
    const updatedDescriptions = formData.description.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, description: updatedDescriptions });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const uploadResponse = await imageUpload(file);
    if (uploadResponse && uploadResponse.success) {
      setFormData({ ...formData, thumbnail: uploadResponse.data.url });
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Image upload failed. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (product) {
        await axiosSecure.put(`/products/${product._id}`, formData);
        toast.success("Product updated successfully!");
      } else {
        await axiosSecure.post("/createProduct", formData);
        toast.success("Product added successfully!");
      }
      refetch();
      setLoading(false);
      onClose();
    } catch (error) {
      toast.error(
        `Failed to save product. Please try again. || ${error.message}`
      );
    }
  };

  if (!isOpen) return null;
  if (loading) return  <Loading/>;

  return (
    <div className="fixed inset-0 z-[500] bg-black bg-opacity-50 flex justify-center items-center overflow-hidden  min-h-screen">
      <div className="bg-gray-900 p-6 rounded-lg text-white w-9/12 mx-auto max-h-[90vh] overflow-y-auto no-scrollbar">
        <h2 className="text-lg font-semibold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col space-y-1">
            <label className="text-sm">Product ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              className="w-full p-2 border rounded bg-gray-800 text-white"
              readOnly
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              required
            />
          </div>

          {/* Dynamic Description Fields */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm">Description</label>
            {formData.description.map((desc, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  placeholder={`Description ${index + 1}`}
                  className="w-full p-2 border rounded bg-gray-800 text-white"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeDescriptionField(index)}
                    className="bg-red-500 px-2 py-1 rounded"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDescriptionField}
              className="bg-green-500 px-3 py-1 rounded mt-1"
            >
              + Add Description
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Discount"
              className="w-full p-2 border rounded bg-gray-800 text-white"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full p-2 border rounded bg-gray-800 text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPopular"
              checked={formData.isPopular}
              onChange={handleChange}
            />
            <label>Popular Product</label>
          </div>

          {/* Thumbnail Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm">Thumbnail</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Thumbnail"
                className="w-full  object-cover rounded border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded bg-gray-800 text-white"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-600 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
              {product ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};

export default ProductFormModal;
