import FAQ from "./_components/ask/Ask";
import Features from "./_components/Features/Features";
import Footer from "./_components/Footer/Footer";
import Main from "./_components/Main/Main";
import Process from "./_components/Process/Process";
import Ticket from "./_components/Request/Ticket";
// import Navbar from "./admin/support/_components/Navbar/Navbar";
// import Navbar from "./_components/Navbar/Navbar";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <Main />
      <Process />
      <Features />
      <FAQ />
      <Ticket />
      <Footer />
    </>
  );
}
