import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Engagement from './components/Engagement';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import About from './components/About';
import TechExpertise from './components/TechExpertise';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Engagement />
        <Portfolio />
        <WhyUs />
        <Process />
        <About />
        <TechExpertise />
      </main>
      <Footer />
    </>
  );
}
