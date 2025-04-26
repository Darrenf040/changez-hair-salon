export interface Service {
  name: string;
  duration: number;
  price: number | null;
  requires_consultation: boolean;
  category: 'Main' | 'Add-on';
} 