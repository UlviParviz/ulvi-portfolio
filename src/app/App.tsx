import Navbar from "../shared/layout/Navbar";
import SEO from "../shared/seo/SEO";
import Hero from "../features/hero/Hero";
import Skills from "../features/skills/Skills";
import GitHubProjects from "../features/github/GitHubProjects";
import Timeline from "../features/timeline/Timeline";
import Blog from "../features/blog/Blog";
import Contact from "../features/contact/Contact";
import Education from "../features/education/Education";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <SEO
        title="Ulvi Ismayilov"
        description="React, TypeScript, Three.js və modern frontend portfolio."
      />


      <Navbar />

      <main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        <Hero />
        <Education />
        <Skills />
        <Timeline />
        <GitHubProjects />
        <Blog />
        <Contact />
      </main>
    </>
  );
}