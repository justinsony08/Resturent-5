import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Loader2, Check } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Reservation: React.FC = () => {
  const { addReservation } = useRestaurant();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate network delay for better UX
    setTimeout(() => {
        addReservation(formData);
        setStatus('success');
        
        // Reset form after delay
        setTimeout(() => {
            setStatus('idle');
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '19:00',
                guests: '2',
            });
        }, 4000);
    }, 1500);
  };

  return (
    <section id="reservation" className="py-32 bg-dark-800 border-t border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden min-h-[600px]">
          
          {/* Info Side */}
          <div className="md:w-1/3 bg-dark-900 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=600&q=80')] bg-cover opacity-10"></div>
             <div className="relative z-10">
                <h3 className="font-serif text-3xl font-medium text-gold-500 mb-8">Opening Hours</h3>
                <div className="space-y-8 font-light text-gray-300">
                <div>
                    <p className="uppercase text-xs tracking-[0.2em] mb-2 opacity-60">Lunch</p>
                    <p className="text-2xl font-serif">12:00 - 14:30</p>
                </div>
                <div>
                    <p className="uppercase text-xs tracking-[0.2em] mb-2 opacity-60">Dinner</p>
                    <p className="text-2xl font-serif">19:00 - 22:30</p>
                </div>
                <div className="pt-8 border-t border-white/10 w-24 mx-auto">
                    <p className="text-sm italic opacity-80">Open 7 days a week</p>
                </div>
                </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-2/3 bg-dark-800 p-12 md:p-16 relative">
            <RevealOnScroll>
                <div className="mb-12">
                <h3 className="font-serif text-4xl text-white font-medium mb-3">Reserve a Table</h3>
                <p className="text-gray-400 font-light">Join us for an unforgettable evening.</p>
                </div>
            </RevealOnScroll>

            {status === 'success' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-800 z-20 animate-fade-in">
                <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center mb-6 animate-pulse-slow">
                    <Check className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="font-serif text-3xl text-white mb-2">Confirmed</h4>
                <p className="text-gray-400">We look forward to welcoming you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="floating-input block w-full bg-transparent border-0 border-b border-gray-600 focus:border-gold-500 focus:ring-0 text-white px-0 py-2 transition-colors placeholder-transparent peer focus:scale-[1.01] origin-left duration-300"
                      placeholder="Name"
                    />
                    <label htmlFor="name" className="absolute left-0 top-0 text-gray-500 pointer-events-none transition-all duration-300 origin-left">
                        Full Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      className="floating-input block w-full bg-transparent border-0 border-b border-gray-600 focus:border-gold-500 focus:ring-0 text-white px-0 py-2 transition-colors placeholder-transparent peer focus:scale-[1.01] origin-left duration-300"
                      placeholder="Phone"
                    />
                    <label htmlFor="phone" className="absolute left-0 top-0 text-gray-500 pointer-events-none transition-all duration-300 origin-left">
                        Phone Number
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="relative group">
                    <input 
                      type="date" 
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange} 
                      className="floating-input block w-full bg-transparent border-0 border-b border-gray-600 focus:border-gold-500 focus:ring-0 text-white px-0 py-2 transition-colors placeholder-transparent peer focus:scale-[1.01] origin-left duration-300"
                      placeholder="Date"
                    />
                    <label htmlFor="date" className="absolute left-0 top-0 text-gray-500 pointer-events-none transition-all duration-300 origin-left">
                        Date
                    </label>
                  </div>
                  <div className="relative group">
                    <select 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="block w-full bg-transparent border-0 border-b border-gray-600 text-white px-0 py-2.5 focus:border-gold-500 focus:ring-0 cursor-pointer hover:text-gold-500 transition-colors"
                    >
                      <option className="bg-dark-800 text-gray-300" value="12:00">12:00 Lunch</option>
                      <option className="bg-dark-800 text-gray-300" value="12:30">12:30 Lunch</option>
                      <option className="bg-dark-800 text-gray-300" value="13:00">13:00 Lunch</option>
                      <option className="bg-dark-800 text-gray-300" value="13:30">13:30 Lunch</option>
                      <option className="bg-dark-800 text-gray-300" value="19:00">19:00 Dinner</option>
                      <option className="bg-dark-800 text-gray-300" value="19:30">19:30 Dinner</option>
                      <option className="bg-dark-800 text-gray-300" value="20:00">20:00 Dinner</option>
                      <option className="bg-dark-800 text-gray-300" value="20:30">20:30 Dinner</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-xs text-gold-500">Time</label>
                  </div>
                  <div className="relative group">
                     <input 
                      type="number" 
                      id="guests"
                      name="guests"
                      min="1"
                      max="20"
                      required
                      value={formData.guests}
                      onChange={handleChange} 
                      className="floating-input block w-full bg-transparent border-0 border-b border-gray-600 focus:border-gold-500 focus:ring-0 text-white px-0 py-2 transition-colors placeholder-transparent peer focus:scale-[1.01] origin-left duration-300"
                      placeholder="Guests"
                    />
                    <label htmlFor="guests" className="absolute left-0 top-0 text-gray-500 pointer-events-none transition-all duration-300 origin-left">
                        Guests
                    </label>
                  </div>
                </div>

                <div className="pt-6">
                    <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-white text-dark-900 font-bold uppercase tracking-[0.2em] py-5 hover:bg-gold-500 transition-colors duration-500 rounded-sm flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                    {status === 'loading' ? (
                        <>Processing <Loader2 className="animate-spin" size={20} /></>
                    ) : (
                        "Confirm Request"
                    )}
                    </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;