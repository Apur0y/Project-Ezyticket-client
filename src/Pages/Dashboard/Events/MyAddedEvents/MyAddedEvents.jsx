// Clean and complete version of MyAddedEvents component with modal-based update functionality

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaTicketAlt } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import noImage from "../../../../assets/Common_image/noImage.png";

const MyAddedEvents = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const { data: addedEvents = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["addedEvents", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myAddedEvents/${user?.email}`);
            return res.data;
        },
    });

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);

    const editableFields = [
        'title', 'eventType', 'eventDate', 'eventTime', 'duration', 'price', 'totalTickets', 'location', 'details'
    ]

        // Set form values
        editableFields.forEach((field)=> {
            if (field in event){
                setValue(field, event[field])
            }
        })
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        reset();
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await axiosSecure.patch(`/events/${selectedEvent._id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Event updated successfully!", "success");
                refetch();
                handleCloseModal();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteEvent = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/events/${id}`);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire("Deleted!", "Your event has been deleted.", "success");
            }
        }
    };

    if (isLoading) return <div className="text-center my-8">Loading...</div>;
    if (isError) return <div className="text-center my-8 text-red-500">Error loading events</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center gap-2 mb-8">
                <MdEventAvailable className="text-4xl text-main" />
                <h2 className="text-3xl md:text-5xl font-semibold text-center">My Added Events</h2>
            </div>

            {addedEvents.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500 mb-4">You haven't added any events yet</p>
                    <Link to="/dashboard/addEvent" className="btn btn-primary">
                        Add Your First Event
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto shadow rounded-lg">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Tickets</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedEvents.map((event) => (
                                <tr key={event._id}>
                                    <td><img src={event.image || noImage} className="w-20 h-16 rounded" alt="event" /></td>
                                    <td>{event.title}</td>
                                    <td>{event.eventType}</td>
                                    <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                                    <td>
                                        <div>
                                            <div>Total: {event.totalTickets}</div>
                                            <div>Sold: {event.soldTickets}</div>
                                            <div>Price: ${event.price}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-outline ${event.status === 'verified' ? 'badge-success' : event.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                                            {event.status || 'pending'}
                                        </span>
                                    </td>
                                    <td >
                                        <div className="flex gap-2 items-center justify-center">
                                            <button onClick={() => handleEdit(event)} className="btn btn-sm btn-outline btn-primary">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDeleteEvent(event._id)} className="btn btn-sm btn-outline btn-error">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button onClick={handleCloseModal} className="absolute top-2 right-2 btn btn-sm btn-circle bg-red-200 text-red-500 border border-red-500 font-semibold">✕</button>
                        <h2 className="text-2xl font-semibold mb-4">Edit Event: {selectedEvent.title}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="label">Title</label>
                                <input {...register("title", { required: true })} className="input input-bordered w-full" />
                                {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                            </div>

                            <div className="mb-4">
                                <label className="label">Event Type</label>
                                <select {...register("eventType", { required: true })} className="select select-bordered w-full">
                                    <option value="online">Online</option>
                                    <option value="venue">Venue</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="label">Date</label>
                                <input type="date" {...register("eventDate", { required: true })} className="input input-bordered w-full" />
                            </div>

                            <div className="col-span-1 form-control">
                                <div className="label">
                                    <span className="label-text">Time*</span>
                                </div>
                                <select
                                    {...register('eventTime', { required: true })}
                                    className="select select-bordered w-full focus:outline-none focus:border-supporting focus:shadow"
                                >
                                    {/* AM Times */}
                                    <option value="00:00">12:00 AM</option>
                                    <option value="00:30">12:30 AM</option>
                                    <option value="01:00">1:00 AM</option>
                                    <option value="01:30">1:30 AM</option>
                                    <option value="02:00">2:00 AM</option>
                                    <option value="02:30">2:30 AM</option>
                                    <option value="03:00">3:00 AM</option>
                                    <option value="03:30">3:30 AM</option>
                                    <option value="04:00">4:00 AM</option>
                                    <option value="04:30">4:30 AM</option>
                                    <option value="05:00">5:00 AM</option>
                                    <option value="05:30">5:30 AM</option>
                                    <option value="06:00">6:00 AM</option>
                                    <option value="06:30">6:30 AM</option>
                                    <option value="07:00">7:00 AM</option>
                                    <option value="07:30">7:30 AM</option>
                                    <option value="08:00">8:00 AM</option>
                                    <option value="08:30">8:30 AM</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="09:30">9:30 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="10:30">10:30 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="11:30">11:30 AM</option>

                                    {/* PM Times */}
                                    <option value="12:00">12:00 PM</option>
                                    <option value="12:30">12:30 PM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="13:30">1:30 PM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="14:30">2:30 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                    <option value="15:30">3:30 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                    <option value="16:30">4:30 PM</option>
                                    <option value="17:00">5:00 PM</option>
                                    <option value="17:30">5:30 PM</option>
                                    <option value="18:00">6:00 PM</option>
                                    <option value="18:30">6:30 PM</option>
                                    <option value="19:00">7:00 PM</option>
                                    <option value="19:30">7:30 PM</option>
                                    <option value="20:00">8:00 PM</option>
                                    <option value="20:30">8:30 PM</option>
                                    <option value="21:00">9:00 PM</option>
                                    <option value="21:30">9:30 PM</option>
                                    <option value="22:00">10:00 PM</option>
                                    <option value="22:30">10:30 PM</option>
                                    <option value="23:00">11:00 PM</option>
                                    <option value="23:30">11:30 PM</option>
                                </select>
                            </div>

                            <div className="col-span-1 form-control">
                                <div className="label">
                                    <span className="label-text">Duration*</span>
                                </div>
                                <select
                                    {...register('duration', { required: true })}
                                    className="select select-bordered w-full focus:outline-none focus:border-supporting focus:shadow"
                                >
                                    {/* Minutes Only */}
                                    <option value="15mins">15 mins</option>
                                    <option value="30mins">30 mins</option>
                                    <option value="45mins">45 mins</option>

                                    {/* Hours */}
                                    <option value="1h">1 hour</option>
                                    <option value="1h 15mins">1h 15m</option>
                                    <option value="1h 30mins">1h 30m</option>
                                    <option value="1h 45mins">1h 45m</option>

                                    <option value="2h">2 hours</option>
                                    <option value="2h 15mins">2h 15m</option>
                                    <option value="2h 30mins">2h 30m</option>
                                    <option value="2h 45mins">2h 45m</option>

                                    <option value="3h">3 hours</option>
                                    <option value="3h 15mins">3h 15m</option>
                                    <option value="3h 30mins">3h 30m</option>
                                    <option value="3h 45mins">3h 45m</option>

                                    <option value="4h">4 hours</option>
                                    <option value="4h 15mins">4h 15m</option>
                                    <option value="4h 30mins">4h 30m</option>
                                    <option value="4h 45mins">4h 45m</option>

                                    <option value="5h">5 hours</option>
                                    <option value="custom">Custom</option>

                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="label">Price</label>
                                <input
                                    type="number"
                                    min="10"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: {
                                            value: 10,
                                            message: "Price must be at least 10"
                                        },
                                        valueAsNumber: true
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.price && (
                                    <p className="text-red-600 mt-1">{errors.price.message}</p>
                                )}
                            </div>


                            <div className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Total number of tickets*</span>
                                </div>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Total available tickets"
                                    defaultValue={selectedEvent?.totalTickets}
                                    {...register('totalTickets', {
                                        required: "Total tickets is required",
                                        min: {
                                            value: 1,
                                            message: "Must be at least 1"
                                        },
                                        valueAsNumber: true,
                                        validate: value =>
                                            value >= selectedEvent?.soldTickets || `Total tickets can't be less than sold tickets (${selectedEvent?.soldTickets})`
                                    })}
                                    className="input input-bordered w-full focus:outline-none focus:border-supporting focus:shadow"
                                />
                                {errors.totalTickets && (
                                    <p className="text-red-600 mt-1">{errors.totalTickets.message}</p>
                                )}
                            </div>


                            <div className="mb-4">
                                <label className="label">Location</label>
                                <input {...register("location", { required: true })} className="input input-bordered w-full" />
                            </div>

                            <div className="mb-4">
                                <label className="label">Details</label>
                                <textarea {...register("details")} className="textarea textarea-bordered w-full"></textarea>
                            </div>

                            <div className="text-right">
                                <button type="submit" className="btn btn-success">Update Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAddedEvents;
