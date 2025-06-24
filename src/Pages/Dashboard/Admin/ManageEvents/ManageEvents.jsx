import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import noImage from "../../../../assets/Common_image/noImage.png"
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageEvents = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: allEvents = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['allEvents'],
        queryFn: async () => {
            const res = await axiosSecure.get('/events');
            return res.data;
        }
    });

    const handleVerifyClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const handleApprove = (id) => {
        axiosSecure.patch(`/verifyEvent/${id}`, { status: 'verified' })
            .then(res => {
                const data = res.data;
                refetch();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Congratulation! The Event has been verified',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        handleCloseModal();
    };

    const handleReject = (id) => {
        axiosSecure.patch(`/verifyEvent/${id}`, { status: 'rejected' })
            .then(res => {
                const data = res.data;
                refetch();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Sorry! The Event has been rejected',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        handleCloseModal();
    };

    if (isLoading) return <div className="text-center my-8">Loading events...</div>;
    if (isError) return <div className="text-center my-8 text-red-500">Error loading events</div>;

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-center my-8">Manage Events</h2>

            <div className="bg-background rounded-lg shadow-md p-4">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-4 px-4">Photo</th>
                                <th className="text-left py-4 px-4">Title</th>
                                <th className="text-left py-4 px-4">Type</th>
                                <th className="text-left py-4 px-4">Date & Time</th>
                                <th className="text-left py-4 px-4">Tickets & Price</th>
                                <th className="text-right py-4 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allEvents.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No events available
                                    </td>
                                </tr>
                            ) : (
                                allEvents.map((event) => (
                                    <tr key={event._id} className="hover:bg-gray-50">
                                        <td className="p-2">
                                            <img src={event?.image ? event.image : noImage} alt={event.title} className="w-20 h-16 rounded" />
                                        </td>
                                        <td className="p-2">{event.title}</td>
                                        <td className="p-2">{event.eventType}</td>
                                        <td className="p-2">
                                            {new Date(event.eventDate).toLocaleDateString()}
                                            <br />
                                            <span className="text-sm text-gray-500">{event.eventTime}</span>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                <span>Tickets: {event.totalTickets}</span>
                                                <span>Price: Tk {event.price}</span>
                                            </div>
                                        </td>
                                        <td className="p-2 flex justify-end">
                                            {event?.status === "rejected" ? (
                                                <p className="py-1 px-3 bg-red-100 text-red-600 border border-red-300 w-fit rounded">
                                                    Rejected
                                                </p>
                                            ) : event?.status === "verified" ? (
                                                <p className="py-1 px-3 bg-green-100 text-green-600 border border-green-300 w-fit rounded">
                                                    Verified
                                                </p>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-outline btn-primary"
                                                    onClick={() => handleVerifyClick(event)}
                                                >
                                                    Verify
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">{selectedEvent.title}</h3>

                        <img src={selectedEvent?.image ? selectedEvent.image : noImage} alt={selectedEvent.title} className="w-full h-60 object-cover rounded-md mb-3" />

                        <p><strong>Type:</strong> {selectedEvent.eventType}</p>

                        <p><strong>Date & Time:</strong> {new Date(selectedEvent.eventDate).toLocaleDateString()} at {selectedEvent.eventTime}</p>

                        <p><strong>Duration:</strong> {selectedEvent.duration}</p>

                        <p><strong>Total Tickets:</strong> {selectedEvent.totalTickets}</p>

                        <p><strong>Price:</strong> ${selectedEvent.price}</p>

                        <div className="flex justify-end gap-2 md:gap-4 mt-4">
                            <button className="ezy-button-primary-sm" onClick={() => handleApprove(selectedEvent._id)}>
                                Approve
                            </button>
                            <button className="ezy-button-secondary-sm" onClick={()=>handleReject(selectedEvent._id)}>
                                Reject
                            </button>
                            <button className="btn btn-outline btn-sm" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
