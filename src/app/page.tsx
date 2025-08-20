import FAQ from "./_components/ask/Ask";
import Features from "./_components/Features/Features";
import Footer from "./_components/Footer/Footer";
import Main from "./_components/Main/Main";
import Process from "./_components/Process/Process";

export default function Home() {
  return (
    <>
      <Main />
      <Process />
      <Features />
      <FAQ />
      <Footer />
    </>
  );
}
