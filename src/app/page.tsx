import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Education } from "@/components/sections/Education";
import { LeadershipAwards } from "@/components/sections/LeadershipAwards";
import { Recommendations } from "@/components/sections/Recommendations";
import { GithubLinks } from "@/components/sections/GithubLinks";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <LeadershipAwards />
        <Recommendations />
        <GithubLinks />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
