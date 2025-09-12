// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import {
//   ColDef,
//   ModuleRegistry,
//   AllCommunityModule,
//   ICellRendererParams,
// } from "ag-grid-community";
// import TicketModal from "./_components/Modal/TicketModal";

// // Register all community modules before using AgGridReact
// ModuleRegistry.registerModules([AllCommunityModule]);

// type Ticket = {
//   ticket_number: string;
//   email: string;
//   concern: string;
//   date_created: string;
//   status: string;
// };

// const AdminPage = () => {
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null); // ⬅️ Add this

//   //   useEffect(() => {
//   //     const fetchTickets = async () => {
//   //       try {
//   //         const res = await axios.get("/admin/api/ticket");
//   //         setTickets(res.data);
//   //       } catch (err) {
//   //         console.error("Error fetching tickets:", err);
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     };

//   //     fetchTickets();
//   //   }, []);

//   //   useEffect(() => {
//   //     let intervalId: NodeJS.Timeout;

//   //     const fetchTickets = async () => {
//   //       try {
//   //         const res = await axios.get("/admin/api/ticket");
//   //         setTickets(res.data);
//   //       } catch (err) {
//   //         console.error("Error fetching tickets:", err);
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     };

//   //     // Initial fetch
//   //     fetchTickets();

//   //     // Poll every 5 seconds
//   //     intervalId = setInterval(fetchTickets, 5000);

//   //     // Cleanup on unmount
//   //     return () => clearInterval(intervalId);
//   //   }, []);
//   //   useEffect(() => {
//   //     let intervalId: NodeJS.Timeout;

//   //     const fetchTickets = async () => {
//   //       try {
//   //         const res = await axios.get("/admin/api/ticket");
//   //         setTickets(res.data);
//   //       } catch (err) {
//   //         console.error("Error fetching tickets:", err);
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     };

//   //     fetchTickets();
//   //     intervalId = setInterval(fetchTickets, 5000);

//   //     return () => clearInterval(intervalId);
//   //   }, []);
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

//   const SkeletonRow = () => (
//     <tr>
//       {[...Array(6)].map((_, i) => (
//         <td key={i} className="px-4 py-2">
//           <div className="h-4 bg-gray-300 rounded animate-pulse" />
//         </td>
//       ))}
//     </tr>
//   );

//   const SkeletonTable = () => (
//     <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
//       <table className="table w-full text-sm text-center">
//         <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white uppercase">
//           <tr>
//             <th className="px-4 py-2">Ticket #</th>
//             <th className="px-4 py-2">Email</th>
//             <th className="px-4 py-2">Concern</th>
//             <th className="px-4 py-2">Submitted At</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...Array(10)].map((_, i) => (
//             <SkeletonRow key={i} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const columnDefs: ColDef<Ticket>[] = [
//     {
//       headerName: "Ticket #",
//       field: "ticket_number",
//       cellRenderer: (params: ICellRendererParams<Ticket>) => (
//         <span className="font-mono text-blue-600">{params.value}</span>
//       ),
//       sortable: true,
//       filter: true,
//       flex: 1,
//     },
//     {
//       headerName: "Email",
//       field: "email",
//       sortable: true,
//       filter: true,
//       flex: 1,
//     },
//     {
//       headerName: "Concern",
//       field: "concern",
//       sortable: true,
//       filter: true,
//       flex: 2,
//     },
//     {
//       headerName: "Submitted At",
//       field: "date_created",
//       sortable: true,
//       filter: "agDateColumnFilter",
//       valueFormatter: (params) => new Date(params.value).toLocaleString(),
//       flex: 1.5,
//     },
//     {
//       headerName: "Status",
//       field: "status",
//       sortable: true,
//       filter: true,
//       flex: 1,
//       cellClass: "capitalize",
//     },
//     // {
//     //   headerName: "Action",
//     //   flex: 1.5,
//     //   cellRenderer: (params: ICellRendererParams<Ticket>) => {
//     //     const ticket = params.data;
//     //     return (
//     //       <div className="flex justify-center gap-2">
//     //         <TicketModal />
//     //         <button
//     //           className={`btn btn-sm ${
//     //             ticket?.status === "claimed" ? "btn-disabled" : "btn-primary"
//     //           }`}
//     //           disabled={ticket?.status === "claimed"}
//     //           onClick={() => {
//     //             if (ticket?.status !== "claimed") {
//     //               alert(`Claim ticket ${ticket?.ticket_number}`);
//     //               // Your claim logic here
//     //             }
//     //           }}
//     //         >
//     //           {ticket?.status === "claimed" ? "Claimed" : "Claim"}
//     //         </button>
//     //       </div>
//     //     );
//     //   },
//     // },
//     {
//       headerName: "Action",
//       flex: 1.5,
//       cellRenderer: (params: ICellRendererParams<Ticket>) => {
//         const ticket = params.data;

//         return (
//           <div className="flex justify-center gap-2">
//             <button
//               className="btn btn-sm btn-outline btn-info"
//               onClick={() => setSelectedTicket(ticket!)} // ⬅️ Open modal
//             >
//               View
//             </button>
//             <button
//               className={`btn btn-sm text-center w-20 ${
//                 ticket?.status === "claimed" ? "btn-disabled" : "btn-primary"
//               }`}
//               disabled={ticket?.status === "claimed"}
//               onClick={() => {
//                 alert(`Claim ticket ${ticket?.ticket_number}`);
//               }}
//             >
//               {ticket?.status === "claimed" ? "Claimed" : "Claim"}
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto mt-10 p-4">
//       <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
//         Submitted Tickets
//       </h1>

//       {loading ? (
//         <SkeletonTable />
//       ) : tickets.length === 0 ? (
//         <div className="text-center text-lg text-gray-500">
//           No tickets submitted yet.
//         </div>
//       ) : (
//         <div className="ag-theme-alpine" style={{ width: "100%", height: 600 }}>
//           <AgGridReact
//             rowData={tickets}
//             columnDefs={columnDefs}
//             pagination={true}
//             paginationPageSize={10}
//             domLayout="autoHeight"
//             defaultColDef={{
//               resizable: true,
//               sortable: true,
//               filter: true,
//             }}
//           />
//         </div>
//       )}

//       {/* Modal rendered here once */}
//       {selectedTicket && (
//         <TicketModal
//           ticket={selectedTicket}
//           onClose={() => setSelectedTicket(null)}
//         />
//       )}
//     </div>
//   );
// };
// export default AdminPage;

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setError("");
  //     setLoading(true);

  //     try {
  //       await axios.post("/api/login", formData);
  //       router.push("/dashboard");
  //     } catch (err: any) {
  //       setError(err.response?.data?.error || "Login failed");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      //   await axios.post("/api/login", formData);
      const res = await axios.post("/api/login", formData);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/admin/support/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Login failed");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    //   <h1 className="text-2xl font-bold mb-6">Login</h1>
    //   {error && <p className="text-red-600 mb-4">{error}</p>}
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <input
    //       name="email"
    //       type="email"
    //       placeholder="Email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       className="w-full px-4 py-2 border rounded"
    //       required
    //     />
    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="Password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       className="w-full px-4 py-2 border rounded"
    //       required
    //     />
    //     <button
    //       type="submit"
    //       disabled={loading}
    //       className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    //     >
    //       {loading ? "Logging in..." : "Login"}
    //     </button>
    //   </form>
    // </main>
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h1>

        {error && (
          <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <span className="text-gray-400">
            Forgot password?{" "}
            <Link
              className="hover:underline hover:text-blue-400"
              href="/admin/forgot_password"
            >
              click here
            </Link>
          </span>
        </form>
      </div>
    </main>
  );
}
