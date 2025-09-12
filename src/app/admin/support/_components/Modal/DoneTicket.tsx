"use client";

import React, { useEffect, useState } from "react";
// import axios from "axios";
import axios, { AxiosError } from "axios";

type Ticket = {
  ticket_number: string;
  email: string;
  concern: string;
  date_created: string;
  status: string;
};

const DoneTicketModal = ({
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //   const handleConfirmClaim = async () => {
  //     if (!user) {
  //       alert("User not logged in.");
  //       return;
  //     }

  //     try {
  //       const res = await axios.put(`/api/ticket/${ticket.ticket_number}/`, {
  //         userId: user.id,
  //       });

  //       if (res.status === 200) {
  //         alert(`Ticket #${ticket.ticket_number} claimed!`);
  //         onClose();
  //       } else {
  //         alert(res.data.message || "Failed to claim ticket.");
  //       }
  //     } catch (error: any) {
  //       console.error("Failed to claim ticket", error);
  //       alert(error.response?.data?.message || "Something went wrong.");
  //     }
  //   };
  //   const handleConfirmDone = async () => {
  //     if (!user) {
  //       alert("User not logged in.");
  //       return;
  //     }

  //     try {
  //       const res = await axios.put(`/api/ticket/done/${ticket.ticket_number}/`, {
  //         userId: user.id,
  //       });

  //       if (res.status === 200) {
  //         alert(`Ticket #${ticket.ticket_number} marked as done!`);
  //         onClose();
  //       } else {
  //         alert(res.data.message || "Failed to mark ticket as done.");
  //       }
  //     } catch (error: any) {
  //       console.error("Failed to mark ticket as done", error);
  //       alert(error.response?.data?.message || "Something went wrong.");
  //     }
  //   };

  const handleConfirmDone = async () => {
    if (!user) {
      alert("User not logged in.");
      return;
    }

    try {
      const res = await axios.put(`/api/ticket/done/${ticket.ticket_number}/`, {
        userId: user.id,
      });

      if (res.status === 200) {
        alert(`Ticket #${ticket.ticket_number} marked as done!`);
        onClose();
      } else {
        alert(res.data.message || "Failed to mark ticket as done.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response?.data?.message) {
        alert(axiosError.response.data.message);
      } else {
        alert("Something went wrong.");
      }

      console.error("Failed to mark ticket as done", axiosError);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Ticket #{ticket.ticket_number}</h3>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-800 hover:cursor-pointer"
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

        <div className="text-center text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
          Mark this ticket as <span className="font-bold">done</span>?
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Cancel
          </button>
          <button
            onClick={handleConfirmDone}
            className="btn btn-success btn-sm text-white"
          >
            Confirm Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoneTicketModal;
