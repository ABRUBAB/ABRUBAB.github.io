import Nav from "@/components/nav/Nav";
import CommandPalette from "@/components/nav/CommandPalette";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Work from "@/components/sections/Work";
import Research from "@/components/sections/Research";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <CommandPalette />
      <main id="main">
        <Hero />
        <Ticker />
        <Work />
        <Research />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
