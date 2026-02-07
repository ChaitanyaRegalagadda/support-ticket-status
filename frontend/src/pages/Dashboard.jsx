import { useEffect, useState } from "react";
import { getTickets } from "../services/api";
import TicketCard from "../components/TicketCard";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = () => {
    setLoading(true);
    getTickets()
      .then((res) => setTickets(res.data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTickets();
  }, []);

  if (loading) return <p className="p-6">Loading tickets...</p>;

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-slate-50 rounded-xl p-6 shadow-sm">

        <h1 className="text-2xl font-bold mb-6">
          Support Ticket Dashboard
        </h1>

        {tickets.length === 0 ? (
          <p className="text-gray-500">No tickets found.</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket._id}
                ticket={ticket}
                onUpdate={loadTickets}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  </div>
);
}
