import React, { useState, useEffect } from 'react';
import { Fish, Flame, Coffee, Wine, ChefHat, Search, X, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useRestaurant, OrderItem } from '../context/RestaurantContext';
import RevealOnScroll from './RevealOnScroll';

// Data Structure
const menuCategories = [
  { id: 'sushi', label: 'Sushi & Raw Bar', icon: <Fish className="w-5 h-5" /> },
  { id: 'wok', label: 'Wok & Grill', icon: <Flame className="w-5 h-5" /> },
  { id: 'starters', label: 'Dim Sum & Starters', icon: <ChefHat className="w-5 h-5" /> },
  { id: 'desserts', label: 'Desserts', icon: <Coffee className="w-5 h-5" /> },
  { id: 'drinks', label: 'Wines & Cocktails', icon: <Wine className="w-5 h-5" /> },
];

const menuItems: Record<string, any[]> = {
  sushi: [
    { title: 'Dragon Roll', desc: 'Tempura shrimp, avocado, cucumber, topped with eel and unagi sauce.', price: '€12.50', tags: ['Chef Special'], image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=300&q=80' },
    { title: 'Sashimi Platter', desc: 'Fresh selection of Salmon, Tuna, and Sea Bream sliced to perfection.', price: '€15.00', tags: ['GF'], image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=300&q=80' },
    { title: 'Spicy Tuna Maki', desc: 'Fresh tuna mixed with spicy mayo, cucumber, and sesame seeds.', price: '€9.00', tags: ['Spicy'], image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3?auto=format&fit=crop&w=300&q=80' },
    { title: 'Rainbow Roll', desc: 'California roll topped with assorted fresh fish and avocado.', price: '€11.50', tags: [], image: 'https://images.unsplash.com/photo-1617196034421-2f9a727a53f4?auto=format&fit=crop&w=300&q=80' },
    { title: 'Nigiri Selection', desc: 'Hand-pressed sushi rice topped with premium cuts of fish.', price: '€10.00', tags: [], image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=300&q=80' },
    { title: 'Salmon Tartare', desc: 'Diced fresh salmon with avocado, shallots, and citrus ponzu dressing.', price: '€13.00', tags: ['New'], image: 'https://images.unsplash.com/photo-1559410545-028d48b783cb?auto=format&fit=crop&w=300&q=80' },
  ],
  wok: [
    { title: 'Kung Pao Chicken', desc: 'Stir-fried chicken with peanuts, vegetables, and chili peppers.', price: '€12.00', tags: ['Spicy'], image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=300&q=80' },
    { title: 'Black Pepper Beef', desc: 'Tender beef slices wok-tossed with onions and black pepper sauce.', price: '€14.50', tags: [], image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=300&q=80' },
    { title: 'Pad Thai', desc: 'Rice noodles stir-fried with egg, tofu, bean sprouts, and peanuts.', price: '€11.00', tags: ['Vegetarian Option'], image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=300&q=80' },
    { title: 'Grilled King Prawns', desc: 'Fresh prawns grilled to perfection with garlic butter sauce.', price: '€18.00', tags: ['Premium'], image: 'https://images.unsplash.com/photo-1596701140081-37d452d3a088?auto=format&fit=crop&w=300&q=80' },
    { title: 'Teppanyaki Salmon', desc: 'Salmon fillet grilled on the iron plate with teriyaki glaze.', price: '€16.50', tags: [], image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=300&q=80' },
    { title: 'Cantonese Roast Duck', desc: 'Crispy skin duck served with plum sauce and pancakes.', price: '€17.00', tags: ['Signature'], image: 'https://images.unsplash.com/photo-1582234032486-4d16d7f0a82b?auto=format&fit=crop&w=300&q=80' },
  ],
  starters: [
    { title: 'Ha Kao', desc: 'Steamed crystal shrimp dumplings.', price: '€6.50', tags: [], image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=300&q=80' },
    { title: 'Peking Soup', desc: 'Hot and sour soup with bamboo shoots, tofu, and egg.', price: '€5.50', tags: ['Spicy'], image: 'https://images.unsplash.com/photo-1547592166-23acbe346499?auto=format&fit=crop&w=300&q=80' },
    { title: 'Spring Rolls', desc: 'Crispy rolls filled with vegetables and glass noodles.', price: '€5.00', tags: ['Vegetarian'], image: 'https://images.unsplash.com/photo-1544510808-91bcbee1df55?auto=format&fit=crop&w=300&q=80' },
    { title: 'Gyoza', desc: 'Pan-fried dumplings filled with chicken and vegetables.', price: '€6.00', tags: [], image: 'https://images.unsplash.com/photo-1628830171221-5a045958269d?auto=format&fit=crop&w=300&q=80' },
    { title: 'Edamame', desc: 'Steamed soybeans sprinkled with sea salt.', price: '€4.50', tags: ['Vegan', 'GF'], image: 'https://images.unsplash.com/photo-1623055964894-353272d547d8?auto=format&fit=crop&w=300&q=80' },
    { title: 'Chicken Satay', desc: 'Skewered marinated chicken served with peanut sauce.', price: '€7.00', tags: [], image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=80' },
  ],
  desserts: [
    { title: 'Chocolate Fountain', desc: 'Flowing Belgian chocolate with marshmallows and fresh fruits.', price: '€6.00', tags: ['Kids Favorite'], image: 'https://images.unsplash.com/photo-1606312619070-d48b7065d1b4?auto=format&fit=crop&w=300&q=80' },
    { title: 'Matcha Tiramisu', desc: 'Classic dessert with a Japanese twist using green tea powder.', price: '€7.50', tags: [], image: 'https://images.unsplash.com/photo-1615837136007-701de501eb10?auto=format&fit=crop&w=300&q=80' },
    { title: 'Mango Sticky Rice', desc: 'Sweet sticky rice served with fresh mango and coconut milk.', price: '€7.00', tags: ['Vegan'], image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=300&q=80' },
    { title: 'Coconut Pearls', desc: 'Warm tapioca pearls in sweet coconut soup.', price: '€5.50', tags: [], image: 'https://images.unsplash.com/photo-1564759077036-3def242e69c5?auto=format&fit=crop&w=300&q=80' },
    { title: 'Ice Cream Bar', desc: 'Selection of artisanal ice creams and sorbets.', price: '€4.50', tags: [], image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=300&q=80' },
    { title: 'Lychee Cheesecake', desc: 'Creamy cheesecake topped with sweet lychee jelly.', price: '€7.50', tags: [], image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=300&q=80' },
  ],
  drinks: [
    { title: 'Sake Junmai', desc: 'Pure rice wine with a rich and full-bodied flavor.', price: '€8.00', image: 'https://images.unsplash.com/photo-1582239450379-9c60e0600a94?auto=format&fit=crop&w=300&q=80' },
    { title: 'Asahi Dry', desc: 'Crisp and refreshing Japanese lager.', price: '€5.50', image: 'https://images.unsplash.com/photo-1502819126416-d387f86d47a1?auto=format&fit=crop&w=300&q=80' },
    { title: 'Jasmine Tea', desc: 'Fragrant flowering tea served in a traditional pot.', price: '€4.00', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=300&q=80' },
    { title: 'Lychee Martini', desc: 'Vodka, lychee liqueur, and fresh lychee juice.', price: '€9.00', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80' },
  ]
};

const Menu: React.FC = () => {
  const { addOrder } = useRestaurant();
  const [activeCategory, setActiveCategory] = useState('sushi');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const currentItems = menuItems[activeCategory];
  const filteredItems = currentItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.title === item.title);
      if (existing) {
        return prev.map(i => i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { title: item.title, price: item.price, quantity: 1 }];
    });
    // Visual feedback could go here
  };

  const removeFromCart = (title: string) => {
    setCart(prev => prev.filter(i => i.title !== title));
  };

  const updateQuantity = (title: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.title === title) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handlePlaceOrder = () => {
    addOrder('7', cart); // Hardcoded table 7 for demo
    setOrderPlaced(true);
    setTimeout(() => {
        setCart([]);
        setOrderPlaced(false);
        setIsCartOpen(false);
    }, 2000);
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('€', ''));
    return acc + (price * item.quantity);
  }, 0);

  return (
    <section id="menu" className="py-32 bg-dark-800 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-8">
            <div>
                <h2 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">Culinary Excellence</h2>
                <h3 className="font-serif text-4xl text-white font-medium">Discover Our Menu</h3>
            </div>
            
            <div className="flex items-center gap-4 mt-6 md:mt-0 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <input 
                        type="text" 
                        placeholder="Search dishes..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-dark-900 border border-gray-700 text-sm text-white pl-10 pr-4 py-2 rounded-full focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all"
                    />
                </div>
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 text-gold-500 hover:text-white transition-colors"
                >
                    <ShoppingBag />
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                            {cart.length}
                        </span>
                    )}
                </button>
            </div>
            </div>
        </RevealOnScroll>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {menuCategories.map((cat, idx) => (
            <RevealOnScroll key={cat.id} delay={idx * 50} className="inline-block">
                <button
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                    activeCategory === cat.id 
                    ? 'bg-gold-500 text-dark-900 border-gold-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] transform scale-105' 
                    : 'bg-dark-900 text-gray-400 border-gray-700 hover:border-gold-500 hover:text-gold-500'
                }`}
                >
                {cat.icon}
                {cat.label}
                </button>
            </RevealOnScroll>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          {filteredItems.map((item, idx) => (
            <RevealOnScroll key={`${item.title}-${activeCategory}`} delay={idx * 100}>
                <div className="bg-dark-900 rounded-sm overflow-hidden group hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:border-gold-500/40 border border-gray-800 transition-all duration-500 transform hover:scale-[1.02] cursor-default flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        {item.tags?.map((tag: string, i: number) => (
                             <span key={i} className="px-2 py-1 bg-gold-500 text-dark-900 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-lg">
                                {tag}
                             </span>
                        ))}
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-1 relative border-t border-transparent group-hover:border-gold-500/50 transition-colors duration-500">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-serif text-xl text-white font-medium group-hover:text-gold-500 transition-colors duration-300">{item.title}</h4>
                        <span className="font-bold text-gold-500">{item.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm font-light mb-6 flex-1 leading-relaxed">{item.desc}</p>
                    <button 
                        onClick={() => addToCart(item)}
                        className="w-full py-2 border border-gray-700 text-gray-300 hover:bg-gold-500 hover:border-gold-500 hover:text-dark-900 transition-all duration-300 uppercase text-xs font-bold tracking-widest rounded-sm flex items-center justify-center gap-2 group-hover:bg-white/5"
                    >
                        <Plus size={14} /> Add to Order
                    </button>
                </div>
                </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-dark-900 shadow-2xl transform transition-transform duration-300 z-[60] border-l border-gold-500/30 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <h3 className="font-serif text-2xl text-white">Your Order</h3>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
                        <X />
                    </button>
                </div>

                {orderPlaced ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-500" />
                        </div>
                        <h4 className="text-xl text-white font-bold mb-2">Order Sent!</h4>
                        <p className="text-gray-400 text-sm">The kitchen has received your request.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {cart.length === 0 ? (
                                <p className="text-center text-gray-500 mt-10 italic">Your cart is empty.</p>
                            ) : (
                                cart.map((item, idx) => (
                                    <div key={idx} className="bg-dark-800 p-4 rounded-sm flex justify-between items-center border border-gray-700">
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{item.title}</h4>
                                            <p className="text-gold-500 text-xs">{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 bg-dark-900 rounded px-2 py-1">
                                                <button onClick={() => updateQuantity(item.title, -1)} className="text-gray-400 hover:text-white"><Minus size={12} /></button>
                                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.title, 1)} className="text-gray-400 hover:text-white"><Plus size={12} /></button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.title)} className="text-red-400 hover:text-red-300">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-6 border-t border-gray-800 pt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-400 uppercase tracking-widest text-sm">Total</span>
                                <span className="text-2xl font-serif text-gold-500">€{cartTotal.toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={handlePlaceOrder}
                                disabled={cart.length === 0}
                                className="w-full bg-gold-500 text-dark-900 py-4 font-bold uppercase tracking-widest hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                            >
                                Send to Kitchen
                            </button>
                        </div>
                    </>
                )}
            </div>
      </div>
      
      {/* Overlay for Cart */}
      {isCartOpen && (
        <div 
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50] transition-opacity duration-300"
        ></div>
      )}

    </section>
  );
};

export default Menu;