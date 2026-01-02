import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import VelocityTicker from './components/Features/VelocityTicker';
import BentoGrid from './components/Features/BentoGrid';
import Solutions from './components/Solutions/Solutions';
import Integration from './components/Integration/Integration';
import Experience from './components/Experience/Experience';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="bg-background min-h-screen text-white scrollbar-hide">
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
