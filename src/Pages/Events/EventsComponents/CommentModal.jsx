// src/components/CommentModal.jsx
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const CommentModal = ({
  comment,
  setComment,
  handleAddComment,
  setIsModalOpen,
  darkMode,
}) => (
  <div className="fixed inset-0 bg-black/60 bg-opacity-75 flex items-center justify-center z-50">
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Your Comment</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <IoMdCloseCircleOutline className="text-2xl" />
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Your thoughts about this event
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded-md mb-4 text-left"
          placeholder="Write your comment here..."
          autoFocus
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsModalOpen(false)}
          className={`px-4 py-2 rounded-lg font-medium ${
            darkMode
              ? "bg-gray-600 hover:bg-gray-500"
              : "bg-gray-200 hover:bg-gray-300"
          } transition-colors`}
        >
          Cancel
        </button>
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-supporting text-white rounded-lg font-medium hover:bg-supporting-dark transition-colors"
        >
          Post Comment
        </button>
      </div>
    </div>
  </div>
);

export default CommentModal;
