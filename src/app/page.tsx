import Nav from "@/components/nav/Nav";
import CommandPalette from "@/components/nav/CommandPalette";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Activities from "@/components/sections/Activities";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <Nav />
      <CommandPalette />
      <main id="main">
        <Hero />
        <Ticker />
        <Projects />
        <Publications />
        <Experience />
        <Achievements />
        <Education />
        <Skills />
        <Activities />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
