import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  timestamp: number;
}

export interface OrderItem {
  title: string;
  price: string; // stored as string with €, e.g., "€8.00"
  quantity: number;
}

export interface TableOrder {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  status: 'new' | 'preparing' | 'served' | 'paid';
  total: number;
  timestamp: number;
}

export type SeasonMode = 'none' | 'christmas' | 'newyear' | 'eid' | 'valentine' | 'summer' | 'diwali' | 'france' | 'easter';

interface RestaurantContextType {
  // Seasonal Theme
  seasonalMode: SeasonMode;
  setSeasonalMode: (mode: SeasonMode) => void;

  // Reservations
  reservations: ReservationData[];
  addReservation: (data: Omit<ReservationData, 'id' | 'status' | 'timestamp'>) => void;
  updateReservationStatus: (id: string, status: ReservationData['status']) => void;

  // Orders
  orders: TableOrder[];
  addOrder: (tableNumber: string, items: OrderItem[]) => void;
  updateOrderStatus: (id: string, status: TableOrder['status']) => void;

  // Admin Auth State (Simple)
  isAdminOpen: boolean;
  setIsAdminOpen: (v: boolean) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Helper for persistent state
  const usePersistentState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
      if (typeof window === 'undefined') return initialValue;
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return initialValue;
      }
    });

    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error(`Error writing ${key} to localStorage`, error);
      }
    }, [key, state]);

    return [state, setState];
  };

  const [seasonalMode, setSeasonalMode] = usePersistentState<SeasonMode>('rgb_seasonalMode', 'none');
  const [reservations, setReservations] = usePersistentState<ReservationData[]>('rgb_reservations', []);
  const [orders, setOrders] = usePersistentState<TableOrder[]>('rgb_orders', []);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Helper to parse price string "€8.00" to number 8.00
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace('€', '')) || 0;
  };

  const addReservation = (data: Omit<ReservationData, 'id' | 'status' | 'timestamp'>) => {
    const newRes: ReservationData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      timestamp: Date.now(),
    };
    setReservations(prev => [newRes, ...prev]);
  };

  const updateReservationStatus = (id: string, status: ReservationData['status']) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const addOrder = (tableNumber: string, items: OrderItem[]) => {
    const total = items.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);
    const newOrder: TableOrder = {
      id: Math.random().toString(36).substr(2, 9),
      tableNumber,
      items,
      status: 'new',
      total,
      timestamp: Date.now(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: TableOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <RestaurantContext.Provider value={{
      seasonalMode, setSeasonalMode,
      reservations, addReservation, updateReservationStatus,
      orders, addOrder, updateOrderStatus,
      isAdminOpen, setIsAdminOpen
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};