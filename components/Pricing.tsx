import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const PriceCard: React.FC<{ title: string; subtitle: string; price: string; items: string[]; isPrimary?: boolean }> = ({ title, subtitle, price, items, isPrimary }) => (
  <div className={`relative p-10 ${isPrimary ? 'bg-dark-800 border border-gold-500/30 md:-translate-y-4' : 'bg-dark-900 border border-white/5'} rounded-sm transition-transform duration-700 hover:-translate-y-2`}>
    {isPrimary && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-dark-900 px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
        Recommended
      </div>
    )}
    <div className="text-center mb-8">
      <h3 className="font-serif text-3xl text-white font-medium mb-2">{title}</h3>
      <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">{subtitle}</p>
    </div>
    <div className="text-center mb-10">
      <span className="text-5xl font-serif font-bold text-gold-500">€{price}</span>
    </div>
    <ul className="space-y-4 mb-8">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center justify-center text-gray-300 text-sm font-light">
          {item}
        </li>
      ))}
    </ul>
    <div className="flex justify-center">
        <div className={`h-px w-12 ${isPrimary ? 'bg-gold-500' : 'bg-gray-700'}`}></div>
    </div>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-black relative scroll-mt-20">
       <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
       
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
            <div className="text-center mb-20">
            <h2 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">Our Offering</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-white font-medium">All You Can Eat</h3>
            </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RevealOnScroll delay={100}>
            <PriceCard 
                title="Lunch" 
                subtitle="Mon - Fri"
                price="16.90"
                items={[
                "Unlimited Wok & Grill",
                "Sushi & Maki Bar",
                "Salad & Appetizers",
                "Classic Hot Dishes",
                "Dessert Buffet"
                ]}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <PriceCard 
                title="Evening" 
                subtitle="Dinner & Weekends"
                price="23.90"
                isPrimary={true}
                items={[
                "Premium Seafood",
                "Unlimited Wok & Grill",
                "Extended Sushi Bar",
                "Chef's Specials",
                "Chocolate Fountain"
                ]}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <PriceCard 
                title="Children" 
                subtitle="Under 10 Years"
                price="10.90"
                items={[
                "Access to Full Buffet",
                "Ice Cream Selection",
                "Under 3 Years: Free",
                "Soft Drinks Included",
                "Surprise Gift"
                ]}
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Pricing;