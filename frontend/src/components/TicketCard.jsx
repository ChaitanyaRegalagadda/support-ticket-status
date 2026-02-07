import { useState } from "react";
import { updateStatus, addComment } from "../services/api";

export default function TicketCard({ ticket, onUpdate }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e) => {
  const newStatus = e.target.value;
  setLoading(true);

  try {
    // wait for backend
    await updateStatus(ticket._id, newStatus);

    // force fresh fetch from server
    await onUpdate();
  } catch (err) {
    alert("Failed to update status on server");
  } finally {
    setLoading(false);
  }
};


 const handleAddComment = async () => {
  if (!comment.trim()) return;
  setLoading(true);

  try {
    await addComment(ticket._id, {
      message: comment,
      author: "ADMIN",
    });

    setComment("");
    await onUpdate();
  } catch (err) {
    alert("Failed to add comment");
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
    
    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {ticket.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {ticket.description}
        </p>
      </div>

      {/* Status Badge */}
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium transition
          ${loading ? "opacity-60" : "opacity-100"}
          ${ticket.status === "OPEN" && "bg-blue-100 text-blue-700"}
          ${ticket.status === "IN_PROGRESS" && "bg-yellow-100 text-yellow-700"}
          ${ticket.status === "RESOLVED" && "bg-green-100 text-green-700"}
        `}
      >
        {loading ? "Updating on server…" : ticket.status.replace("_", " ")}
      </span>
    </div>

    {/* Divider */}
    <div className="border-t mt-4 pt-4">

      {/* Status Action */}
      <div className="flex items-center gap-3 mb-4">
        <select
          value={ticket.status}
          onChange={handleStatusChange}
          disabled={loading}
          className={`border rounded px-3 py-1 text-sm
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
        >
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>

        {loading && (
          <span className="text-xs text-gray-500">
            Syncing with backend…
          </span>
        )}
      </div>

      {/* Add Comment */}
      <div className="flex gap-2">
        <input
          disabled={loading}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add internal comment..."
          className={`flex-1 border rounded px-3 py-1 text-sm
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
            focus:ring-2 focus:ring-blue-500
          `}
        />
        <button
          onClick={handleAddComment}
          disabled={loading}
          className={`px-4 py-1 rounded text-sm text-white transition
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? "Saving…" : "Add"}
        </button>
      </div>

      {/* Existing Comments */}
      {ticket.comments?.length > 0 && (
        <div className="mt-4 space-y-1">
          {ticket.comments.map((c, i) => (
            <p key={i} className="text-xs text-gray-600">
              • {c.message}
            </p>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
