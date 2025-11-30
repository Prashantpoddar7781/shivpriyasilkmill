import React from 'react';
import { Supplier, CategoryType } from '../types';
import { Star, MapPin, Award, Tag, IndianRupee, Store } from 'lucide-react';

interface SupplierCardProps {
  supplier: Supplier;
}

const getPriceCategoryColor = (category: string) => {
  if (category.includes('200') && category.includes('500')) return 'bg-green-100 text-green-700 border-green-200'; // 200-500
  if (category.includes('500') && category.includes('1,000')) return 'bg-blue-100 text-blue-700 border-blue-200'; // 500-1000
  if (category.includes('1,000')) return 'bg-purple-100 text-purple-700 border-purple-200'; // 1000+
  return 'bg-slate-100 text-slate-700 border-slate-200';
};

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={supplier.imageUrl} 
          alt={supplier.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {supplier.isTopSupplier && (
          <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm z-10">
            <Award className="w-3 h-3 mr-1" />
            Top Choice
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-primary font-serif leading-tight">{supplier.name}</h3>
          <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100 flex-shrink-0 ml-2">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold text-yellow-700 ml-1">{supplier.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 text-sm mb-3">
            <div className="flex items-center text-slate-500">
                <MapPin className="w-3 h-3 mr-1.5 text-slate-400" />
                {supplier.location}
            </div>
            <div className="flex items-center text-slate-500">
                <Store className="w-3 h-3 mr-1.5 text-secondary" />
                <span className="font-medium text-slate-600">{supplier.market}</span>
            </div>
        </div>
        
        {/* Price Badges - Hidden for Dress Materials */}
        {supplier.category !== CategoryType.DRESS_MATERIAL && (
          <div className="flex flex-wrap gap-1 mb-3">
            {supplier.priceCategories.map((cat) => (
              <span 
                key={cat}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriceCategoryColor(cat)}`}
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">
          {supplier.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100">
          <span className="inline-flex items-center bg-slate-50 text-slate-600 text-xs px-2 py-1 rounded font-medium border border-slate-200">
            <Tag className="w-3 h-3 mr-1 opacity-50" />
            {supplier.specialty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;