import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Menu from './components/Menu';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import ChatAssistant from './components/ChatAssistant';
import SeasonalEffects from './components/SeasonalEffects';
import AdminPanel from './components/AdminPanel';
import { RestaurantProvider } from './context/RestaurantContext';

function App() {
  return (
    <RestaurantProvider>
        <div className="min-h-screen bg-dark-900 text-gray-100 font-sans selection:bg-gold-500 selection:text-black">
          <SeasonalEffects />
          <AdminPanel />
          <Navbar />
          <main>
            <Hero />
            <Features />
            <Menu />
            <Pricing />
            <Gallery />
            <Reservation />
          </main>
          <Contact />
          <ChatAssistant />
        </div>
    </RestaurantProvider>
  );
}

export default App;