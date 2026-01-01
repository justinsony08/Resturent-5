import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Lock, ExternalLink } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

const Contact: React.FC = () => {
  const { setIsAdminOpen } = useRestaurant();
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=123+Rue+de+Luxe+57300+Mondelange+France";

  return (
    <footer id="contact" className="bg-dark-900 border-t border-gray-800 pt-16 pb-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Logo & About */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white tracking-wider">
              ROYAL <span className="text-gold-500">GRAND</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mondelange's premier destination for Asian cuisine. We blend traditional flavors with modern elegance to create an unforgettable dining experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">123 Rue de Luxe, <br/>57300 Mondelange, France</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-gold-500 flex-shrink-0" />
                <span className="text-sm">+33 3 87 12 34 56</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="h-5 w-5 text-gold-500 flex-shrink-0" />
                <span className="text-sm">contact@royalgrand.fr</span>
              </li>
            </ul>
          </div>

          {/* Map Link */}
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-48 bg-dark-800 rounded-sm relative overflow-hidden group border border-gray-800 hover:border-gold-500 transition-all duration-300"
          >
            {/* Background Image - Styled to look like a dark map */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500 transform group-hover:scale-105"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80")' }} 
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="bg-gold-500/20 p-3 rounded-full mb-2 group-hover:bg-gold-500/40 transition-colors backdrop-blur-sm">
                 <MapPin className="text-gold-500 h-8 w-8 drop-shadow-lg" />
              </div>
              <span className="text-white font-bold text-sm mb-1">Find Us on Google Maps</span>
              <div className="flex items-center gap-1 text-xs text-gold-500 uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Get Directions <ExternalLink size={12} />
              </div>
            </div>
          </a>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Royal Grand Buffet. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
             <span>Designed elegantly with React & Tailwind</span>
             <button 
                onClick={() => setIsAdminOpen(true)}
                className="opacity-50 hover:opacity-100 text-gold-500 transition-opacity flex items-center gap-1 p-2"
                title="Staff Login (or press Ctrl+Shift+L)"
             >
                <Lock size={12} />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;