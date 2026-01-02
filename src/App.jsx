import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import VelocityTicker from './components/Features/VelocityTicker';
import BentoGrid from './components/Features/BentoGrid';
import Solutions from './components/Solutions/Solutions';
import Integration from './components/Integration/Integration';
import Experience from './components/Experience/Experience';
import Footer from './components/Footer/Footer';
import Loader from './components/UI/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load or wait for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen text-white scrollbar-hide">
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      <Navbar />

      <main>
        <Hero />

        {/* Velocity Ticker Section */}
        <div id="velocity">
          <VelocityTicker />
        </div>

        {/* Features / Network Section */}
        <div id="network">
          <BentoGrid />
        </div>

        {/* Solutions Section */}
        <div id="solutions">
          <Solutions />
        </div>

        {/* Integration API Section */}
        <div id="api">
          <Integration />
        </div>

        {/* Team Experience Section */}
        <Experience />

      </main>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default App;
