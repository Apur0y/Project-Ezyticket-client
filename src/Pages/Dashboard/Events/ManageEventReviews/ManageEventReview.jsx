/* eslint-disable no-undef */
import { useState } from "react";
import Swal from "sweetalert2";
import useEventReview from "./../../../../Hooks/useEventReview";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageEventReview = () => {
  const [eventReviews, setEventReviews, isLoading] = useEventReview();
  const axiosSecure = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (isLoading) {
    return <div className="text-center py-10">Loading reviews...</div>;
  }

  const handleVerifyClick = (event) => {
    if (!event._id) {
      Swal.fire("Error", "Invalid review selected.", "error");
      return;
    }
    setSelectedEvent(event);
    document.getElementById("verify_modal").showModal();
  };
  const handleVerifySubmit = () => {
    if (!selectedEvent || !selectedEvent._id) {
      Swal.fire("Error", "No review selected for verification.", "error");
      return;
    }

    console.log("Verifying review with ID:", selectedEvent._id); // Log review ID

    axiosSecure
      .patch(`/verifyEvent/${selectedEvent._id}`, { status: "verified" })
      .then((res) => {
        console.log(res); // Log the response for debugging

        if (res.data.modifiedCount > 0) {
          Swal.fire(
            "Success!",
            "Review verified successfully!",
            "success"
          ).then(() => {
            const updatedReviews = eventReviews.map((review) => {
              if (review._id === selectedEvent._id) {
                return { ...review, status: "verified" };
              }
              return review;
            });
            setEventReviews(updatedReviews);
            setSelectedEvent(null);
            document.getElementById("verify_modal").close();
          });
        } else {
          // Handle cases when modifiedCount is 0 and provide better feedback
          Swal.fire(
            "Error",
            res.data.message ||
              "Failed to verify the review. It may already be verified or does not exist.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error during status verification:", error);
        Swal.fire("Error", "Something went wrong. Try again.", "error");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/event-reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "The review has been removed.", "success");
            // Refetch the data to reflect the deletion
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-semibold text-center my-8">
        Manage Event Reviews
      </h2>

      <div className="bg-background rounded-lg shadow-md p-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-4 px-4">#</th>
                <th className="text-left py-4 px-4">Event Name</th>
                <th className="text-left py-4 px-4">Reviewer</th>
                <th className="text-left py-4 px-4">Email</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-right py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventReviews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No reviews available
                  </td>
                </tr>
              ) : (
                eventReviews.map((review, index) => (
                  <tr key={review._id} className="hover:bg-gray-50">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{review.eventName}</td>
                    <td className="p-2">{review.customerName}</td>
                    <td className="p-2">{review.customerEmail}</td>
                    <td className="p-2">
                      {review.status === "verified" ? (
                        <p className="py-1 px-3 bg-green-100 text-green-600 border border-green-300 w-fit rounded">
                          Verified
                        </p>
                      ) : review.status === "rejected" ? (
                        <p className="py-1 px-3 bg-red-100 text-red-600 border border-red-300 w-fit rounded">
                          Rejected
                        </p>
                      ) : (
                        <p className="py-1 px-3 bg-yellow-100 text-yellow-600 border border-yellow-300 w-fit rounded">
                          Pending
                        </p>
                      )}
                    </td>
                    <td className="p-2 flex justify-end gap-2">
                      {review?.status === "verified" ? null : (
                        <button
                          className="btn btn-sm btn-outline btn-primary"
                          onClick={() => handleVerifyClick(review)}
                        >
                          Verify
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(review._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verify Modal */}
      <dialog id="verify_modal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="text-xl font-bold mb-4">Review Details</h3>

          {selectedEvent && (
            <>
              {selectedEvent.customerPhoto && (
                <div className="flex justify-center mb-4">
                  <img
                    src={selectedEvent.customerPhoto}
                    alt="Reviewer"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
              <p>
                <strong>Reviewer:</strong> {selectedEvent.customerName}
              </p>
              <p>
                <strong>Email:</strong> {selectedEvent.customerEmail}
              </p>
              <p>
                <strong>Comment:</strong> {selectedEvent.comment}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.time}
              </p>
              <p>
                <strong>Event:</strong> {selectedEvent.eventName}
              </p>
            </>
          )}

          <div className="modal-action mt-6">
            <form method="dialog" className="flex gap-3">
              <button className="btn" onClick={() => setSelectedEvent(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleVerifySubmit}>
                Confirm Verify
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageEventReview;
