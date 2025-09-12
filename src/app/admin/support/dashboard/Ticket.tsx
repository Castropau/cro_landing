"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  ICellRendererParams,
} from "ag-grid-community";
import TicketModal from "../_components/Modal/TicketModal";
import ClaimTicketModal from "../_components/Modal/ClaimTicket";
import { FaClipboard } from "react-icons/fa";

// Register all community modules before using AgGridReact
ModuleRegistry.registerModules([AllCommunityModule]);

type Ticket = {
  id: number;
  ticket_number: string;
  email: string;
  concern: string;
  date_created: string;
  status: string;
};
type Tickets = {
  id: number;
  ticket_number: string;
  email: string;
  concern: string;
  date_created: string;
  status: string;
};

const ListTicket = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimTicket, setSelectedClaimTicket] = useState<Ticket | null>(null); // ⬅️ Add this

  const [selectedTicket, setSelectedTicket] = useState<Tickets | null>(null); // ⬅️ Add this
  //   const [openModal, setOpenModal] = useState(false);
  // const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("/api/ticket/get");
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  //   useEffect(() => {
  //     let intervalId: NodeJS.Timeout;

  //     const fetchTickets = async () => {
  //       try {
  //         const res = await axios.get("/admin/api/ticket");
  //         setTickets(res.data);
  //       } catch (err) {
  //         console.error("Error fetching tickets:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     // Initial fetch
  //     fetchTickets();

  //     // Poll every 5 seconds
  //     intervalId = setInterval(fetchTickets, 5000);

  //     // Cleanup on unmount
  //     return () => clearInterval(intervalId);
  //   }, []);
  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;

  //   const fetchTickets = async () => {
  //     try {
  //       const res = await axios.get("/admin/api/ticket");
  //       setTickets(res.data);
  //     } catch (err) {
  //       console.error("Error fetching tickets:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTickets();
  //   intervalId = setInterval(fetchTickets, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);
  //   useEffect(() => {
  //     const fetchTickets = async () => {
  //       try {
  //         const res = await axios.get("/admin/api/ticket");
  //         setTickets(res.data);
  //       } catch (err) {
  //         console.error("Error fetching tickets:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchTickets();

  //     const intervalId = setInterval(fetchTickets, 5000);

  //     return () => clearInterval(intervalId);
  //   }, []);

  const SkeletonRow = () => (
    <tr>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-2">
          <div className="h-4 bg-gray-300 rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );
  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy!");
      }
    } else {
      alert("Clipboard API is not available in your browser.");
    }
  };

  const SkeletonTable = () => (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <table className="table w-full text-sm text-center">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white uppercase">
          <tr>
            <th className="px-4 py-2">Ticket #</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Concern</th>
            <th className="px-4 py-2">Submitted At</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
  // const [user, setUser] = useState<{
  //   id: number;
  //   email: string;
  //   firstname: string;
  // } | null>(null);

  // {
  //   user ? (
  //     <div>
  //       <p>Welcome, {user.firstname}!</p>
  //       <p>Your email: {user.email}</p>
  //     </div>
  //   ) : (
  //     <p>Loading user...</p>
  //   );
  // }

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  const columnDefs: ColDef<Ticket>[] = [
    {
      headerName: "Ticket #",
      field: "ticket_number",
      width: 150,
      cellRenderer: (params: ICellRendererParams<Ticket>) => (
        <span className="font-mono text-blue-600">{params.value}</span>
      ),
      sortable: true,
      filter: true,
      // flex: 1,
      headerClass: "ticket dark:bg-gray-900 dark:text-white",
      cellClass: "bg-white dark:bg-gray-800 text-black dark:text-white",
    },
    // {
    //   headerName: "Email",
    //   field: "email",
    //   sortable: true,
    //   width: 300,
    //   filter: true,
    //   flex: 1,
    //   cellRenderer: (params: ICellRendererParams<Ticket>) => {
    //     const email = params.value;
    //     return (
    //       <div className="flex items-center">
    //         <span>{email}</span>
    //         <button
    //           onClick={() => copyToClipboard(email)}
    //           className="ml-2 text-blue-500 hover:text-blue-700"
    //         >
    //           Copy
    //         </button>
    //       </div>
    //     );
    //   },
    // },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      headerClass: "dark:bg-gray-900 dark:text-white",
      cellClass: "bg-white dark:bg-gray-800 text-black dark:text-white",
      width: 300, // Set fixed width (e.g., 300px)
      cellRenderer: (params: ICellRendererParams<Ticket>) => {
        const email = params.value;
        return (
          <div className="flex items-center">
            <span>{email}</span>
            <button
              onClick={() => copyToClipboard(email)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              {/* Copy */}
              <FaClipboard />
            </button>
          </div>
        );
      },
    },

    {
      headerName: "Concern",
      field: "concern",
      sortable: true,
      filter: true,
      flex: 2,
      headerClass: "dark:bg-gray-900 dark:text-white",
      cellClass: "bg-white dark:bg-gray-800 text-black dark:text-white",
    },
    {
      headerName: "Submitted At",
      field: "date_created",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
      flex: 1.5,
      headerClass: "dark:bg-gray-900 dark:text-white",
      cellClass: "bg-white dark:bg-gray-800 text-black dark:text-white",
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      flex: 1,
      // cellClass: "capitalize",
      headerClass: "dark:bg-gray-900 dark:text-white",
      cellClass: " bg-white dark:bg-gray-800 text-black dark:text-white",
    },
    // {
    //   headerName: "Action",
    //   flex: 1.5,
    //   cellRenderer: (params: ICellRendererParams<Ticket>) => {
    //     const ticket = params.data;
    //     return (
    //       <div className="flex justify-center gap-2">
    //         <TicketModal />
    //         <button
    //           className={`btn btn-sm ${
    //             ticket?.status === "claimed" ? "btn-disabled" : "btn-primary"
    //           }`}
    //           disabled={ticket?.status === "claimed"}
    //           onClick={() => {
    //             if (ticket?.status !== "claimed") {
    //               alert(`Claim ticket ${ticket?.ticket_number}`);
    //               // Your claim logic here
    //             }
    //           }}
    //         >
    //           {ticket?.status === "claimed" ? "Claimed" : "Claim"}
    //         </button>
    //       </div>
    //     );
    //   },
    // },
    {
      headerName: "Action",
      flex: 1.5,
      filter: false,
      headerClass: "dark:bg-gray-900 dark:text-white",
      // cellStyle: {
      //   backgroundColor: "transparent", // fallback
      // },

      //   cellClass: "ag-center-text", // Ensures horizontal centering at cell level
      //   cellStyle: { textAlign: "center" },

      cellRenderer: (params: ICellRendererParams<Ticket>) => {
        const ticket = params.data;

        // return (
        //   <div className="flex justify-center gap-2">
        //     <button
        //       className="btn btn-sm btn-outline btn-info"
        //       onClick={() => setSelectedTicket(ticket!)}
        //     >
        //       View
        //     </button>
        //     <button
        //       className={`btn btn-sm text-center w-20 ${
        //         ticket?.status === "claimed" ? "btn-disabled" : "btn-primary"
        //       }`}
        //       disabled={ticket?.status === "claimed"}
        //       onClick={() => {
        //         alert(`Claim ticket ${ticket?.ticket_number}`);
        //       }}
        //     >
        //       {ticket?.status === "claimed" ? "Claimed" : "Claim"}
        //     </button>
        //   </div>
        // );
        return (
          <div className="flex justify-center gap-2">
            <button
              className="btn btn-sm btn-outline btn-info hover:text-white"
              onClick={() => setSelectedTicket(ticket!)}
            >
              View
            </button>
            <button
              className={`btn btn-sm text-center w-20 ${
                ticket?.status === "claimed"
                  ? "btn-disabled"
                  : "btn-success text-white"
              }`}
              disabled={ticket?.status === "claimed"}
              //   onClick={() => {
              //     alert(`Claim ticket ${ticket?.ticket_number} id - ${user?.id}`);
              //   }}
              //   onClick={() => setSelectedTicket(ticket!)}
              onClick={() => setSelectedClaimTicket(ticket!)} // ✅ fix
            >
              {ticket?.status === "claimed" ? "Claimed" : "Claim"}
            </button>
            {/* <button
              className={`btn btn-sm text-center w-20 ${
                ticket?.status === "claimed"
                  ? "btn-disabled"
                  : "btn-success text-white"
              }`}
              disabled={ticket?.status === "claimed"}
              onClick={async () => {
                try {
                  // Re-fetch the latest status from your backend
                  //   const response = await fetch(`/api/ticket/${ticket?.id}`);
                  //   const data = await response.json();

                  if (ticket?.status === "claimed") {
                    alert("This ticket is already claimed!");
                  } else {
                    alert(`Claim ticket ${ticket?.ticket_number}`);
                    // Optionally proceed to claim here with another API call
                    // await fetch(`/api/tickets/${ticket?.id}/claim`, { method: 'POST' });
                  }
                } catch (error) {
                  console.error("Error checking ticket status:", error);
                  alert("Something went wrong while checking the ticket.");
                }
              }}
            >
              {ticket?.status === "claimed" ? "Claimed" : "Claim"}
            </button> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Submitted Tickets
      </h1>

      {loading ? (
        <SkeletonTable />
      ) : tickets.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No tickets submitted yet.
        </div>
      ) : (
        // <div className="ag-theme-alpine" style={{ width: "100%", height: 600 }}>
        <div className="ag-theme-alpine dark:bg-gray-900 w-full h-full">
          <AgGridReact
            rowData={tickets}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={false}
            domLayout="autoHeight"
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
            }}
          />
        </div>
      )}

      {/* Modal rendered here once */}

      {claimTicket && (
        <ClaimTicketModal
          ticket={claimTicket}
          onClose={() => setSelectedClaimTicket(null)}
        />
      )}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};
export default ListTicket;
