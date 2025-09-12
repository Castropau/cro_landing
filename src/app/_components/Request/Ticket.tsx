"use client";

import { useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";

export default function Ticket() {
  const [form, setForm] = useState({
    email: "",
    concern: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  //   function handleChange(
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //   }

  //   async function handleSubmit(e: React.FormEvent) {
  //     e.preventDefault();

  //     try {
  //       await axios.post("/api/ticket", form);
  //       setMessage("✅ Ticket submitted successfully!");
  //       setForm({ email: "", concern: "" });
  //     } catch (error: any) {
  //       setMessage("❌ Error: " + (error.response?.data?.error || error.message));
  //     }
  //   }
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();

  //   try {
  //     await axios.post("/api/ticket", form);
  //     setMessage("✅ Ticket submitted successfully!");
  //     setForm({ email: "", concern: "" });
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error)) {
  //       setMessage(
  //         "❌ Error: " + (error.response?.data?.error || error.message)
  //       );
  //     } else if (error instanceof Error) {
  //       setMessage("❌ Error: " + error.message);
  //     } else {
  //       setMessage("❌ An unknown error occurred.");
  //     }
  //   }
  // }
  //  async function handleSubmit(e: React.FormEvent) {
  //     e.preventDefault();

  //     setLoading(true); // Set loading to true when submitting

  //     try {
  //       await axios.post("/api/ticket", form);
  //       setMessage("✅ Ticket submitted successfully!");
  //       setForm({ email: "", concern: "" });
  //     } catch (error: unknown) {
  //       if (axios.isAxiosError(error)) {
  //         setMessage(
  //           "❌ Error: " + (error.response?.data?.error || error.message)
  //         );
  //       } else if (error instanceof Error) {
  //         setMessage("❌ Error: " + error.message);
  //       } else {
  //         setMessage("❌ An unknown error occurred.");
  //       }
  //     } finally {
  //       setLoading(false); // Reset loading to false once request is complete
  //     }
  //   }
  // import { useState } from "react";
  // import axios from "axios";

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();

  //   setLoading(true); // Set loading to true when submitting

  //   try {
  //     await axios.post("/api/ticket", form);

  //     setMessage("✅ Ticket submitted successfully!");

  //     setForm({ email: "", concern: "" });
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error)) {
  //       if (error.response?.status === 429) {
  //         setMessage("❌ You have reached the daily limit of 5 tickets.");
  //       } else {
  //         setMessage("❌ Error: " + (error.response?.data?.error || error.message));
  //       }
  //     } else if (error instanceof Error) {
  //       setMessage("❌ Error: " + error.message);
  //     } else {
  //       setMessage("❌ An unknown error occurred.");
  //     }
  //   } finally {
  //     setLoading(false); // Reset loading to false once the request is complete
  //   }
  // }
  const t = useTranslations("ticket");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    try {
      const res = await axios.post("/api/ticket", form);

      // Extract ticket_number from backend response
      const { ticket_number } = res.data;

      //   setMessage(
      //     `✅ Ticket submitted successfully! Your Ticket Number: ${ticket_number} take a screen shot for reference`
      //   );
      setMessage(
        `✅ ${t("setMessageSubmitted")} ${ticket_number} ${t(
          "setMessageSubmitted1"
        )}`
      );

      setForm({ email: "", concern: "" });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          //   setMessage("❌ You have reached the daily limit of 5 tickets.");
          setMessage(`✅ ${t("setMessageLimit")}`);
        } else {
          setMessage(
            `❌ ${t("setMessageError")} ` +
              (error.response?.data?.error || error.message)

            // "❌ ${t("setMessageError")} " + (error.response?.data?.error || error.message)
          );
        }
      } else if (error instanceof Error) {
        // setMessage("❌ Error: " + error.message);
        setMessage("❌ " + t("setMessageErrorKnown") + " " + error.message);
      } else {
        // setMessage("❌ An unknown error occurred.");
        setMessage("❌ " + t("setMessageErrorUnknown"));
      }
    } finally {
      setLoading(false); // Reset loading to false once the request is complete
    }
  }

  //   const t = useTranslations("ticket");
  return (
    // <div className="dark:bg-gray-500">
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0e0e11] text-black dark:text-white px-4 py-24">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a1f] shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">{t("h1")}</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {/* Email */}
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t("Emailplaceholder")}
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0e0e11] focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="concern" className="block text-sm font-medium mb-1">
              {t("concern")}
            </label>
            <textarea
              id="concern"
              name="concern"
              placeholder={t("Concernplaceholder")}
              value={form.concern}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0e0e11] focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? t("submitting") : t("submit")}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>

    // </div>
  );
}
