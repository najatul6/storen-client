import { useState } from "react";
import DateComponent from "@/components/common/DateComponent";
import useAllUser from "@/hooks/useAllUser";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const UserControls = () => {
  const [allUsers, , refetch] = useAllUser();
  const [searchQuery, setSearchQuery] = useState("");
  const axiosSecure = useAxiosSecure();
  const [newRole, setNewRole] = useState("");

  const handleChangeRole = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to change his role to ${newRole}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}`, { role: newRole }).then((res) => {
          if (res.data?.modifiedCount > 0) {
            refetch();
            toast.success("User role updated successfully");
          } else {
            toast.error("User role not updated");
          }
        });
      }
    });
  };

  const handleDeleteUser = async (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("User deleted successfully");
          } else {
            toast.error("User not deleted");
          }
        });
      }
    });
  };

  const filteredUsers = allUsers?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 w-full">
      {/* Helmet for title and meta tags Start here */}
      <Helmet>
        <title>User Controls | NiN Supply</title>
        <meta
          name="description"
          content="Manage user roles, permissions, and account settings on NiN Supply."
        />
        <meta
          name="keywords"
          content="user controls, user management, account settings, roles, permissions, NiN Supply"
        />
        <meta name="author" content="NiN Supply" />

        {/* Open Graph for social media previews */}
        <meta property="og:title" content="User Controls | NiN Supply" />
        <meta
          property="og:description"
          content="Manage user roles, permissions, and account settings on NiN Supply."
        />
        <meta
          property="og:image"
          content="https://nin-supply.vercel.app/user-controls-og.jpg"
        />
        <meta
          property="og:url"
          content="https://nin-supply.vercel.app/user-controls"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card for better previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="User Controls | NiN Supply" />
        <meta
          name="twitter:description"
          content="Manage user roles, permissions, and account settings on NiN Supply."
        />
        <meta
          name="twitter:image"
          content="https://nin-supply.vercel.app/twitter-user-controls.jpg"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://nin-supply.vercel.app/user-controls"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://nin-supply.vercel.app/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>

      {/* Helmet for title and meta tags End here */}

      <div className="flex flex-col md:flex-row lg:gap-6 justify-between items-center py-5">
        <h1 className="text-3xl text-white">
          Total Users: {filteredUsers?.length}
        </h1>
        <form className="max-w-[480px] w-full px-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border h-12 shadow border-lightTeal p-4 rounded-full bg-transparent focus:outline-none"
              placeholder="Search users"
            />
            <FaSearch className="text-lightTeal h-5 w-5 absolute top-3.5 right-3 fill-current" />
          </div>
        </form>
      </div>
      <section className="main-content w-full overflow-auto lg:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Profile
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Role
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Joined At
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {filteredUsers?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((dbuser) => (
                <tr key={dbuser?._id} className="even:bg-blue-50">
                  <td className="p-4 text-sm text-black">
                    <img
                      src={dbuser.photoURL}
                      alt={dbuser?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4 text-sm text-black">{dbuser?.name}</td>
                  <td className="p-4 text-sm text-black">{dbuser?.email}</td>
                  <td className="p-4 text-sm text-black capitalize">
                    <select
                      value={dbuser?.role}
                      onChange={(e) => setNewRole(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-sm text-black">
                    <DateComponent createdAt={dbuser?.createdAt} />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleChangeRole(dbuser._id)}
                      className="mr-4"
                      title="Save"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-save fill-green-500 hover:fill-green-700"
                      >
                        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                        <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(dbuser)}
                      className="mr-4"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 fill-red-500 hover:fill-red-700"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserControls;
