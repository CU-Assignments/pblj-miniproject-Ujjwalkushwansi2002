import React, { useState } from 'react';
import { ProductList } from './components/ProductList';
import { NewBill } from './components/NewBill';
import { Product, Bill, BillItem } from './types';
import { initialProducts } from './data';

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [bills, setBills] = useState<Bill[]>([]);

  const handleCreateBill = (items: BillItem[], total: number, customerName: string) => {
    // Update stock
    const updatedProducts = products.map(product => {
      const billItem = items.find(item => item.productId === product.id);
      if (billItem) {
        return {
          ...product,
          stock: product.stock - billItem.quantity
        };
      }
      return product;
    });

    // Create new bill
    const newBill: Bill = {
      id: Date.now().toString(),
      items,
      total,
      date: new Date().toISOString(),
      customerName
    };

    setProducts(updatedProducts);
    setBills([newBill, ...bills]);
  };

  const handleEditProduct = (product: Product) => {
    const newPrice = prompt('Enter new price:', product.price.toString());
    const newStock = prompt('Enter new stock:', product.stock.toString());

    if (newPrice && newStock) {
      const updatedProducts = products.map(p => 
        p.id === product.id
          ? { ...p, price: parseFloat(newPrice), stock: parseInt(newStock) }
          : p
      );
      setProducts(updatedProducts);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Inventory Billing System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          
          <NewBill
            products={products}
            onCreateBill={handleCreateBill}
          />
        </div>

        {bills.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Recent Bills</h2>
            <div className="space-y-4">
              {bills.map(bill => (
                <div key={bill.id} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Customer: {bill.customerName}</span>
                    <span className="text-gray-600">
                      {new Date(bill.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-right font-bold">
                    Total: ₹{bill.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;