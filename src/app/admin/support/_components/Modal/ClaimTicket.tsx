"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

type Ticket = {
  ticket_number: string;
  email: string;
  concern: string;
  date_created: string;
  status: string;
};

const ClaimTicketModal = ({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) => {
  const [user, setUser] = useState<{
    id: number;
    email: string;
    firstname: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // const handleConfirmClaim = async () => {
  //   if (!user) {
  //     alert("User not logged in.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await axios.put(`/api/ticket/${ticket.ticket_number}/`, {
  //       userId: user.id,
  //       claimedBy: user.firstname,
  //     });

  //     if (res.status === 200) {
  //       alert(`Ticket #${ticket.ticket_number} claimed!`);
  //       onClose();
  //     } else {
  //       alert(res.data.message || "Failed to claim ticket.");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       alert(error.response?.data?.message || "Something went wrong.");
  //     } else {
  //       console.error("Unexpected error", error);
  //       alert("An unexpected error occurred.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleConfirmClaim = async () => {
    if (!user) {
      await Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "User not logged in.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(`/api/ticket/${ticket.ticket_number}/`, {
        userId: user.id,
        claimedBy: user.firstname,
      });

      if (res.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Ticket Claimed",
          text: `Ticket #${ticket.ticket_number} has been successfully claimed.`,
        });
        onClose();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Claim Failed",
          text: res.data.message || "Failed to claim ticket.",
        });
      }
    } catch (error) {
      console.error("Claim Error:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Something went wrong."
        : "An unexpected error occurred.";

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold dark:text-white">
            Ticket #{ticket.ticket_number}
          </h3>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-800 hover:cursor-pointer dark:text-white"
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
            <strong>Submitted At:</strong>{" "}
            {new Date(ticket.date_created).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {ticket.status}
          </p>
        </div>

        <div className="text-center text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
          Are you sure you want to claim this ticket?
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm dark:text-black dark:bg-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmClaim}
            className="btn btn-success btn-sm text-white"
            disabled={loading}
          >
            {loading ? "Claiming..." : "Confirm Claim"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimTicketModal;
