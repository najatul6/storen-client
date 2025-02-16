import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCarts from "@/hooks/useCart";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckOutDataForm = ({ totalPrice }) => {
  const { user } = useAuth();
  const [carts, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const orderData = {
        ...data,
        userEmail: user?.email,
        cartItems: carts,
        orderDate: new Date().toISOString(),
        totalPrice: totalPrice,
        status: "Pending",
      };

      const response = await axiosSecure.post("/orders", orderData);
      if (response.data.insertedId) {
        await Promise.all(
          carts.map((cartItem) => axiosSecure.delete(`/carts/${cartItem._id}`))
        );
        refetch();
        navigate("/dashboard/my-orders", { state: { from: location } });
        toast.success("Order placed successfully!");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center md:p-6 pattern">
      <div className="p-4 rounded-3xl shadow-2xl backdrop-blur-sm w-full max-w-2xl text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Billing and Contact Information
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name (Required) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </label>
            <input
              {...register("fullName", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
              width={watch("fullName")}
              onBlur={() => trigger("fullName")}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-transparent focus:ring-2 focus:ring-baseColor text-white ${
                errors.fullName ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* WhatsApp Number (Required) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="whatsappNumber" className="text-sm font-medium">
              WhatsApp Number (With Country Code)
            </label>
            <input
              {...register("whatsappNumber", {
                required: "WhatsApp number is required",
                pattern: {
                  value: /^\+(?:[1-9]\d{0,2})?[1-9]\d{6,14}$/, 
                  message: "Invalid phone number. Example: +123456789012"
                },
              })}
              width={watch("whatsappNumber")}
              onBlur={() => trigger("whatsappNumber")}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-transparent focus:ring-2 focus:ring-baseColor text-white ${
                errors.whatsappNumber ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="+1 234 567 890"
            />
            {errors.whatsappNumber && (
              <p className="text-red-500 text-sm">
                {errors.whatsappNumber.message}
              </p>
            )}
          </div>

          {/* Company URL */}
          <div className="flex flex-col gap-1">
            <label htmlFor="companyUrl" className="text-sm font-medium">
              Company URL
            </label>
            <input
              {...register("companyUrl", {
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                  message: "Invalid URL format",
                },
              })}
              onBlur={() => trigger("companyUrl")}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-transparent focus:ring-2 focus:ring-baseColor text-white ${
                errors.companyUrl ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="https://yourcompany.com"
            />
            {errors.companyUrl && (
              <p className="text-red-500 text-sm">
                {errors.companyUrl.message}
              </p>
            )}
          </div>

          {/* Skype ID */}
          <div className="flex flex-col gap-1">
            <label htmlFor="skypeId" className="text-sm font-medium">
              Skype ID
            </label>
            <input
              {...register("skypeId")}
              className="w-full px-4 py-3 border-2 rounded-lg bg-transparent border-gray-600 text-white"
              placeholder="Your Skype ID"
            />
          </div>

          {/* Review Type */}
          <div className="flex flex-col gap-1">
            <label htmlFor="reviewType" className="text-sm font-medium">
              Review Type
            </label>
            <select
              {...register("reviewType")}
              className="w-full px-4 py-3 border-2 rounded-lg bg-transparent border-gray-600 text-white focus:bg-black"
            >
              <option value="" disabled>
                Select Review Type
              </option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-3 mt-4 font-semibold rounded-lg transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

CheckOutDataForm.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default CheckOutDataForm;
