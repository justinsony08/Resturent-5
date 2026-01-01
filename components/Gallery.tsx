import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const Gallery: React.FC = () => {
  const galleryItems = [
    { 
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", 
      alt: "Restaurant Interior",
      className: "md:col-span-2 md:row-span-2 h-full" 
    },
    { 
      src: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=600&q=80", 
      alt: "Chef Plating",
      className: "md:col-span-1 md:row-span-1 h-full" 
    },
    { 
      src: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80", 
      alt: "Sushi Platter",
      className: "md:col-span-1 md:row-span-2 h-full" 
    },
    { 
      src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80", 
      alt: "Cocktail",
      className: "md:col-span-1 md:row-span-1 h-full" 
    },
    { 
      src: "https://images.unsplash.com/photo-1544025162-d76690b67f14?auto=format&fit=crop&w=800&q=80", 
      alt: "Buffet Spread",
      className: "md:col-span-2 md:row-span-1 h-full" 
    },
    { 
      src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80", 
      alt: "Dessert",
      className: "md:col-span-1 md:row-span-1 h-full" 
    },
    { 
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80", 
        alt: "Private Dining",
        className: "md:col-span-1 md:row-span-1 h-full" 
    },
  ];

  return (
    <section id="gallery" className="py-32 bg-dark-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-8">
            <div>
                <h2 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">Atmosphere</h2>
                <h3 className="font-serif text-4xl text-white font-medium">Visual Journey</h3>
            </div>
            <p className="text-gray-400 mt-6 md:mt-0 max-w-md text-right hidden md:block font-light">
                Immerse yourself in our warm ambiance and meticulously prepared dishes.
            </p>
            </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden rounded-sm group ${item.className}`}
            >
              <RevealOnScroll delay={idx * 100} className="w-full h-full">
                <div className="w-full h-full relative">
                    <img 
                        src={item.src} 
                        alt={item.alt} 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-1000"></div>
                    <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <span className="text-white font-serif italic text-lg">{item.alt}</span>
                    </div>
                </div>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;