export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface BillItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Bill {
  id: string;
  items: BillItem[];
  total: number;
  date: string;
  customerName: string;
}