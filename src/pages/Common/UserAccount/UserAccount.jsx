import { useState } from "react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useRole from "@/hooks/useRole";

const UserAccount = () => {
  const { user, updateUserProfile, setLoading } = useAuth();
  const [newName, setNewName] = useState(user?.displayName || "");
  const axiosSecure = useAxiosSecure();
  const [userRole] = useRole();
  const handleOpenModal = () => {
    setLoading(true);
    Swal.fire({
      title: "Change Your Name",
      input: "text",
      inputValue: newName,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputPlaceholder: "Enter new name",
      preConfirm: async (value) => {
        if (value.trim()) {
          try {
            // Update the name in the authentication system (Firebase, etc.)
            await updateUserProfile(value);

            // Update the name in the database
            const response = await axiosSecure.put(`/users/${user.email}`, {
              name: value,
            });

            // Check if the database update was successful
            if (response.data.modifiedCount > 0) {
              toast.success(
                "Success!",
                "Your name has been updated.",
                "success"
              );
              setNewName(value);
            } else {
              toast.error(
                "Error",
                "There was an issue updating your name in the database.",
                "error"
              );
            }
          } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire(
              "Error",
              "Failed to update your profile. Please try again.",
              "error"
            );
          } finally {
            setLoading(false); // Ensure loading is set to false
          }
        } else {
          Swal.showValidationMessage("Please enter a valid name.");
          setLoading(false); // Ensure loading is set to false
        }
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-lg overflow-hidden text-gray-900">
      {/* Banner Image */}
      <div className="h-32 w-full">
        <img
          className="object-cover object-top w-full h-full"
          src="https://cdn.pixabay.com/photo/2015/10/29/14/38/web-1012467_1280.jpg"
          alt="Profile Banner"
        />
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center -mt-16">
        <img
          className="w-32 h-32 border-4 border-white rounded-full object-cover bg-gray-200"
          src={
            user?.photoURL ||
            "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
          }
          alt={
            user?.displayName
              ? `${user.displayName} Profile Picture`
              : "User Profile Picture"
          }
        />
      </div>

      {/* User Info */}
      <div className="text-center mt-4 pb-4">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          {user?.displayName || "Anonymous"} ({userRole})
        </h2>
        <p className="text-gray-500">{user?.email || "No email provided"}</p>
      </div>

      {/* Action Button */}
      <div className="border-t px-6 py-4 flex justify-center">
        <Button className="w-full" onClick={handleOpenModal}>
          Change Name
        </Button>
      </div>
    </div>
  );
};

export default UserAccount;
