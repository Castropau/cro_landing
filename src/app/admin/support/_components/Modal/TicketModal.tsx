"use client";

import React from "react";

type Ticket = {
  ticket_number: string;
  email: string;
  concern: string;
  date_created: string;
  status: string;
};

const TicketModal = ({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold dark:text-white">
            Ticket #{ticket.ticket_number}
          </h3>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-800 hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-gray-700 dark:text-gray-300">
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
      </div>
    </div>
  );
};

export default TicketModal;
