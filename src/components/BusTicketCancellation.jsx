import { FaRegCalendarTimes, FaUndo, FaClock, FaMoneyBillWave, FaExclamationTriangle } from "react-icons/fa";

const BusTicketCancellation = () => {
  return (
    <div className=" flex items-center justify-center p-6 mt-20">
      <div className="max-w-4xl w-full bg-white p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Bus Ticket Cancellation Policy</h1>
        <p className="text-gray-600 text-center mb-6">Life is unpredictable, but knowing your cancellation options can make things easier. Here’s everything you need to know.</p>

        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
            <FaRegCalendarTimes className="text-red-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold">Non-Refundable Tickets</h2>
              <p className="text-gray-600">These tickets are cheaper but cannot be canceled or refunded. Make sure your plans are set before booking.</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
            <FaUndo className="text-blue-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold">Refundable Tickets</h2>
              <p className="text-gray-600">Cancel at least <strong>24 hours</strong> before departure for a full refund. If canceled within 24 hours, a <strong>50% cancellation fee</strong> applies.</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
            <FaClock className="text-yellow-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold">Refund Processing Time</h2>
              <p className="text-gray-600">Refunds will be processed within <strong>5-7 business days</strong> to your original payment method.</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
            <FaMoneyBillWave className="text-green-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold">Rescheduling Option</h2>
              <p className="text-gray-600">Need to change your date? You can reschedule at least <strong>12 hours</strong> before departure, subject to availability and a small fee.</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
            <FaExclamationTriangle className="text-orange-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold">Emergency Situations</h2>
              <p className="text-gray-600">In case of natural disasters, strikes, or other emergencies, we will assess and provide refund/reschedule options.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="btn btn-primary">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default BusTicketCancellation;