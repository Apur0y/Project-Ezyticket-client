import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaCircleCheck, FaReceipt } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiPackage, FiHash } from "react-icons/fi";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const TravelPaymentSuccess = () => {
    const { darkMode } = useAuth()
    const { tran_id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: payment, isLoading, isError } = useQuery({
        queryKey: ['payment', tran_id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${tran_id}`);
            console.log(res?.data)
            return res.data;
        }
    });

    const contentRef = useRef();
    const handlePrint = useReactToPrint({ contentRef });

    if (isLoading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="animate-pulse text-xl">Loading your receipt...</div>
        </div>
    );

    if (isError) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="text-xl text-red-500">
                Failed to load order details
                </div>
        </div>
    );

    return (
        <>
            <div className="min-h-screen  pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div ref={contentRef} className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex items-center gap-3 mx-auto w-fit">
                            <div className="p-2 rounded-full bg-green-100">
                                <FaCircleCheck className="text-4xl text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Payment Successful!
                            </h1>
                        </div>
                        <p className="mt-2 text-lg payment">
                            Thank you for your purchase, 
                            <span className="font-semibold text-main">{payment?.name}</span>!
                        </p>
                    </div>

                    <div
                        className={`
                        ${darkMode ? "bg-[#1d1d1d] text-white" :
                                "bg-white"}  
                    shadow-lg rounded-lg overflow-hidden`}>
                        <div className="px-6 py-5 bg-main text-white flex items-center">
                            <FaReceipt className="h-6 w-6 mr-2" />
                            <h2 className="text-xl font-semibold">
                                Bus Ticket Receipt
                                </h2>
                        </div>

                        <div className="border-t border-gray-200 px-6 py-5">
                            <div className="flex flex-col md:flex-row justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium ">
                                            Order ID:
                                            </p>
                                        <p className="text-lg font-semibold ">
                                            {payment._id}
                                            </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium payment">
                                            Transaction ID:
                                            </p>
                                        <p className="text-lg font-semibold payment">
                                            {payment.transactionId}
                                            </p>
                                    </div>
                                </div>
                                <div className="md:text-right flex md:flex-col items-center md:items-end gap-2">
                                    <p className="text-sm font-medium payment">
                                        Purchase Date
                                        </p>
                                    <p className="text-sm md:text-lg">
                                        {new Date(payment.buyDate).toLocaleDateString("en-GB")} at{" "}
                                        {new Date(payment.buyDate).toLocaleTimeString("en-GB")}
                                    </p>
                                </div>
                            </div>
                                {/* Ticket Details */}
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <FiPackage className="mr-2" /> 
                                    Ticket Details
                                </h3>
                                <div className={` ${darkMode ? "bg-dark-surface text-white" :
                                "bg-green-50"}   rounded-lg p-4`}>
                                    {/* Buyer Name */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment">
                                            Buyer Name
                                            </p>
                                        <p className="font-medium">
                                            {payment.name}
                                            </p>
                                    </div>
                                    {/* Route */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment">Route</p>
                                        <p className="font-medium">
                                            {payment.routeAndDateAndTime.from} → {payment.routeAndDateAndTime.to}
                                        </p>
                                    </div>
                                    {/* Travel Date */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment">
                                            Travel Date
                                            </p>
                                        <p className="font-medium">
                                            {payment.routeAndDateAndTime.date}
                                            </p>
                                    </div>
                                    {/* Departure Time */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment">
                                            Departure Time
                                            </p>
                                        <p className="font-medium">
                                            {payment.routeAndDateAndTime.time}
                                            </p>
                                    </div>
                                    {/* Purchase Date */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment">
                                            Purchase Date
                                            </p>
                                        <p className="font-medium">
                                            {new Date(payment.buyDate).toLocaleDateString("en-GB")}
                                        </p>
                                    </div>
                                    {/* Purchase Time */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment">Purchase Time</p>
                                        <p className="font-medium">
                                            {new Date(payment.buyDate).toLocaleString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                    {/* Seat(s) */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment">Seat(s)</p>
                                        <p className="font-medium">{payment.selectedSeats.join(", ")}</p>
                                    </div>
                                    {/* Seat Price */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment">Seat Price</p>
                                        <p className="font-medium">Tk {payment.seatPrice}</p>
                                    </div>
                                    {/* Total */}
                                    <div className="flex justify-between py-2">
                                        <p className="payment font-semibold">Total</p>
                                        <p className="font-bold">Tk {payment.seatPrice * payment.selectedSeats.length}</p>
                                    </div>
                                    {/* Charge (5% */}
                                    <div className="flex justify-between py-2">

                                        <p className="payment font-semibold">Charge (5%)</p>
                                        <p className="font-medium">Tk {(payment.totalPrices - (payment.seatPrice * payment.selectedSeats.length)).toFixed(2)}</p>
                                    </div>
                                    {/* Total Amount */}
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <div className="flex justify-between py-2">
                                        <p className="payment font-semibold">Total Amount</p>
                                        <p className="text-xl font-bold text-main">Tk {payment.totalPrices}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-medium  mb-4 flex items-center">
                                    <FiHash className="mr-2" /> 
                                    Next Steps
                                </h3>
                                <div className={`${darkMode ? "bg-dark-surface text-white" :
                                "bg-green-50"}  rounded-lg p-4`}>
                                    <p className="payment mb-2">
                                        # Your ticket has been booked successfully.
                                        </p>
                                    <p className="payment">
                                        # Visit the dashboard to download or print your ticket.
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="px-6 py-8  text-center">
                    <button
                        onClick={handlePrint}
                        className="ezy-button-primary"
                    >
                        Print Receipt
                    </button>
                    <p className="mt-2 text-sm payment">
                        Need help?{" "}
                        <a href="/contact" className="font-medium text-supporting hover:text-orange-500">
                            Contact support
                        </a>
                    </p>
                </div>
            </div>

        </>
    );
};

export default TravelPaymentSuccess;