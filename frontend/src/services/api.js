import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const createTicket = (data) => API.post("/tickets", data);
export const getTickets = () => API.get("/tickets");
export const updateStatus = (id, status) =>
  API.patch(`/tickets/${id}/status`, { status });
export const addComment = (id, comment) =>
  API.post(`/tickets/${id}/comments`, comment);
