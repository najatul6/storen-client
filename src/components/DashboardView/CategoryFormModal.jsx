import useAxiosSecure from "@/hooks/useAxiosSecure";
import { imageUpload } from "@/lib/imageUpload";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CategoryFormModal = ({ isOpen, onClose, category, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    id: "",
    packageName: "",
    category: "",
    thumbnail: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        id: category._id || "",
        packageName: category.packageName || "",
        category: category.category || "",
        thumbnail: category.thumbnail || "",
      });
      setImagePreview(category.thumbnail || null);
    } else {
      setFormData({  packageName: "", category: "", thumbnail: "" });
      setImagePreview(null);
    }
  }, [category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    setImagePreview(URL.createObjectURL(file));

    // Upload to ImgBB
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
    try {
      if (category) {
        await axiosSecure.put(`/category/${category._id}`, formData);
        toast.success("Category updated successfully!");
      } else {
        await axiosSecure.post("/category", formData);
        toast.success("Category added successfully!");
      }
      refetch();
      onClose();
    } catch (error) {
      toast.error(`Failed to save category. Please try again.|| ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg text-white w-96">
        <h2 className="text-lg font-semibold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col space-y-1">
            <label className="text-sm">Category ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              placeholder="ID"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              readOnly
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">Package Name</label>
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              placeholder="Package Name"
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
          {/* Thumbnail Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm">Thumbnail</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Thumbnail Preview"
                className="w-full h-28 object-cover rounded border"
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
              {category ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CategoryFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};

export default CategoryFormModal;
