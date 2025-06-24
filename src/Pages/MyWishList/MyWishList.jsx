import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const MyWishList = () => {
  const { user, darkMode } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: wishlist = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("No user email found");

      const response = await axiosPublic.get(`/wishlist/${user?.email}`, {
        withCredentials: true, // Include credentials for authentication
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch wishlist");
      }

      return response.data;
    },
    enabled: !!user?.email, // Only fetch if user is logged in
    onError: (err) => {
      Swal.fire("Error", err.message || "Something went wrong!", "error");
    },
  });

  if (isLoading) return <p className="text-center text-lg mt-30">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen p-5 mt-10`}
    >
      <h1 className="text-3xl font-bold text-center mt-10">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center mt-5 text-lg">No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } border rounded-xl p-5 shadow-md transition duration-300 transform hover:scale-105 hover:shadow-2xl`}
            >
              <img
                src={item.photo}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📍 {item.location}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📅 {item.dateTime}
                </p>
                <p className="text-lg font-bold mt-2 text-indigo-500">
                  💲{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishList;
