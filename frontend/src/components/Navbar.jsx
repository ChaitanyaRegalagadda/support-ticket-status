import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between">
      <h1 className="font-bold text-lg">Support System</h1>
      <div className="space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link to="/create" className="text-blue-600 hover:underline">
          Create Ticket
        </Link>
      </div>
    </nav>
  );
}
