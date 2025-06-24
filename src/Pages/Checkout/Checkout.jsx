import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { IoInformationCircle } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";


const Checkout = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        //send the data to Backend
        const eventInfo = {
            title: data.title,
            eventType: data.eventType,
            eventCategory: data.eventCategory,
            eventDate: data.eventDate,
            eventTime: data.eventTime,
            duration: data.duration,
            location: data.location,
            details: data.details,
            totalTickets: parseInt(data.totalTickets),
            soldTickets: parseInt(0),
            maxTickets: parseInt(data.maxTickets),
            price: parseFloat(data.price),
            managerName: user?.displayName,
            managerEmail: user?.email,
            managerImage: user?.photoURL,
            status: "pending"
        }
        const eventRes = await axiosSecure.post('/events', eventInfo);
        if (eventRes.data.insertedId) {
            reset();
            //show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Your Event has been added',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div className="my-24">
            <div className="w-11/12 mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold py-4">Order Confirmation</h2>
                <div className="divider"></div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
                    {/* Customer Information */}
                    <div className="md:col-span-8 bg-white p-8 border border-gray-200 rounded-lg">
                        <h2 className="text-3xl font-semibold">Billing Information</h2>
                        <div className="divider"></div>

                        <div className="rounded-lg">
                            {/* Form Start */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Event Title */}
                                <div className="form-control w-full mb-4">
                                    <div className="label">
                                        <span className="label-text text-lg">Event Title*</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter event name here"
                                        {...register('title', { required: true })}
                                        className="input input-bordered w-full focus:outline-none focus:border-supporting focus:shadow" />
                                </div>

                                {/* Event Type */}
                                <div className="form-control w-full mb-4">
                                    <div className="label">
                                        <span className="label-text text-lg">Chose Event Type</span>
                                    </div>
                                    <select defaultValue='default' {...register('eventType', { required: true })}
                                        className="select select-bordered w-full focus:outline-none focus:border-supporting focus:shadow">
                                        <option disabled value='default'>Select Event Type</option>
                                        <option value="online">Online</option>
                                        <option value="venue">Venue</option>
                                    </select>
                                </div>

                                {/* Event Category */}
                                <div className="form-control w-full mb-4">
                                    <div className="label">
                                        <span className="label-text text-lg">Chose Event Category</span>
                                    </div>
                                    <select defaultValue='default' {...register('eventCategory', { required: true })}
                                        className="select select-bordered w-full focus:outline-none focus:border-supporting focus:shadow">
                                        <option disabled value='default'>Select Event Category</option>
                                        <option value="adventureTour">Adventure Tour</option>
                                        <option value="concert">Concert</option>
                                        <option value="theater">Theater</option>
                                        <option value="festivals">Festivals</option>
                                        <option value="party">Party</option>
                                        <option value="sports">Sports</option>
                                        <option value="park">Park</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="class">Class</option>
                                    </select>
                                </div>

                                {/* Date and Time */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    {/* Event Date */}
                                    <div className="col-span-2 form-control">
                                        <div className="label">
                                            <span className="label-text">Event Date*</span>
                                        </div>
                                        <input
                                            type="date"
                                            {...register('eventDate', { required: true })}
                                            className="input input-bordered w-full focus:outline-none focus:border-supporting focus:shadow"
                                            placeholder="MM/DD/YYYY"
                                        />
                                    </div>
                                </div>

                                {/* Event Location */}
                                <div className="form-control w-full my-4">
                                    <div className="label">
                                        <span className="label-text">Event Location</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Online / for venue Type Full Address"
                                        {...register('location', { required: true })}
                                        className="input input-bordered w-full focus:outline-none focus:border-supporting focus:shadow" />
                                </div>

                                {/* Event Details */}
                                <div className="form-control w-full my-4 flex flex-col">
                                    <div className="label">
                                        <span className="label-text">Property Details</span>
                                    </div>
                                    <textarea
                                        className="textarea textarea-bordered h-36 w-full focus:outline-none focus:border-supporting focus:shadow"
                                        placeholder="Details"
                                        {...register('details')}
                                    >
                                    </textarea>
                                </div>

                                {/* Event Image */}
                                <div className="my-4 ">
                                    <input
                                        type="file"
                                        className="file-input w-full"
                                        {...register('image', { required: true })}
                                    />
                                </div>

                                {/* --------------Create Ticket----------- */}

                                <div className="flex items-center gap-2 text-2xl mt-16">
                                    <FaTicketAlt />
                                    <p className=" font-semibold text-gray-800">Create Ticket</p>
                                </div>
                                <div className="divider"></div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                                    {/* Total Tickets Field */}
                                    <div className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Total number of tickets*</span>
                                        </div>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Total available tickets"
                                            {...register('totalTickets', {
                                                required: "Total tickets is required",
                                                min: {
                                                    value: 0,
                                                    message: "Must be at least 0"
                                                },
                                                valueAsNumber: true
                                            })}
                                            className="input input-bordered w-full focus:outline-none focus:border-supporting focus:shadow"
                                        />
                                        {errors.totalTickets && (
                                            <p className="text-red-600 mt-1">{errors.totalTickets.message}</p>
                                        )}
                                    </div>

                                    {/* Max Tickets Field */}
                                    <div className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Max tickets per customer*</span>
                                        </div>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Max per customer"
                                            {...register('maxTickets', {
                                                required: "Max tickets is required",
                                                validate: (value) => {
                                                    const total = getValues('totalTickets');
                                                    if (value < 0) return "Must be at least 0";
                                                    if (total !== undefined && value > total) {
                                                        return `Cannot exceed total tickets (${total})`;
                                                    }
                                                    return true;
                                                },
                                                valueAsNumber: true
                                            })}
                                            className="input input-bordered w-full focus:outline-none focus:border-supporting focus:shadow"
                                        />
                                        {errors.maxTickets && (
                                            <p className="text-red-600 mt-1">{errors.maxTickets.message}</p>
                                        )}
                                    </div>

                                    {/* Each Ticket Price */}
                                    <div className="form-control w-full col-span-1">
                                        <div className="label">
                                            <span className="label-text">Price in BDT (min 10 Taka)</span>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Each ticket Price"
                                            {...register('price', {
                                                required: "Price is required",
                                                valueAsNumber: true,
                                                validate: (value) => value >= 10 || "Minimum price should be at least 10",
                                            })}
                                            className={`input input-bordered w-full focus:outline-none focus:border-supporting focus:shadow ${errors.price && "input-error"}`}
                                        />
                                        {errors.minPrice && <p className="text-red-600">{errors.price.message}</p>}
                                    </div>
                                </div>



                                <button className="ezy-button-primary">Add Event</button>
                            </form>
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="md:col-span-4 bg-white p-4 border border-gray-200 rounded-lg">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;