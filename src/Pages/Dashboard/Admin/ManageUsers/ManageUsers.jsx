import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import noImage from "../../../../assets/Common_image/noImage.png";
import useAuth from "../../../../Hooks/useAuth";

const ManageUsers = () => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch all users from MongoDB
    const { data: savedUsers = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Handle user deletion
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${user.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const res = await axiosSecure.delete(`/users/${user._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${user.name} has been deleted.`,
                        icon: "success"
                    });
                }
                setLoading(false);
            }
        });
    };

    // Handle role change
    const handleChangeRole = (user, newRole) => {
        Swal.fire({
            title: "Change Role",
            text: `Change ${user.name}'s role to ${newRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const res = await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Updated!",
                        text: `${user.name}'s role has been updated to ${newRole}.`,
                        icon: "success"
                    });
                }
                setLoading(false);
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl md:text-5xl font-semibold text-center mb-8">Manage Users</h2>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="table w-full">
                    {/* Table Header */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {savedUsers.map((savedUser) => {
                            const isCurrentUser = savedUser.email === user?.email;
                            return (
                                <tr key={savedUser._id} className="hover:bg-gray-50">
                                    <td>
                                        <div className="avatar">
                                            <div className="w-16 h-16 rounded-full">
                                                <img
                                                    src={savedUser?.photoURL || noImage}
                                                    alt={savedUser.name}
                                                    className="object-cover"
                                                />
                                                {isCurrentUser && (
                                                    <div className="absolute -bottom-1 -right-1 text-xs px-1 py-0.5 bg-main rounded text-white font-medium">
                                                        You
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{savedUser.name}</div>
                                        </div>
                                    </td>
                                    <td>{savedUser.email}</td>
                                    <td className="capitalize">{savedUser.role || 'user'}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            {/* Change Role Dropdown - Disabled for current user */}
                                            <div className="dropdown dropdown-bottom">
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className={`btn btn-sm btn-outline btn-primary ${isCurrentUser ? 'btn-disabled opacity-90' : ''}`}
                                                    disabled={isCurrentUser}
                                                >
                                                    <FaUserEdit /> Role
                                                </div>
                                                {!isCurrentUser && (
                                                    <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${savedUser?.role === 'admin' && 'tooltip'}`}
                                                        data-tip="Cannot modify your own account"
                                                    >
                                                        {
                                                            savedUser?.role !== 'admin' &&
                                                            <li><button onClick={() => handleChangeRole(savedUser, 'admin')}>Make Admin</button></li>
                                                        }

                                                        <li><button onClick={() => handleChangeRole(savedUser, 'travelManager')}>Travel Manager</button></li>

                                                        <li><button onClick={() => handleChangeRole(savedUser, 'eventManager')}>Event Manager</button></li>

                                                        <li><button onClick={() => handleChangeRole(savedUser, 'entertainmentManager')}>Entertainment Manager</button></li>

                                                        <li><button onClick={() => handleChangeRole(savedUser, 'user')}>Make Regular User</button></li>
                                                    </ul>
                                                )}
                                            </div>

                                            {/* Delete Button - Disabled for current user */}
                                            <button
                                                onClick={() => !isCurrentUser && handleDeleteUser(savedUser)}
                                                className={`btn btn-sm btn-outline btn-error ${isCurrentUser ? 'btn-disabled opacity-80' : ''}`}
                                                disabled={loading || isCurrentUser}
                                            >
                                                <FaTrashAlt /> Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;