import React, { useState } from 'react';
import { Receipt, Plus, X } from 'lucide-react';
import { Product, BillItem } from '../types';
import { initialCustomers } from '../data';

interface NewBillProps {
  products: Product[];
  onCreateBill: (items: BillItem[], total: number, customerName: string) => void;
}

export function NewBill({ products, onCreateBill }: NewBillProps) {
  const [items, setItems] = useState<BillItem[]>([]);
  const [customerName, setCustomerName] = useState('');

  const addItem = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product || quantity <= 0 || quantity > product.stock) return;

    const total = product.price * quantity;
    setItems([...items, { productId, quantity, price: product.price, total }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !customerName) return;
    onCreateBill(items, calculateTotal(), customerName);
    setItems([]);
    setCustomerName('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Receipt className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-semibold">New Bill</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Customer Name
          </label>
          <select
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Customer</option>
            {initialCustomers.map((customer, index) => (
              <option key={index} value={customer}>
                {customer}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <div className="flex gap-4">
            <select
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
              defaultValue=""
              onChange={(e) => {
                const quantity = prompt('Enter quantity:');
                if (quantity) {
                  addItem(e.target.value, parseInt(quantity));
                }
                e.target.value = '';
              }}
            >
              <option value="" disabled>Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (₹{product.price}) - Stock: {product.stock}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <tr key={index}>
                    <td className="px-6 py-4">{product?.name}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">₹{item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">₹{item.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ₹{calculateTotal().toFixed(2)}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            disabled={items.length === 0 || !customerName}
          >
            Generate Bill
          </button>
        </div>
      </form>
    </div>
  );
}