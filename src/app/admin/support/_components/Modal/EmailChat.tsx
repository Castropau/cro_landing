// "use client";

// import axios from "axios";
// import React, { useState } from "react";

// type Ticket = {
//   ticket_number: string;
//   email: string;
//   concern: string;
//   date_created: string;
//   status: string;
// };

// type Message = {
//   sender: "agent" | "user";
//   text: string;
//   time: string;
// };

// const EmailChat = ({
//   ticket,
//   onClose,
//   onStatusUpdated,
// }: {
//   ticket: Ticket;
//   onClose: () => void;
//   onStatusUpdated?: (status: string) => void;
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       sender: "user",
//       text: "You were the Chosen One!",
//       time: "12:45",
//     },
//     {
//       sender: "agent",
//       text: "I hate you!",
//       time: "12:46",
//     },
//     {
//       sender: "agent",
//       text: "I hate you!",
//       time: "12:46",
//     },
//     {
//       sender: "agent",
//       text: "I hate you!",
//       time: "12:46",
//     },
//     {
//       sender: "agent",
//       text: "I hate you!",
//       time: "12:46",
//     },
//     {
//       sender: "agent",
//       text: "I hate you!",
//       time: "12:46",
//     },
//     {
//       sender: "agent",
//       text: "I hate you!",
//       time: "12:46",
//     },
//   ]);

//   const updateStatus = async (
//     status: "closed" | "solved",
//     endpoint: string
//   ) => {
//     try {
//       setLoading(true);
//       const res = await axios.post(endpoint, {
//         ticket_number: ticket.ticket_number,
//         status,
//       });

//       if (res.status !== 200) throw new Error("Failed to update status");

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

//   const handleSendMessage = () => {
//     if (!message.trim()) return;

//     const newMessage: Message = {
//       sender: "agent",
//       text: message.trim(),
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     // Update local state
//     setMessages([...messages, newMessage]);
//     setMessage("");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg flex flex-col">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Ticket #{ticket.ticket_number}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-red-500"
//           >
//             ✖
//           </button>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[300px]">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`chat ${
//                 msg.sender === "agent" ? "chat-end" : "chat-start"
//               }`}
//             >
//               <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                   <img
//                     alt="Avatar"
//                     src={
//                       msg.sender === "agent"
//                         ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
//                         : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="chat-header">
//                 {msg.sender === "agent" ? "Support Agent" : ticket.email}
//                 <time className="text-xs opacity-50 ml-2">{msg.time}</time>
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">Delivered</div>
//             </div>
//           ))}
//         </div>

//         {/* Input Area */}
//         <div className="flex items-center space-x-2 mb-4">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="input input-bordered flex-1"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleSendMessage();
//             }}
//           />
//           <button onClick={handleSendMessage} className="btn btn-primary">
//             Send
//           </button>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={() => updateStatus("solved", "/api/ticket/solved")}
//             className="btn btn-success"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Mark as Solved"}
//           </button>
//           <button
//             onClick={() => updateStatus("closed", "/api/ticket/closed")}
//             className="btn btn-error"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Close Ticket"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailChat;
"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { PiFinnTheHumanThin } from "react-icons/pi";
import Swal from "sweetalert2";
// import { IoSend } from "react-icons/io5";
// import { IoIosSend } from "react-icons/io";

type Ticket = {
  ticket_number: string;
  email: string;
  concern: string;
  date_created: string;
  status: string;
};

type Message = {
  sender: "agent" | "user";
  text: string;
  time: string;
};

const EmailChat = ({
  ticket,
  onClose,
  onStatusUpdated,
}: // onUnreadCount, // <-- NEW
{
  ticket: Ticket;
  onClose: () => void;
  onStatusUpdated?: (status: string) => void;
  // onUnreadCount?: (count: number) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const [loadingClosed, setLoadingClosed] = useState(false);
  const [loadingSolved, setLoadingSolved] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [chatLoading, setChatLoading] = useState(true);

  // 1. Fetch Gmail messages when the component mounts
  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const res = await axios.post("/api/gmail/thread", {
  //           ticket_number: ticket.ticket_number,
  //           email: ticket.email,
  //         });

  //         const gmailMessages = res.data.messages || [];

  //         const parsedMessages: Message[] = gmailMessages.map((msg: any) => ({
  //           sender: msg.from === ticket.email ? "user" : "agent",
  //           text: msg.snippet || msg.body || "",
  //           time: new Date(msg.date).toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           }),
  //         }));

  //         setMessages(parsedMessages);
  //       } catch (error) {
  //         console.error("Failed to fetch Gmail messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //   }, [ticket.ticket_number, ticket.email]);
  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const res = await axios.get("/api/ticket/gmail", {
  //           params: {
  //             ticket_number: ticket.ticket_number,
  //             email: ticket.email,
  //           },
  //         });

  //         const gmailMessages = res.data.messages || [];
  //         const parsedMessages: Message[] = gmailMessages.map((msg: any) => ({
  //           sender: msg.from === ticket.email ? "user" : "agent",
  //           text: msg.snippet,
  //           time: new Date(msg.date).toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           }),
  //         }));

  //         setMessages(parsedMessages);
  //       } catch (error) {
  //         console.error("Failed to fetch Gmail messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //   }, [ticket.ticket_number, ticket.email]);
  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const res = await axios.get("/api/ticket/gmail", {
  //           params: {
  //             ticket_number: ticket.ticket_number,
  //             email: ticket.email,
  //           },
  //         });

  //         const gmailMessages = res.data.messages || [];

  //         const parsedMessages: Message[] = gmailMessages.map((msg: any) => {
  //           const sender =
  //             msg.from === ticket.email.toLowerCase() ? "user" : "agent";
  //           return {
  //             sender,
  //             text: msg.snippet,
  //             time: new Date(msg.date).toLocaleTimeString([], {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //             }),
  //           };
  //         });

  //         setMessages(parsedMessages);
  //       } catch (error) {
  //         console.error("Failed to fetch Gmail messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //   }, [ticket.ticket_number, ticket.email]);
  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const res = await axios.get("/api/ticket/gmail", {
  //           params: {
  //             ticket_number: ticket.ticket_number,
  //             email: ticket.email,
  //           },
  //         });

  //         const gmailMessages = res.data.messages || [];

  //         // Sort messages by date ascending (oldest first)
  //         gmailMessages.sort(
  //           (a: any, b: any) =>
  //             new Date(a.date).getTime() - new Date(b.date).getTime()
  //         );

  //         const parsedMessages: Message[] = gmailMessages.map((msg: any) => {
  //           const sender =
  //             msg.from === ticket.email.toLowerCase() ? "user" : "agent";
  //           return {
  //             sender,
  //             text: msg.snippet,
  //             time: new Date(msg.date).toLocaleTimeString([], {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //             }),
  //           };
  //         });

  //         setMessages(parsedMessages);
  //       } catch (error) {
  //         console.error("Failed to fetch Gmail messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //   }, [ticket.ticket_number, ticket.email]);

  interface GmailMessage {
    from: string;
    date: string; // ISO string
    snippet: string;
  }

  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         setChatLoading(true); // Start loading
  //         const res = await axios.get("/api/ticket/gmail", {
  //           params: {
  //             ticket_number: ticket.ticket_number,
  //             email: ticket.email,
  //           },
  //         });

  //         const gmailMessages = res.data.messages || [];

  //         // Sort messages oldest to newest
  //         gmailMessages.sort(
  //           (a: any, b: any) =>
  //             new Date(a.date).getTime() - new Date(b.date).getTime()
  //         );

  //         const parsedMessages: Message[] = gmailMessages.map((msg: any) => {
  //           const sender =
  //             msg.from === ticket.email.toLowerCase() ? "user" : "agent";
  //           return {
  //             sender,
  //             text: msg.snippet,
  //             time: new Date(msg.date).toLocaleTimeString([], {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //             }),
  //           };
  //         });

  //         setMessages(parsedMessages);
  //       } catch (error) {
  //         console.error("Failed to fetch Gmail messages:", error);
  //       } finally {
  //         setChatLoading(false); // Done loading
  //       }
  //     };

  //     fetchMessages();
  //   }, [ticket.ticket_number, ticket.email]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setChatLoading(true); // Start loading

        const res = await axios.get("/api/ticket/gmail", {
          params: {
            ticket_number: ticket.ticket_number,
            email: ticket.email,
          },
        });

        const gmailMessages: GmailMessage[] = res.data.messages || [];

        // Sort messages oldest to newest
        gmailMessages.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const parsedMessages: Message[] = gmailMessages.map((msg) => {
          const sender =
            msg.from === ticket.email.toLowerCase() ? "user" : "agent";
          return {
            sender,
            text: msg.snippet,
            time: new Date(msg.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setMessages(parsedMessages);
      } catch (error) {
        console.error("Failed to fetch Gmail messages:", error);
      } finally {
        setChatLoading(false); // Done loading
      }
    };

    fetchMessages();
  }, [ticket.ticket_number, ticket.email]);
  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         setChatLoading(true);

  //         const res = await axios.get("/api/ticket/gmail", {
  //           params: {
  //             ticket_number: ticket.ticket_number,
  //             email: ticket.email,
  //           },
  //         });

  //         const gmailMessages: GmailMessage[] = res.data.messages || [];

  //         // Send unread count to parent
  //         const unreadCount = gmailMessages.filter(
  //           (msg) => msg.from === ticket.email.toLowerCase()
  //         ).length;
  //         onUnreadCount?.(unreadCount);

  //         // Sort and parse
  //         gmailMessages.sort(
  //           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  //         );

  //         const parsedMessages: Message[] = gmailMessages.map((msg) => ({
  //           sender: msg.from === ticket.email.toLowerCase() ? "user" : "agent",
  //           text: msg.snippet,
  //           time: new Date(msg.date).toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           }),
  //         }));

  //         setMessages(parsedMessages);
  //       } catch (error) {
  //         console.error("Failed to fetch Gmail messages:", error);
  //       } finally {
  //         setChatLoading(false);
  //       }
  //     };

  //     fetchMessages();
  //   }, [ticket.ticket_number, ticket.email, ticket.email.toLowerCase()]);

  // 🧹 Scroll to bottom on new message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  //   useEffect(() => {
  //     let intervalId: NodeJS.Timeout;
  //     let firstRun = true;

  //     const fetchMessages = async () => {
  //       if (firstRun) setChatLoading(true);

  //       try {
  //         const res = await axios.get("/api/ticket/gmail", {
  //           params: {
  //             ticket_number: ticket.ticket_number,
  //             email: ticket.email,
  //           },
  //         });

  //         const gmailMessages = res.data.messages || [];

  //         gmailMessages.sort(
  //           (a: any, b: any) =>
  //             new Date(a.date).getTime() - new Date(b.date).getTime()
  //         );

  //         const parsedMessages: Message[] = gmailMessages.map((msg: any) => {
  //           const sender =
  //             msg.from === ticket.email.toLowerCase() ? "user" : "agent";
  //           return {
  //             sender,
  //             text: msg.snippet,
  //             time: new Date(msg.date).toLocaleTimeString([], {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //             }),
  //           };
  //         });

  //         setMessages(parsedMessages);
  //       } catch (error) {
  //         console.error("Failed to fetch Gmail messages:", error);
  //       } finally {
  //         if (firstRun) {
  //           setChatLoading(false);
  //           firstRun = false;
  //         }
  //       }
  //     };

  //     fetchMessages(); // Initial fetch
  //     intervalId = setInterval(fetchMessages, 5000); // Polling

  //     return () => clearInterval(intervalId);
  //   }, [ticket.ticket_number, ticket.email]);

  // 2. Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // 3. A unified function to update the ticket status
  // const updateStatus = async (
  //   status: "closed" | "solved",
  //   endpoint: string
  // ) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(endpoint, {
  //       ticket_number: ticket.ticket_number,
  //       status,
  //     });

  //     if (res.status !== 200) throw new Error("Failed to update status");

  //     alert(`Ticket marked as ${status}.`);
  //     onStatusUpdated?.(status);
  //     onClose();
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something went wrong while updating the status.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateStatus = async (
    status: "closed" | "solved",
    endpoint: string
  ) => {
    try {
      setLoading(true);

      const res = await axios.post(endpoint, {
        ticket_number: ticket.ticket_number,
        status,
      });

      if (res.status !== 200) throw new Error("Failed to update status");

      await Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Ticket marked as ${status}.`,
        timer: 2000,
        showConfirmButton: false,
      });

      onStatusUpdated?.(status);
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

  // 4. The function to send a Gmail reply via your backend
  //   const handleSendMessage = async () => {
  //     const trimmed = message.trim();
  //     if (!trimmed) return;

  //     const newMessage: Message = {
  //       sender: "agent",
  //       text: trimmed,
  //       time: new Date().toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //     };

  //     try {
  //       await axios.post("/api/ticket/gmail_send", {
  //         to: ticket.email,
  //         subject: `Re: Ticket #${ticket.ticket_number}`,
  //         body: trimmed,
  //       });

  //       setMessages((prev) => [...prev, newMessage]);
  //       setMessage("");
  //     } catch (error) {
  //       console.error("Failed to send Gmail message:", error);
  //       alert("Message failed to send.");
  //     }
  //   };
  const handleSendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      sender: "agent",
      text: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      setLoadings(true); // <-- Start loading
      await axios.post("/api/ticket/gmail_send", {
        to: ticket.email,
        subject: `Re: Ticket #${ticket.ticket_number}`,
        body: trimmed,
      });

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Failed to send Gmail message:", error);
      alert("Message failed to send.");
    } finally {
      setLoadings(false); // <-- End loading
    }
  };
  // const handleSendMessage = async () => {
  //   const trimmed = message.trim();
  //   if (!trimmed) return;

  //   const newMessage: Message = {
  //     sender: "agent",
  //     text: trimmed,
  //     time: new Date().toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   };

  //   console.log({
  //     to: ticket.email,
  //     subject: `Re: Ticket #${ticket.ticket_number}`,
  //     body: trimmed,
  //     messageId: ticket.latestMessageId, // This should be populated correctly
  //     threadId: ticket.threadId,         // This should be populated correctly
  //     ticket_number: ticket.ticket_number // Ensure ticket_number is available
  //   });

  //   try {
  //     setLoadings(true); // <-- Start loading
  //     await axios.post("/api/ticket/gmail_send", {
  //       to: ticket.email,
  //       subject: `Re: Ticket #${ticket.ticket_number}`,
  //       body: trimmed,
  //       messageId: ticket.latestMessageId, // ID of the latest message in the thread
  //       threadId: ticket.threadId, // The thread ID of the original email
  //       ticket_number: ticket.ticket_number, // Ensure ticket number is passed
  //     });

  //     setMessages((prev) => [...prev, newMessage]);
  //     setMessage("");
  //   } catch (error) {
  //     console.error("Failed to send Gmail message:", error);
  //     alert("Message failed to send.");
  //   } finally {
  //     setLoadings(false); // <-- End loading
  //   }
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg flex flex-col dark:bg-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            Ticket #{ticket.ticket_number}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 hover:cursor-pointer dark:text-white"
          >
            ✖
          </button>
        </div>

        {/* Message List */}
        {/* <div
          ref={chatRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[300px]"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat ${
                msg.sender === "agent" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={
                      msg.sender === "agent"
                        ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                        : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.sender === "agent" ? "Support Agent" : ticket.email}
                <time className="text-xs opacity-50 ml-2">{msg.time}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))}
        </div> */}
        {/* Message List */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[300px]"
        >
          {chatLoading ? (
            <div className="text-center text-gray-500 mt-8 dark:text-white">
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-8 dark:text-white">
              No messages yet.
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat ${
                  msg.sender === "agent" ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    {/* <img
                      alt="Avatar"
                      src={
                        msg.sender === "agent"
                          ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                          : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      }
                    /> */}

                    {/* <div className="bg-gray-500">
                      {msg.sender === "agent" ? (
                        <FaRobot height={50} />
                      ) : (
                        <PiFinnTheHumanThin height={50} />
                      )}
                    </div> */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        msg.sender === "agent" ? "bg-gray-600" : "bg-blue-600"
                      }`}
                    >
                      {msg.sender === "agent" ? (
                        <FaRobot className="w-5 h-5" />
                      ) : (
                        <PiFinnTheHumanThin className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="chat-header">
                  {msg.sender === "agent" ? "Support Agent" : ticket.email}
                  <time className="text-xs opacity-50 ml-2">{msg.time}</time>
                </div> */}
                <div className="chat-header text-gray-700 dark:text-gray-200">
                  {msg.sender === "agent" ? "Support Agent" : ticket.email}
                  <time className="text-xs ml-2 text-gray-500 dark:text-gray-400 opacity-80">
                    {msg.time}
                  </time>
                </div>

                {/* <div className="chat-bubble">{msg.text}</div> */}
                <div
                  //  className="chat-bubble whitespace-pre-line break-words"
                  className={`chat-bubble whitespace-pre-line break-words ${
                    msg.sender === "agent"
                      ? "chat-end bg-gray-300"
                      : "chat-start bg-blue-300"
                  }`}
                >
                  {msg.text}
                </div>

                <div className="chat-footer opacity-50 dark:text-gray-200">
                  Delivered
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        {/* <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="input input-bordered flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button onClick={handleSendMessage} className="btn btn-primary">
            Send
          </button>
        </div> */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="input input-bordered flex-1 dark:focus:text-white dark:bg-gray-500 "
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loadings) handleSendMessage();
            }}
            disabled={loadings} // disable during send
          />
          {/* <button
            onClick={handleSendMessage}
            // className="btn btn-primary"
            className={`btn 
    ${
      loadings
        ? "bg-blue-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
        : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
    }
  `}
            // className="btn btn-primary dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            disabled={loadings}
          >
            {loadings ? "Sending..." : "send"}
          </button> */}
          <button
            onClick={handleSendMessage}
            disabled={loadings}
            className={`px-4 py-2 rounded font-medium transition-colors duration-200
    ${
      loadings
        ? "bg-blue-600 text-white dark:bg-gray-600 dark:hover:bg-gray-700"
        : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
    }
    ${
      loadings
        ? "cursor-not-allowed opacity-80"
        : "hover:shadow hover:cursor-pointer"
    }
  `}
          >
            {loadings ? "Sending..." : "Send"}
          </button>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex justify-end space-x-3">
          <button
            onClick={() =>
              setLoadingSolved(true); // <-- Start loading
               updateStatus("solved", "/api/ticket/solved")}
            className="btn btn-success"
            disabled={loadingSolved}
          >
            {loadingSolved ? "Updating..." : "Mark as Solved"}
          </button>
          <button
            onClick={() => 
              setLoadingClosed(true); // <-- Start loading
              updateStatus("closed", "/api/ticket/closed")}
            className="btn btn-error"
            disabled={loadingClosed}
          >
            {loadingClosed ? "Updating..." : "Close Ticket"}
          </button>
        </div> */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              setLoadingSolved(true); // Start loading
              updateStatus("solved", "/api/ticket/solved");
            }}
            className="btn btn-success"
            disabled={loadingSolved}
          >
            {loadingSolved ? "Updating..." : "Mark as Solved Ticket"}
          </button>

          <button
            onClick={() => {
              setLoadingClosed(true); // Start loading
              updateStatus("closed", "/api/ticket/closed");
            }}
            className="btn btn-error"
            disabled={loadingClosed}
          >
            {loadingClosed ? "Updating..." : "Mark as Close Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailChat;
