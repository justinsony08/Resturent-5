import React, { useState, useEffect } from 'react';
import { X, Lock, Calendar, Utensils, Settings, CheckCircle, AlertCircle, PartyPopper } from 'lucide-react';
import { useRestaurant, SeasonMode } from '../context/RestaurantContext';

const AdminPanel: React.FC = () => {
  const { 
    isAdminOpen, setIsAdminOpen, 
    reservations, updateReservationStatus,
    orders, updateOrderStatus,
    seasonalMode, setSeasonalMode
  } = useRestaurant();

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'orders' | 'settings'>('orders');

  // Keyboard Shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        setIsAdminOpen(!isAdminOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen, setIsAdminOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple hardcoded password for demonstration
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password. Hint: admin123');
    }
  };

  // Reset state when modal closes/opens
  useEffect(() => {
    if (isAdminOpen) {
      setPassword('');
      setError('');
    }
  }, [isAdminOpen]);

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-dark-900/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-dark-800 border border-gold-500/30 w-full max-w-5xl h-[80vh] rounded-lg shadow-2xl flex flex-col overflow-hidden relative animate-fade-in-up">
        <button 
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="bg-dark-900 p-4 rounded-full mb-6 border border-gold-500 shadow-lg shadow-gold-500/20">
                <Lock className="w-8 h-8 text-gold-500" />
            </div>
            <h2 className="text-2xl font-serif text-white mb-2">Staff Access Only</h2>
            <p className="text-gray-500 mb-8 text-sm">Please enter your passcode to continue.</p>
            
            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4 relative">
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Enter Passcode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-dark-900 border ${error ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-3 rounded focus:border-gold-500 focus:outline-none transition-colors`}
                  autoFocus
                />
                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs animate-fade-in">
                    <AlertCircle size={12} />
                    <span>{error}</span>
                  </div>
                )}
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gold-500 text-dark-900 font-bold uppercase tracking-wider py-3 rounded hover:bg-gold-400 transition-colors shadow-lg active:scale-[0.98]"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="flex h-full flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-dark-900 border-r border-gray-800 p-6 flex flex-col">
               <h3 className="text-gold-500 font-serif text-xl font-bold mb-8 tracking-wide hidden md:block">ADMIN PANEL</h3>
               <div className="md:hidden mb-4 font-serif text-gold-500 font-bold">ADMIN PANEL</div>
               
               <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible">
                 <button 
                    onClick={() => setActiveTab('bookings')}
                    className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded transition-all ${activeTab === 'bookings' ? 'bg-gold-500 text-dark-900 font-bold' : 'text-gray-400 hover:bg-dark-800'}`}
                 >
                    <Calendar className="w-5 h-5" /> 
                    <span className="hidden sm:inline">Bookings</span>
                 </button>
                 <button 
                    onClick={() => setActiveTab('orders')}
                    className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded transition-all ${activeTab === 'orders' ? 'bg-gold-500 text-dark-900 font-bold' : 'text-gray-400 hover:bg-dark-800'}`}
                 >
                    <Utensils className="w-5 h-5" /> 
                    <span className="hidden sm:inline">Live Orders</span>
                    {orders.filter(o => o.status === 'new').length > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto animate-pulse">
                            {orders.filter(o => o.status === 'new').length}
                        </span>
                    )}
                 </button>
                 <button 
                    onClick={() => setActiveTab('settings')}
                    className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded transition-all ${activeTab === 'settings' ? 'bg-gold-500 text-dark-900 font-bold' : 'text-gray-400 hover:bg-dark-800'}`}
                 >
                    <Settings className="w-5 h-5" /> 
                    <span className="hidden sm:inline">Effects</span>
                 </button>
               </nav>
               <div className="mt-auto pt-6 border-t border-gray-800 hidden md:block">
                  <p className="text-xs text-gray-500">Logged in as Administrator</p>
                  <button onClick={() => setIsAuthenticated(false)} className="text-xs text-red-400 hover:text-red-300 mt-2">Log Out</button>
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-dark-800 p-4 md:p-8 overflow-y-auto">
                
                {/* BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white font-serif mb-6">Table Reservations</h2>
                        {reservations.length === 0 ? (
                            <div className="text-center py-12 bg-dark-900/50 rounded-lg border border-gray-800">
                                <Calendar className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                                <p className="text-gray-500 italic">No reservations found.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {reservations.map((res) => (
                                    <div key={res.id} className="bg-dark-900 border border-gray-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="text-white font-bold text-lg">{res.name}</h4>
                                                <span className={`text-xs px-2 py-0.5 rounded uppercase font-bold tracking-wider ${res.status === 'confirmed' ? 'bg-green-900/50 text-green-400 border border-green-800' : res.status === 'cancelled' ? 'bg-red-900/50 text-red-400 border border-red-800' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-800'}`}>
                                                    {res.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400 flex flex-wrap gap-x-4 gap-y-1">
                                                <span>📅 {res.date} at {res.time}</span>
                                                <span>👤 {res.guests} Guests</span>
                                                <span>📞 {res.phone}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            {res.status === 'pending' && (
                                                <>
                                                    <button onClick={() => updateReservationStatus(res.id, 'confirmed')} className="flex-1 sm:flex-none bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                                                      <CheckCircle size={16} /> Confirm
                                                    </button>
                                                    <button onClick={() => updateReservationStatus(res.id, 'cancelled')} className="flex-1 sm:flex-none bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                                                      <X size={16} /> Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ORDERS TAB */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white font-serif mb-6">Kitchen Live Orders</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                             {orders.length === 0 ? (
                                <div className="col-span-1 md:col-span-2 text-center py-12 bg-dark-900/50 rounded-lg border border-gray-800">
                                    <Utensils className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                                    <p className="text-gray-500 italic">No active orders.</p>
                                </div>
                             ) : (
                                orders.map((order) => (
                                    <div key={order.id} className={`border rounded-lg p-5 transition-all ${order.status === 'new' ? 'bg-dark-900 border-gold-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'bg-dark-900 border-gray-700 opacity-75'}`}>
                                        <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Table #{order.tableNumber}</h3>
                                                <span className="text-xs text-gray-500">{new Date(order.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${order.status === 'new' ? 'bg-red-600 text-white animate-pulse' : 'bg-green-600 text-white'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <ul className="space-y-2 mb-4">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="flex justify-between text-sm text-gray-300">
                                                    <span><span className="text-gold-500 font-bold">{item.quantity}x</span> {item.title}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold text-gold-500">Total: €{order.total.toFixed(2)}</span>
                                            <div className="space-x-2">
                                                {order.status === 'new' && (
                                                    <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="px-3 py-1 bg-blue-600 text-white text-xs rounded uppercase hover:bg-blue-500 font-bold">Start Prep</button>
                                                )}
                                                {order.status === 'preparing' && (
                                                    <button onClick={() => updateOrderStatus(order.id, 'served')} className="px-3 py-1 bg-green-600 text-white text-xs rounded uppercase hover:bg-green-500 font-bold">Serve</button>
                                                )}
                                                {order.status === 'served' && (
                                                    <button onClick={() => updateOrderStatus(order.id, 'paid')} className="px-3 py-1 bg-gray-600 text-white text-xs rounded uppercase hover:bg-gray-500 font-bold">Mark Paid</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                             )}
                        </div>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white font-serif mb-6">Seasonal Atmosphere Control</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(['none', 'christmas', 'newyear', 'valentine', 'summer', 'eid', 'diwali', 'france', 'easter'] as SeasonMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setSeasonalMode(mode)}
                                    className={`relative p-4 rounded-lg border text-left transition-all duration-300 group ${
                                        seasonalMode === mode 
                                        ? 'bg-gold-500/10 border-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                                        : 'bg-dark-900 border-gray-700 hover:border-gray-500 hover:bg-dark-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`capitalize font-bold text-lg ${seasonalMode === mode ? 'text-gold-500' : 'text-white'}`}>
                                            {mode === 'none' ? 'Default' : mode}
                                        </span>
                                        {seasonalMode === mode && <CheckCircle className="text-gold-500 w-5 h-5" />}
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300">
                                        {mode === 'none' && 'Standard elegant layout.'}
                                        {mode === 'christmas' && 'Winter mist & falling snow.'}
                                        {mode === 'newyear' && 'Golden bubbles & confetti.'}
                                        {mode === 'valentine' && 'Floating hearts & soft pink atmosphere.'}
                                        {mode === 'summer' && 'Warm sweeping sunlight effect.'}
                                        {mode === 'eid' && 'Green/Gold glow & floating crescents.'}
                                        {mode === 'diwali' && 'Warm pulsing orange glow & sparklers.'}
                                        {mode === 'france' && 'Patriotic blue-white-red ambient gradient.'}
                                        {mode === 'easter' && 'Pastel atmosphere & floating eggs.'}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;