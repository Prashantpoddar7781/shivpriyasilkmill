import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Supplier, CategoryType, PriceCategory } from '../types';

interface TrendsChartProps {
  suppliers: Supplier[];
}

const TrendsChart: React.FC<TrendsChartProps> = ({ suppliers }) => {
  
  const chartData = useMemo(() => {
    // Initialize data structure for Price Categories
    const categories: PriceCategory[] = ['₹200 - ₹500', '₹500 - ₹1,000', '₹1,000+'];
    
    return categories.map(priceCat => {
      return {
        name: priceCat,
        Saree: suppliers.filter(s => s.category === CategoryType.SAREE && s.priceCategories.includes(priceCat)).length,
        Suit: suppliers.filter(s => s.category === CategoryType.SUIT && s.priceCategories.includes(priceCat)).length,
        Material: suppliers.filter(s => s.category === CategoryType.DRESS_MATERIAL && s.priceCategories.includes(priceCat)).length,
      };
    });
  }, [suppliers]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-primary font-serif">Supplier Distribution</h3>
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Live Data</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickMargin={5} interval={0} />
            <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar name="Sarees" dataKey="Saree" fill="#ca8a04" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar name="Suits" dataKey="Suit" fill="#1e293b" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar name="Fabrics" dataKey="Material" fill="#991b1b" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-xs text-slate-400 mt-2">Number of Suppliers by Price Range</p>
    </div>
  );
};

export default TrendsChart;