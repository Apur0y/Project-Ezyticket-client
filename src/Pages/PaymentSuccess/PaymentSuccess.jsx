import { FaCircleCheck, FaReceipt } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiPackage, FiCreditCard, FiDollarSign, FiHash } from "react-icons/fi";

const PaymentSuccess = () => {
    const { tran_id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['order', tran_id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/${tran_id}`);
            return res.data;
        }
    });

    if (isLoading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="animate-pulse text-xl">Loading your receipt...</div>
        </div>
    );

    if (isError) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="text-xl text-red-500">Failed to load order details</div>
        </div>
    );

    const { order } = data;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex items-center gap-3 mx-auto w-fit">
                        <div className="p-2 rounded-full bg-green-100">
                            <FaCircleCheck className="text-4xl text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Payment Successful!
                        </h1>
                    </div>
                    <p className="mt-2 text-lg text-gray-600">
                        Thank you for your purchase, <span className="font-semibold text-main">{order.name}</span>!
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-5 bg-main text-white flex items-center">
                        <FaReceipt className="h-6 w-6 mr-2" />
                        <h2 className="text-xl font-semibold">Order Receipt</h2>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-5">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-500">Order ID: </p>
                                    <p className="text-lg font-semibold text-gray-600">{data._id}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-500">Transaction ID: </p>
                                    <p className="text-lg font-semibold text-gray-600">{data.transactionId}</p>
                                </div>
                            </div>
                            <div className="md:text-right flex md:flex-col items-center md:items-end gap-2">
                                <p className="text-sm font-medium text-gray-500">Date</p>
                                <p className="text-sm md:text-lg">
                                    {data.paymentTime}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FiPackage className="mr-2" /> Order Summary
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between py-2">
                                    <p className="text-gray-600">Name</p>
                                    <p className="font-medium">{order.name}</p>
                                </div>
                                <div className="flex justify-between py-2">
                                    <p className="text-gray-600">Contact</p>
                                    <p className="font-medium">{order.phone}</p>
                                </div>
                                <div className="flex justify-between py-2">
                                    <p className="text-gray-600">Product</p>
                                    <p className="font-medium">{order.product}</p>
                                </div>
                                <div className="flex justify-between py-2">
                                    <p className="text-gray-600">Quantity</p>
                                    <p className="font-medium">{order.quantity}</p>
                                </div>

                          {  order?.ticketType=="entertainment" && (<>
                           
                          
                           
                            <div className="flex justify-between py-2">
                                <p className="text-gray-600">Seats Number</p>
                                <p className="font-medium">{order?.selectedSeats}</p>
                            </div>

                            <div className="flex justify-between py-2">
                                <p className="text-gray-600">Show Date</p>
                                <p className="font-medium">{order?.date.split("T")[0]}</p>
                            </div>
                           
                            <div className="flex justify-between py-2">
                                <p className="text-gray-600">Show Time</p>
                                <p className="font-medium">{order.time}</p>
                            </div>
                           
                           
                            <div className="flex justify-between py-2">
                                <p className="text-gray-600">Hall Name</p>
                                <p className="font-medium">{order?.cineplex}</p>
                            </div>
                           
                            

                            <div className="flex justify-between py-2">
                            <p className="text-gray-600">Show Day</p>
                                <p className="font-medium">{order?.day}</p>
          
                            </div></>)
                          }
                             




                                <div className="flex justify-between py-2">
                                    <p className="text-gray-600">Unit Price</p>
                                    <p className="font-medium">Tk {order.unitPrice}</p>
                                </div>
                                <div className="border-t border-gray-200 my-2"></div>
                                <div className="flex justify-between py-2">
                                    <p className="text-gray-600 font-semibold">Total</p>
                                    <p className="font-bold">Tk {order.unitPrice * order.quantity}</p>
                                </div>
                                <div className="flex justify-between py-2">
                                    <p className="text-gray-600">Charge (5%)</p>
                                    <p className="font-medium">Tk {order.charge}</p>
                                </div>
                                <div className="border-t border-gray-200 my-2"></div>
                                <div className="flex justify-between py-2">
                                    <p className="text-gray-600 font-semibold">Total Amount</p>
                                    <p className="text-xl font-bold text-main">Tk {order.price}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <FiHash className="mr-2" /> Next Steps
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-600 mb-2"># Your order is Complete. Go to Dashboard and download your ticket.</p>
                                    <p className="text-gray-600"># Print this Receipt for future query.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                        <button
                            onClick={() => window.print()}
                            className="ezy-button-primary"
                        >
                            Print Receipt
                        </button>
                        <p className="mt-2 text-sm text-gray-500">
                            Need help? <a href="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">Contact support</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;