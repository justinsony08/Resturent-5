export interface MenuItem {
  title: string;
  description: string;
  image: string;
}

export interface PriceOption {
  label: string;
  price: string;
  details?: string;
  highlight?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}