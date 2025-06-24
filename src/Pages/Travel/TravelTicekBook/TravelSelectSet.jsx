import React, { useState } from "react";
import { data, Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import travelBannerImage from "../../../assets/Travel_image/travel-service/bg-bus.jpg"
import useTravelContext from "../../../Hooks/TrevalHook/useTravelContext";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const TravelSelectSet = () => {
    const { user } = useAuth()
    const [currentUser] = useCurrentUser()
    const [selectedSeats, setSelectedSeats] = useState([]);
    const {busPassengerData,setBusPassengerData} = useTravelContext()
    const location = useLocation()
    const seatPrice = location?.state?.ticketPrice;
    const navigate = useNavigate()
    const {darkMode} = useAuth()
    const [bookedSeat, setBookedSeat] = useState(location?.state?.bookedSeats)
    console.log(location.state)

    const handleSeatSelect = (seat) => {
        setSelectedSeats((prevSeats) => {
            if (prevSeats.includes(seat)) {
                return prevSeats.filter((s) => s !== seat);
            }
            return [...prevSeats, seat];
        });
    };

    // console.log(selectedSeats)


    const handleTravelInfo = (e) => {
        e.preventDefault();
       const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const number = form.number.value;
        const address = form.address.value;
        const totalPrices = selectedSeats.length * seatPrice * 0.05 + selectedSeats.length * seatPrice;
        const busPostId = location?.state?._id
        const verifyData = "bus"
        const routeAndDateAndTime = {from: location?.state?.from, to:location?.state?.to, date:location?.state?.date, time:location?.state?.busTimes}
        const buyDate = new Date()
        const passengerData = {  verifyData, busPostId, name, email, number, selectedSeats, address, totalPrices, seatPrice, routeAndDateAndTime, buyDate, }
        console.log(passengerData)
        setBusPassengerData(passengerData)
        console.log("hello", passengerData)
        navigate("/strip-payment")
    }

    console.log("----------------------",currentUser)

    return (
        <>
            <div
                className="relative hero min-h-[400px] flex items-center justify-center w-full "
                style={{
                    backgroundImage: `url(${travelBannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 "></div>
                <div className=" relative z-10 container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-center gap-10 lg:justify-between px-5 mt-10">
                        <div className="text-left ">
                            <h1 className="text-main mt-8 text-2xl md:text-3xl lg:text-5xl mb-5  font-bold">{location?.state?.busName}</h1>
                            <p className="text-white">From: {location?.state?.from}</p>
                            <p className="text-white">To: {location?.state?.to}</p>
                        </div>
                        <div>
                            <Link to={"/travel/bus-ticket-book"} className="btn bg-main shadow-none border-none text-white">Modify Search</Link>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-20 flex justify-between px-5 text-supporting">
                        <p>Total Seat: {52}</p>
                        <p>Booked Seat: {bookedSeat ? bookedSeat.length: 0}</p>
                        <p>Available Seat: {bookedSeat ? 52-bookedSeat.length: 0}</p>
                    </div>
                </div>
            </div>
            <section className="container mx-auto my-20 px-5 ">
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                    {/* Seat Selection Grid */}
                    <div className={`  ${darkMode ?  "bg-[#1d1d1d] text-white" : "text-[#111111] bg-white" } p-6 rounded-lg shadow-2xl col-span-2 `}>
                        <h2 className="text-lg font-semibold mb-4">Select Your Seat</h2>
                        {/* Legend */}
                        <div className="flex items-center justify-between space-x-4 mb-6">
                            <div className="flex items-center space-x-2">
                                <span className="w-6 h-6 bg-gray-200 rounded"></span>
                                <span>Available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-6 h-6 bg-main rounded"></span>
                                <span>Selected</span>
                            </div>
                        </div>

                        {/* Seat Grid */}
                        <div className="grid grid-cols-6 gap-4">
                            {[..."ABCDEFGHIJ"].map((row, idx) => (
                                <React.Fragment key={idx}>
                                    <p key={idx} className="flex text-center items-center justify-center">{row}</p>
                                    {[1, 2, null, 3, 4].map((num, index) => (
                                        num ? (
                                            <button
                                                disabled={ bookedSeat?.includes(`${row}${num}`) ||
                                                    selectedSeats.length >= 4 && !selectedSeats.includes(`${row}${num}`)
                                                }
                                                key={`${row}${num}`}
                                                onClick={() => handleSeatSelect(`${row}${num}`)}
                                                className={`btn rounded ${selectedSeats.includes(`${row}${num}`)
                                                    ? "bg-main"
                                                    : `${!darkMode && "bg-gray-200"}  hover:bg-main `
                                                    } ${darkMode &&  ` bg-dark-surface  text-white border-main ` } ${bookedSeat?.includes(`${row}${num}`) && "text-[10px] md:text-[16px]"}`}
                                            >
                                                {bookedSeat?.includes(`${row}${num}`) ? "Booked":`${row}${num}`}
                                            </button>
                                        ) : (
                                            <p key={`${row}-empty-${index}`}></p>
                                        )
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Seat Details and Form */}
                    <div className={`  ${darkMode ?  "bg-[#1d1d1d] text-white" : "text-[#111111] bg-white" } p-6 rounded-lg  col-span-1 shadow-2xl `}>
                        <h2 className="text-lg font-semibold mb-4">Selected Your Seat</h2>
                        <div className={`mb-6 ${darkMode &&  ` bg-dark-surface  text-whit ` } rounded-2xl p-8`}>
                            <div className="flex justify-between py-2 font-semibold">
                                <div>
                                    <span>Seat</span>
                                    <span className="p-1 bg-main text-white rounded-md ml-2">
                                        {selectedSeats.length}
                                    </span>
                                </div>
                                <span>Price</span>
                            </div>
                            <div className="mb-6 border-t-2 border-dashed">
                                {selectedSeats.map((seat) => (
                                    <div key={seat} className="flex justify-between py-2">
                                        <span>{seat}</span>
                                        <span>BDT {seatPrice}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Total Price */}
                            <div className="flex justify-between border-t-2 pt-4 mt-4">
                                <span>Total Seat Price</span>
                                <p>
                                    <span>BDT </span>
                                    <span>{selectedSeats.length * seatPrice}</span>
                                </p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <span>Service Fee {"(5%)"}</span>
                                <p>
                                    <span>BDT </span>
                                    <span>{selectedSeats.length * seatPrice * 0.05}</span>
                                </p>
                            </div>
                            <div className="flex justify-between border-t-2 pt-4 mt-4">
                                <span>Total Price</span>
                                <p>
                                    <span>BDT </span>
                                    <span>{selectedSeats.length * seatPrice * 0.05 + selectedSeats.length * seatPrice}</span>
                                </p>
                            </div>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleTravelInfo} className="mt-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Passenger Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={currentUser?.name}
                                    className={`w-full border input border-gray-300 rounded-lg px-4 py-2 mt-1 ${darkMode &&  ` bg-dark-surface border-main text-white` }`}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    name="number"
                                    defaultValue={currentUser?.phone}
                                    className={`w-full border input border-gray-300 rounded-lg px-4 py-2 mt-1 ${darkMode &&  ` bg-dark-surface border-main text-white` }`}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Email ID</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={user?.email}
                                    className={`w-full border input border-gray-300 rounded-lg px-4 py-2 mt-1 ${darkMode &&  ` bg-dark-surface border-main text-white` }`}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={currentUser?.address}
                                    className={`w-full border input border-gray-300 rounded-lg px-4 py-2 mt-1 ${darkMode &&  ` bg-dark-surface border-main text-white` }`}
                                    placeholder="Enter your address"
                                    required
                                />
                            </div>
                            {/* Booking Button */}
                            <input type="submit" value={"Checkout"} disabled={selectedSeats.length < 1} className={`w-full bg-main btn text-white shadow-none  py-2 rounded-lg font-semibold ${darkMode &&  ` text-white border-main ` }`} />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TravelSelectSet