import React from 'react';
import { Flame, Fish, UtensilsCrossed } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; img: string }> = ({ title, desc, icon, img }) => (
  <div className="group relative overflow-hidden rounded-md h-96 cursor-pointer shadow-xl border border-white/5">
    {/* Background Image with slow zoom */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-110"
      style={{ backgroundImage: `url(${img})` }}
    />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-95" />
    
    <div className="absolute inset-0 flex flex-col justify-end p-8 text-center items-center z-10">
      {/* Icon */}
      <div className="mb-6 text-gold-500 transform transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-110 group-hover:text-gold-400">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-serif font-bold text-white mb-3 tracking-wide transform transition-all duration-700 ease-out group-hover:-translate-y-2">
        {title}
      </h3>
      
      {/* Description */}
      <div className="overflow-hidden">
        <p className="text-gray-300 text-sm opacity-80 transform translate-y-4 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 leading-relaxed max-w-xs mx-auto">
            {desc}
        </p>
      </div>
      
      {/* Decorative Line */}
      <div className="w-12 h-px bg-gold-500/50 mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100"></div>
    </div>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="concept" className="py-32 bg-dark-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
            <div className="text-center mb-20">
            <h2 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">Our Specialties</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-white font-medium tracking-tight">A World of Flavors</h3>
            <div className="w-16 h-px bg-gold-500 mx-auto mt-8 opacity-60"></div>
            </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RevealOnScroll delay={100}>
            <FeatureCard 
                title="Japanese Sushi" 
                desc="Hand-crafted nigiri and sashimi prepared daily by our expert chefs using premium catch."
                icon={<Fish className="h-8 w-8" strokeWidth={1.5} />}
                img="https://picsum.photos/600/800?random=1"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <FeatureCard 
                title="Wok & Grill" 
                desc="Choose your ingredients and let our chefs cook them to perfection before your eyes."
                icon={<Flame className="h-8 w-8" strokeWidth={1.5} />}
                img="https://picsum.photos/600/800?random=2"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <FeatureCard 
                title="Grand Buffet" 
                desc="A vast yet curated selection of starters, mains, and desserts to satisfy every palate."
                icon={<UtensilsCrossed className="h-8 w-8" strokeWidth={1.5} />}
                img="https://picsum.photos/600/800?random=3"
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Features;