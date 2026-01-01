import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Slow Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80")',
            transform: `translateY(${scrollY * 0.4}px) scale(1.1)` 
        }} 
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-dark-900"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-gold-500 font-sans uppercase tracking-[0.4em] text-xs md:text-sm mb-6 font-semibold">
            Welcome to Mondelange
            </h2>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-8 tracking-tight drop-shadow-2xl leading-tight">
            Royal Grand <br className="md:hidden" /> Buffet
            </h1>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="w-24 h-0.5 bg-gold-500 mb-8 mx-auto opacity-80"></div>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
            An exquisite culinary journey. Fresh ingredients, live cooking, and an atmosphere of pure elegance.
            </p>
        </div>

        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ animationDelay: '0.8s' }}>
          <a 
            href="#menu"
            className="group relative px-8 py-3 overflow-hidden rounded-sm transition-all duration-300"
          >
            <div className="absolute inset-0 w-full h-full border border-white/30 group-hover:border-white transition-all duration-500"></div>
            <span className="relative text-white text-sm uppercase tracking-[0.2em] font-bold">Discover Menu</span>
          </a>
          
          <a 
            href="#reservation"
            className="bg-gold-500 text-dark-900 px-10 py-3.5 rounded-sm uppercase tracking-[0.2em] text-sm font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulse-slow hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-500"
          >
            Book Table
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce duration-[3000ms] opacity-50 hover:opacity-100 transition-opacity">
        <a href="#concept" className="text-white">
          <ChevronDown className="h-8 w-8" strokeWidth={1} />
        </a>
      </div>
    </div>
  );
};

export default Hero;