import React, { useState, useEffect } from 'react';
import { Menu, X, Utensils, Lock } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

const Navbar: React.FC = () => {
  const { setIsAdminOpen } = useRestaurant();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effect for background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section highlighting (ScrollSpy)
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['home', 'concept', 'menu', 'pricing', 'gallery', 'reservation', 'contact'];
      
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is roughly in the top third of the viewport
          return rect.top >= -100 && rect.top <= 300; 
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      } else {
        // Fallback for scrolling down
        const scrollPosition = window.scrollY;
        if (scrollPosition < 100) setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Concept', href: '#concept' },
    { name: 'Menu', href: '#menu' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled || isOpen 
          ? 'bg-dark-900/95 shadow-lg backdrop-blur-md py-2 border-b border-white/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
            <div className={`p-2 rounded-full border transition-all duration-500 ${scrolled ? 'border-gold-500 text-gold-500' : 'border-white/20 text-white group-hover:border-gold-500 group-hover:text-gold-500'}`}>
               <Utensils className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-white tracking-widest leading-none">
                ROYAL
              </span>
              <span className="font-sans text-[10px] text-gold-500 tracking-[0.3em] font-bold uppercase">
                Grand Buffet
              </span>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group py-2 ${
                      isActive ? 'text-gold-500' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </a>
                );
              })}
              
              <div className="h-6 w-px bg-gray-700 mx-4"></div>

              <a 
                href="#reservation"
                className={`px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                   activeSection === 'reservation' 
                   ? 'bg-gold-500 border-gold-500 text-dark-900 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                   : 'bg-transparent border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-dark-900'
                }`}
              >
                Book Table
              </a>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-gray-500 hover:text-gold-500 transition-colors p-2"
                title="Admin Access"
              >
                 <Lock className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <a 
                href="#reservation"
                className="text-xs font-bold uppercase tracking-wider bg-gold-500 text-dark-900 px-3 py-2 rounded-sm"
            >
                Book
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-[calc(4rem+1px)] bg-dark-900/95 backdrop-blur-xl border-b border-gold-500/20 transition-all duration-300 ease-in-out transform origin-top ${
            isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`block px-3 py-3 rounded-md text-base font-bold uppercase tracking-widest transition-colors ${
                  activeSection === link.href.substring(1) ? 'text-gold-500 bg-dark-800' : 'text-gray-300 hover:text-white hover:bg-dark-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-800">
              <button
                onClick={() => { setIsAdminOpen(true); setIsOpen(false); }}
                className="flex items-center gap-2 text-gray-400 hover:text-gold-500 px-3 py-3 w-full text-left text-sm uppercase tracking-wider"
              >
                <Lock className="w-4 h-4" /> Staff Login
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;