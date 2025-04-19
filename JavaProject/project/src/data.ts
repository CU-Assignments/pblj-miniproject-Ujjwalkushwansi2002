import { Product, Bill } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    price: 82999.99,
    stock: 50,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smartphone',
    price: 49999.99,
    stock: 100,
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Headphones',
    price: 8299.99,
    stock: 200,
    category: 'Accessories'
  }
];

export const initialCustomers = [
  'Saakshi',
  'Shivam',
  'Shreya'
];