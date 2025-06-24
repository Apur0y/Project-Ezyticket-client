import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([
        {
          _id: "1",
          userName: "Sofik",
          userEmail: "sofik@gmail.com",
          rating: 4,
          comment: "Great travel experience! Bus was clean and on time.",
          date: "2025-03-01",
        },
        {
          _id: "2",
          userName: "Farhan",
          userEmail: "farhan123@gmail.com",
          rating: 5,
          comment: "Very smooth journey. Highly recommended.",
          date: "2025-03-02",
        },
        {
          _id: "3",
          userName: "Rima",
          userEmail: "rima.khan@gmail.com",
          rating: 3,
          comment: "Average service, could improve on timing.",
          date: "2025-03-03",
        },
      ]);


  const handleDelete = () => {
    Swal.fire({
        title: "Are You Sure to Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto mt-2  p-6 bg-green-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-green-200">
              <tr>
                <th className="text-left">User</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-green-100 transition">
                  <td className="font-medium">{review.userName}</td>
                  <td>{review.userEmail}</td>
                  <td>
                    <span className="text-yellow-500 font-bold">
                      {review.rating}★
                    </span>
                  </td>
                  <td>{review.comment}</td>
                  <td>{new Date(review.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                    {/* Optionally add a reply button */}
                    {/* <button className="btn btn-sm bg-blue-500 text-white ml-2">Reply</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
