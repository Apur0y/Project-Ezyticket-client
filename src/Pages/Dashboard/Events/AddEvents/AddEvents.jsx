import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaTicketAlt } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddEvents = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        //image upload to imgbb
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            },
            withCredentials: false
        })
        if (res.data.success) {
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
                organizer: data.organizer,
                image: res.data.data.display_url,
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
    }

    return (
        <div>
            <h2 className="text-5xl font-semibold text-center my-8">Create Event</h2>
            <div className="md:w-10/12 mx-auto bg-background p-8 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-2xl">
                    <IoInformationCircle />
                    <p className=" font-semibold text-gray-800">Details</p>
                </div>
                <div className="divider"></div>

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

                        {/* Event Time */}
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

                        {/* Event Duration */}
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
                            <span className="label-text">Event Details</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered h-36 w-full focus:outline-none focus:border-supporting focus:shadow"
                            placeholder="Details"
                            {...register('details')}
                        >
                        </textarea>
                    </div>

                    {/* Event Location */}
                    <div className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text">Organized By</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Organizer Company"
                            {...register('organizer', { required: true })}
                            className="input input-bordered w-full focus:outline-none focus:border-supporting focus:shadow" />
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
    );
};

export default AddEvents;