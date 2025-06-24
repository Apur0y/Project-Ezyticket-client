import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { IoBus, IoLocationSharp, IoTime } from "react-icons/io5";
import { MdOutlineTour, MdDirectionsBusFilled } from "react-icons/md";
import { FaBus, FaMoneyBillWave, FaRegMoneyBillAlt, FaUserCircle, FaCalendarAlt } from "react-icons/fa";


const MyBusServices = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fetchUserBuses = async (email) => {
    const res = await axiosSecure.get(`/api/buses`);
    return res.data;
  };

  const useUserBuses = (email) => {
    return useQuery({
      queryKey: ['user-buses', email],
      queryFn: () => fetchUserBuses(email),
      enabled: !!email,
    });
  };

  const { data: buses = [], isLoading } = useUserBuses(user?.email);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: API call for delete here
        Swal.fire("Deleted!", "Your bus has been deleted.", "success");
      }
    });
  };

  const handleUpdate = () => {
    Swal.fire({
      title: "Coming Soon...!",
      text: "This Feature is coming soon.",
      icon: "info"
    });
  };

  const handleOpenModal = (bus) => {
    setSelectedBus(bus);
  };

  useEffect(() => {
    if (selectedBus) {
      const modal = document.getElementById("busDetailsModal");
      if (modal) {
        modal.showModal();
      }
    }
  }, [selectedBus]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-2 p-6 bg-green-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">My Added Bus Services</h2>

      {buses?.length === 0 ? (
        <p className="text-center text-gray-500">No bus services added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-green-200">
              <tr>
                <th>Bus Name</th>
                <th>Time</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th>Price</th>
                <th>Refundable</th>
                <th>Trip</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id} className="hover:bg-green-100 transition">
                  <td>{bus.busName}</td>
                  <td>{bus.busTimes}</td>
                  <td>{bus.date}</td>
                  <td>{bus.from}</td>
                  <td>{bus.to}</td>
                  <td>{bus.type}</td>
                  <td>{bus.ticketPrice}৳</td>
                  <td>{bus.refund ? "Yes" : "No"}</td>
                  <td>{bus.tripName}</td>
                  <td className="flex gap-1">
                    <button
                      onClick={() => handleOpenModal(bus)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <TbListDetails />
                    </button>
                    <button
                      onClick={() => handleUpdate(bus._id)}
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(bus._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      <RiDeleteBin5Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <dialog id="busDetailsModal" className="modal">
  {selectedBus && (
    <div className="modal-box max-w-5xl w-full bg-white rounded-2xl p-0 overflow-hidden shadow-2xl border border-green-200 animate__animated animate__zoomIn">

      {/* Header */}
      <div className="relative bg-gradient-to-r from-green-100 to-green-200 px-8 py-6 flex justify-between items-center">
        <h3 className="text-green-700 text-2xl font-bold flex items-center gap-2">
          <IoBus className="text-3xl" /> Bus Service Details
        </h3>
        <form method="dialog">
          <button className="text-green-600 hover:text-green-800 text-2xl font-bold absolute top-4 right-6">✖</button>
        </form>
      </div>

      {/* Bus Image */}
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img 
          src={selectedBus?.image || "https://via.placeholder.com/500x200?text=Bus+Image"} 
          alt="Bus" 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white text-gray-700 text-[15px]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <FaBus className="text-green-500" />
            <span className="font-semibold">Bus Name:</span>
            <span>{selectedBus.busName}</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineTour className="text-green-500" />
            <span className="font-semibold">Trip Name:</span>
            <span>{selectedBus.tripName}</span>
          </div>
          <div className="flex items-center gap-3">
            <IoLocationSharp className="text-green-500" />
            <span className="font-semibold">From:</span>
            <span>{selectedBus.from}</span>
          </div>
          <div className="flex items-center gap-3">
            <IoLocationSharp className="text-green-500 rotate-180" />
            <span className="font-semibold">To:</span>
            <span>{selectedBus.to}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-green-500" />
            <span className="font-semibold">Date:</span>
            <span>{selectedBus.date}</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <IoTime className="text-green-500" />
            <span className="font-semibold">Time:</span>
            <span>{selectedBus.busTimes}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-500" />
            <span className="font-semibold">Price:</span>
            <span>{selectedBus.ticketPrice}৳</span>
          </div>
          <div className="flex items-center gap-3">
            <MdDirectionsBusFilled className="text-green-500" />
            <span className="font-semibold">Type:</span>
            <span>{selectedBus.type}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaRegMoneyBillAlt className="text-green-500" />
            <span className="font-semibold">Refundable:</span>
            <span>{selectedBus.refund ? "Yes ✅" : "No ❌"}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-green-500" />
            <span className="font-semibold">Added By:</span>
            <span>{user?.displayName} ({user?.email})</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-5 bg-green-50 flex justify-end">
        <form method="dialog">
          <button className="btn btn-sm bg-green-500 hover:bg-green-600 text-white font-semibold px-8 rounded-full shadow-md transition">
            Close
          </button>
        </form>
      </div>

    </div>
  )}
</dialog>


    </div>
  );
};

export default MyBusServices;
