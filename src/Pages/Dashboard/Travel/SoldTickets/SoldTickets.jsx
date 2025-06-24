import useSoldTicket from "./useSoldTicket";


const SoldTickets = () => {

  // const soldTickets = []
  // [
  //   {
  //     _id: "67fea80c5ad7a99c3c3966f2",
  //     verifyData: "bus",
  //     busPostId: "67e12be5f6b8682745586563",
  //     name: "kobirul",
  //     email: "user@gmail.com",
  //     number: "32424234",
  //     selectedSeats: ["A1", "A2"],
  //     address: "efdsf afasfdd",
  //     totalPrices: 1155,
  //     seatPrice: 550,
  //     routeAndDateAndTime: {
  //       buyDate: "2025-04-15T18:39:26.751Z",
  //       transactionId: "pi_3REEOIC8XXjshKCn0gYcTZ9v"
  //     }
  //   }
  // ];

  const [soldTickets] = useSoldTicket()

  return (
    <div className="mx-auto p-8 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="mb-8 flex items-center justify-center space-x-3">
        <svg className="w-8 h-8 text-main" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2h2a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 01-2-2v-6a2 2 0 012-2h2V6zm14 2H4V6h12v2zm-4 6a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <h2 className="text-3xl font-bold text-gray-800 ">Sold Tickets History</h2>
      </div>

      <div className="border border-gray-100 rounded-lg overflow-x-scroll shadow-sm">
        <table className="w-full text-base">
          <thead className="bg-main text-white">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wide text-left first:rounded-tl-lg">#</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-left">Buyer</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-left last:rounded-tr-lg">Transaction ID</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-left">Address</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-center">Seats</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-right">Price</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-right">Total</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-left">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {soldTickets.map((ticket, index) => (
              <tr key={ticket._id} className="hover:bg-emerald-50 transition-colors">
                <td className="px-6 py-4 text-gray-500 font-medium">{index + 1}</td>

                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{ticket.name}</span>
                    <span className="text-gray-800">{ticket.number}</span>
                    <span className="text-sm text-gray-500">{ticket.email}</span>
                  </div>
                </td>

                <td className="px-6 py-4 font-mono text-sm text-gray-500 hover:text-main cursor-copy">
                  {ticket?.transactionId}
                </td>

                <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate">{ticket.address}</td>

                <td className="px-6 py-4 text-center">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    {ticket?.selectedSeats?.length}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-medium text-gray-700">
                  {ticket.seatPrice}৳
                </td>

                <td className="px-6 py-4 text-right font-semibold text-main">
                  {ticket.totalPrices}৳
                </td>

                <td className="px-6 py-4 min-w-[180px] text-gray-500">
                  {new Date(ticket?.buyDate).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {soldTickets.length === 0 && (
        <div className="py-12 text-center text-gray-400">
          <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          No tickets sold yet
        </div>
      )}
      
    </div>
  );
};

export default SoldTickets;
