"use client";

import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
type Ticket = {
  ticket_number: string;
  email: string;
  concern: string;
  date_created: string;
  status: string;
};

const StatusModal = ({
  ticket,
  onClose,
  onStatusUpdated, // optional callback to refresh UI
}: {
  ticket: Ticket;
  onClose: () => void;
  onStatusUpdated?: (status: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingClosed, setLoadingClosed] = useState(false);

  //   const updateClosed = async (status: "closed" | "solved") => {
  //     // const confirmed = window.confirm(
  //     //   `Are you sure you want to mark ticket #${ticket.ticket_number} as ${status}?`
  //     // );
  //     // if (!confirmed) return;

  //     try {
  //       setLoading(true);
  //       const res = await fetch("/api/ticket/closed", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ ticket_number: ticket.ticket_number, status }),
  //       });

  //       if (!res.ok) throw new Error("Failed to update status");

  //       alert(`Ticket marked as ${status}.`);
  //       if (onStatusUpdated) onStatusUpdated(status);
  //       onClose();
  //     } catch (error) {
  //       console.error(error);
  //       alert("Something went wrong while updating the status.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  // import axios from "axios";

  // const updateClosed = async (status: "closed" | "solved") => {
  //   try {
  //     setLoading(true);

  //     const res = await axios.post("/api/ticket/closed", {
  //       ticket_number: ticket.ticket_number,
  //       status,
  //     });

  //     if (res.status !== 200) {
  //       throw new Error("Failed to update status");
  //     }

  //     alert(`Ticket marked as ${status}.`);
  //     if (onStatusUpdated) onStatusUpdated(status);
  //     onClose();
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something went wrong while updating the status.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateClosed = async (status: "closed" | "solved") => {
    try {
      setLoadingClosed(true);

      const res = await axios.post("/api/ticket/closed", {
        ticket_number: ticket.ticket_number,
        status,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update status");
      }

      await Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Ticket marked as ${status}.`,
      });

      if (onStatusUpdated) onStatusUpdated(status);
      onClose();
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the status.",
      });
    } finally {
      setLoadingClosed(false);
    }
  };

  //   const updateSolved = async (status: "closed" | "solved") => {
  //     // const confirmed = window.confirm(
  //     //   `Are you sure you want to mark ticket #${ticket.ticket_number} as ${status}?`
  //     // );
  //     // if (!confirmed) return;

  //     try {
  //       setLoading(true);
  //       const res = await fetch("/api/ticket/solved", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ ticket_number: ticket.ticket_number, status }),
  //       });

  //       if (!res.ok) throw new Error("Failed to update status");

  //       alert(`Ticket marked as ${status}.`);
  //       if (onStatusUpdated) onStatusUpdated(status);
  //       onClose();
  //     } catch (error) {
  //       console.error(error);
  //       alert("Something went wrong while updating the status.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  // const updateSolved = async (status: "closed" | "solved") => {
  //   try {
  //     setLoading(true);

  //     const res = await axios.post("/api/ticket/solved", {
  //       ticket_number: ticket.ticket_number,
  //       status,
  //       // optionally send user info if needed for email
  //       // userEmail: user?.email,
  //       // userName: user?.firstname,
  //     });

  //     if (res.status !== 200) throw new Error("Failed to update status");

  //     alert(`Ticket marked as ${status}.`);
  //     if (onStatusUpdated) onStatusUpdated(status);
  //     onClose();
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something went wrong while updating the status.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // import Swal from "sweetalert2";

  const updateSolved = async (status: "closed" | "solved") => {
    try {
      setLoading(true);

      const res = await axios.post("/api/ticket/solved", {
        ticket_number: ticket.ticket_number,
        status,
        // optionally send user info if needed for email
        // userEmail: user?.email,
        // userName: user?.firstname,
      });

      if (res.status !== 200) throw new Error("Failed to update status");

      await Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Ticket marked as ${status}.`,
      });

      if (onStatusUpdated) onStatusUpdated(status);
      onClose();
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the status.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm  bg-opacity-30">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Ticket #{ticket.ticket_number}
          </h3>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white hover:cursor-pointer dark:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
          <p>
            <strong>Email:</strong> {ticket.email}
          </p>
          <p>
            <strong>Concern:</strong> {ticket.concern}
          </p>
          <p>
            <strong>Submitted At:</strong>
            {new Date(ticket.date_created).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{ticket.status}</span>
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            disabled={loadingClosed}
            className="btn btn-sm bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer"
            onClick={() => updateClosed("closed")}
          >
            Mark as Closed
          </button>
          <button
            disabled={loading}
            className="btn btn-sm bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer"
            onClick={() => updateSolved("solved")}
          >
            Mark as Solved
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
