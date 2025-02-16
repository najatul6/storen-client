import { Link, useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const { resetPassword, setLoading, loading } = useAuth();
  const [isDisabled,setDisabled] =useState(false)
  const navigate=useNavigate("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    try {
      setLoading(true);
      await resetPassword(email);
      form.reset();
      navigate('/auth/login')
      toast.success("Password reset link has been sent to your email.");
      setDisabled(true)
    } catch (err) {
      toast.error(err?.code);
    } finally {
      setLoading(false);
    }

    console.log("Password reset link sent");
  };

  return (
    <main id="content" role="main" className="w-full max-w-xl mx-auto min-h-screen my-auto p-6">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <Link
                to="/auth/login"
                className="text-blue-600 decoration-2 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isDisabled || loading}
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin m-auto" />
                  ) : (
                    `${isDisabled ? "Check your email address" : "Reset password"}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetPassword;