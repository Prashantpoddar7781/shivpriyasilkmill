
import React from 'react';
import { Supplier, CategoryType } from '../types';
import { Star, MapPin, Store, Tag, Award, CheckCircle2 } from 'lucide-react';

interface SupplierCardProps {
  supplier: Supplier;
}

const getPriceCategoryStyle = (category: string) => {
  if (category.includes('200') && category.includes('500')) return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (category.includes('500') && category.includes('1,000')) return 'bg-blue-50 text-blue-700 border-blue-100';
  if (category.includes('1,000')) return 'bg-purple-50 text-purple-700 border-purple-100';
  return 'bg-slate-50 text-slate-700 border-slate-100';
};

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full relative">
      
      {/* Text Placeholder Header Section */}
      <div className="relative h-40 bg-gradient-to-br from-primary via-slate-800 to-slate-900 flex items-center justify-center p-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white font-serif leading-tight line-clamp-2">
          {supplier.name}
        </h3>
        
        {/* Top Supplier Badge */}
        {supplier.isTopSupplier && (
          <div className="absolute top-3 left-3 z-20 bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center shadow-lg border border-white/20">
            <Award className="w-3 h-3 mr-1 fill-current" />
            Top Rated
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 z-20 bg-white/10 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center border border-white/10">
          <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
          {supplier.rating}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-slate-400" />
              {supplier.location}
            </div>
            <div className="flex items-center text-slate-500 text-sm">
              <Store className="w-4 h-4 mr-2 text-secondary" />
              <span className="font-medium text-slate-700">{supplier.market}</span>
            </div>
          </div>
        </div>

        {/* Tags / Prices */}
        <div className="flex-grow">
            {/* Price Badges - Hidden for Dress Materials */}
            {supplier.category !== CategoryType.DRESS_MATERIAL && (
            <div className="flex flex-wrap gap-2 mb-4">
                {supplier.priceCategories.map((cat) => (
                <span 
                    key={cat}
                    className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border ${getPriceCategoryStyle(cat)}`}
                >
                    {cat}
                </span>
                ))}
            </div>
            )}
            
            {supplier.description && (
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                {supplier.description}
                </p>
            )}
        </div>
        
        {/* Footer */}
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
          <span className="inline-flex items-center bg-slate-50 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium border border-slate-100">
            <Tag className="w-3 h-3 mr-1.5 text-slate-400" />
            {supplier.specialty}
          </span>
          <div className="flex items-center text-xs font-medium text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Verified
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
