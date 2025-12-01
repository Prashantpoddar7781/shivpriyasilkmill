
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import SupplierCard from './components/SupplierCard';
import GeminiAssistant from './components/GeminiAssistant';
import { AppView, CategoryType, PriceCategory, Supplier } from './types';
import { SUPPLIERS, AGENT_NAME, AGENT_CONTACT, AGENT_EMAIL } from './constants';
import { ArrowRight, CheckCircle2, Mail, Phone, Filter, Store, Search, Tag, Users, PackageCheck, Truck } from 'lucide-react';

// Simple WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [priceFilter, setPriceFilter] = useState<PriceCategory | 'All'>('All');
  const [marketFilter, setMarketFilter] = useState<string>('All');
  const [itemFilter, setItemFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const suppliers = SUPPLIERS;

  useEffect(() => {
    setPriceFilter('All');
    setMarketFilter('All');
    setItemFilter('All');
    setSearchQuery('');
    window.scrollTo(0, 0);
  }, [currentView]);

  const currentCategorySuppliers = useMemo(() => {
    let category: CategoryType | null = null;
    switch (currentView) {
      case AppView.SAREES: category = CategoryType.SAREE; break;
      case AppView.SUITS: category = CategoryType.SUIT; break;
      case AppView.MATERIALS: category = CategoryType.DRESS_MATERIAL; break;
      default: return [];
    }
    return suppliers.filter(s => s.category === category);
  }, [currentView, suppliers]);

  const availableMarkets = useMemo(() => {
    const markets = new Set(currentCategorySuppliers.map(s => s.market));
    return ['All', ...Array.from(markets).sort()];
  }, [currentCategorySuppliers]);

  const availableItems = useMemo(() => {
    const items = new Set(currentCategorySuppliers.map(s => s.specialty));
    return ['All', ...Array.from(items).sort()];
  }, [currentCategorySuppliers]);

  const filteredSuppliers = useMemo(() => {
    return currentCategorySuppliers.filter(s => {
      const matchesPrice = priceFilter === 'All' || s.priceCategories.includes(priceFilter);
      const matchesMarket = marketFilter === 'All' || s.market === marketFilter;
      const matchesItem = itemFilter === 'All' || s.specialty === itemFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q) || s.specialty.toLowerCase().includes(q);
      return matchesPrice && matchesMarket && matchesItem && matchesSearch;
    });
  }, [currentCategorySuppliers, priceFilter, marketFilter, itemFilter, searchQuery]);

  const topSuppliers = filteredSuppliers.filter(s => s.isTopSupplier);
  const allCategorySuppliers = filteredSuppliers; 

  const renderContent = () => {
    if (currentView === AppView.CONTACT) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
            
            <h2 className="text-4xl font-bold text-primary font-serif mb-6">Contact {AGENT_NAME}</h2>
            <p className="text-slate-600 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Experience seamless textile procurement. From selecting the perfect fabric to final delivery, we handle every detail with precision.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Phone Call Card */}
              <a 
                href={`tel:+91${AGENT_CONTACT}`}
                className="group bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-secondary/20 hover:bg-white hover:shadow-xl transition-all duration-300 block"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6 text-secondary group-hover:text-white" />
                </div>
                <h3 className="font-bold text-primary mb-2 text-lg">Direct Line</h3>
                <p className="text-xl font-bold text-slate-700">{AGENT_CONTACT}</p>
                <p className="text-xs text-slate-400 mt-2">Tap to Call</p>
              </a>

               {/* WhatsApp Card */}
               <a 
                href={`https://wa.me/91${AGENT_CONTACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-emerald-500/20 hover:bg-white hover:shadow-xl transition-all duration-300 block"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <WhatsAppIcon className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                </div>
                <h3 className="font-bold text-primary mb-2 text-lg">WhatsApp</h3>
                <p className="text-xl font-bold text-slate-700">Chat Now</p>
                <p className="text-xs text-slate-400 mt-2">Instant Response</p>
              </a>

              {/* Email Card */}
              <a 
                href={`mailto:${AGENT_EMAIL}`}
                className="group bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-secondary/20 hover:bg-white hover:shadow-xl transition-all duration-300 block"
              >
                 <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6 text-secondary group-hover:text-white" />
                </div>
                <h3 className="font-bold text-primary mb-2 text-lg">Email Inquiry</h3>
                <p className="text-lg font-bold text-slate-700 break-all">{AGENT_EMAIL}</p>
                <p className="text-xs text-slate-400 mt-2">Tap to Email</p>
              </a>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 inline-block">
               <p className="text-primary font-medium text-sm">
                 📍 Based in <span className="font-bold">Surat, Gujarat</span> - The Textile Hub of India
               </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentView === AppView.HOME) {
      return (
        <div className="space-y-20 pb-20">
          {/* Hero Section */}
          <div className="relative bg-primary min-h-[500px] flex items-center justify-center py-20 px-4 overflow-hidden shadow-2xl">
             <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80" alt="Fabric Texture" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary"></div>
             </div>
             
             <div className="relative max-w-4xl mx-auto text-center z-10 animate-fade-in-up">
               <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                 Textile Aadhat
               </span>
              <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 text-white leading-tight">
                Shivpriya <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Silk Mills</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                Connecting discerning businesses with India's finest manufacturers. <br className="hidden md:block"/> Unmatched quality, verified suppliers, and transparent pricing.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <button 
                  onClick={() => setCurrentView(AppView.SAREES)}
                  className="px-8 py-4 bg-secondary text-white rounded-full font-bold hover:bg-amber-700 transition-all shadow-glow hover:scale-105 active:scale-95"
                >
                  Browse Collections
                </button>
                <button 
                  onClick={() => setCurrentView(AppView.CONTACT)}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="text-center p-2">
                    <div className="text-4xl font-bold text-primary font-serif mb-2">230+</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Verified Suppliers</div>
                </div>
                <div className="text-center p-2">
                    <div className="text-4xl font-bold text-primary font-serif mb-2">3</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Premium Categories</div>
                </div>
                <div className="text-center p-2">
                    <div className="text-4xl font-bold text-primary font-serif mb-2">100%</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Quality Assured</div>
                </div>
            </div>
          </div>

          {/* Why Choose Us Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-4">Why Businesses Trust Us</h2>
               <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border border-slate-50 group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Users className="w-7 h-7 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Vetted Network</h3>
                <p className="text-slate-600 leading-relaxed">
                  We don't just add anyone. Every supplier in our network undergoes a strict verification process for quality, reliability, and financial stability.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border border-slate-50 group">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                  <PackageCheck className="w-7 h-7 text-emerald-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Quality First</h3>
                <p className="text-slate-600 leading-relaxed">
                  From fabric inspection to packaging, we act as your eyes on the ground, ensuring what you order is exactly what you get.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border border-slate-50 group">
                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-300">
                  <Truck className="w-7 h-7 text-secondary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">End-to-End Logistics</h3>
                <p className="text-slate-600 leading-relaxed">
                  We coordinate the entire shipment process, handling the complexities of transport and delivery so you can focus on sales.
                </p>
              </div>
            </div>
          </div>

           {/* Categories */}
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-primary font-serif mb-10 text-center">Curated Collections</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Sarees', view: AppView.SAREES, img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=1200', desc: 'Banarasi, Silk, & Dyed' },
                  { title: 'Designer Suits', view: AppView.SUITS, img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80', desc: 'Embroidered & Printed' },
                  { title: 'Dress Materials', view: AppView.MATERIALS, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80', desc: 'Lehenga, Raw Silk & More' }
                ].map((cat) => (
                  <div key={cat.title} className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg" onClick={() => setCurrentView(cat.view)}>
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                      <h3 className="text-white font-bold text-2xl font-serif mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{cat.title}</h3>
                      <p className="text-slate-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">{cat.desc}</p>
                      <div className="flex items-center text-secondary font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                        View Collection <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      );
    }

    const priceCategories: (PriceCategory | 'All')[] = ['All', '₹200 - ₹500', '₹500 - ₹1,000', '₹1,000+'];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        {/* Sticky removed to prevent scrolling issues */}
        <div className="mb-12 bg-white/80 backdrop-blur-xl p-4 -mx-4 rounded-2xl shadow-soft border border-white/50">
          <div className="flex flex-col xl:flex-row xl:items-center gap-6 justify-between">
            <div className="pl-2">
              <h2 className="text-3xl font-bold text-primary font-serif">
                {currentView === AppView.SAREES && 'Saree Collection'}
                {currentView === AppView.SUITS && 'Suit Collection'}
                {currentView === AppView.MATERIALS && 'Dress Materials'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">{filteredSuppliers.length} Premium Suppliers Available</p>
            </div>
            
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search suppliers..."
                  className="pl-9 pr-4 py-2.5 w-full lg:w-64 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                />
              </div>

              {/* Price Filter - HIDDEN FOR DRESS MATERIALS */}
              {currentView !== AppView.MATERIALS && (
                <div className="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                   <div className="px-3 flex items-center text-slate-400 border-r border-slate-200 mr-2">
                      <Filter className="w-4 h-4" />
                   </div>
                   <div className="flex gap-1">
                      {priceCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setPriceFilter(category)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            priceFilter === category
                              ? 'bg-white text-secondary shadow-sm ring-1 ring-slate-200'
                              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                   </div>
                </div>
              )}

              {/* Market Dropdown */}
              <div className="relative">
                 <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                 <select 
                  value={marketFilter}
                  onChange={(e) => setMarketFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary block w-full pl-9 pr-10 py-2.5 cursor-pointer shadow-sm hover:border-slate-300 transition-colors"
                >
                  {availableMarkets.map((market) => (
                    <option key={market} value={market}>
                      {market === 'All' ? 'All Markets' : market}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {/* Item Filter */}
              {currentView === AppView.MATERIALS && (
                 <div className="relative">
                 <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                 <select 
                  value={itemFilter}
                  onChange={(e) => setItemFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary block w-full pl-9 pr-10 py-2.5 cursor-pointer shadow-sm hover:border-slate-300 transition-colors"
                >
                  {availableItems.map((item) => (
                    <option key={item} value={item}>
                      {item === 'All' ? 'All Items' : item}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              )}

            </div>
          </div>
        </div>

        {/* Top Suppliers */}
        {topSuppliers.length > 0 && (
          <div className="mb-20">
             <div className="flex items-center mb-8">
                <h3 className="text-2xl font-bold text-primary font-serif">Top Rated Picks</h3>
                <div className="h-px bg-slate-200 flex-grow ml-6"></div>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topSuppliers.map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
             </div>
          </div>
        )}

        {/* All Suppliers */}
        <div>
          <div className="flex items-center mb-8">
            <h3 className="text-xl font-bold text-slate-700 font-serif">Complete Catalog</h3>
            <div className="h-px bg-slate-200 flex-grow ml-6"></div>
          </div>
          
          {allCategorySuppliers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allCategorySuppliers.map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          ) : (
             <div className="bg-white rounded-2xl p-16 text-center border border-dashed border-slate-300 shadow-sm">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-slate-700 mb-2">No suppliers found</h4>
                <p className="text-slate-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                    onClick={() => { setMarketFilter('All'); setPriceFilter('All'); setSearchQuery(''); setItemFilter('All'); }}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                  >
                    Clear All Filters
                  </button>
             </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="pt-4">
        {renderContent()}
      </main>
      
      <footer className="bg-primary text-slate-400 py-16 mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold font-serif text-2xl mb-6">Shivpriya Silk Mills</h4>
            <p className="text-sm leading-relaxed max-w-sm">
              Your trusted partner in textile procurement. We bridge the gap between Surat's finest manufacturers and global businesses, ensuring quality, transparency, and timely delivery.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Collections</h4>
            <ul className="space-y-3 text-sm">
              <li className="cursor-pointer hover:text-secondary transition-colors" onClick={() => setCurrentView(AppView.SAREES)}>Sarees</li>
              <li className="cursor-pointer hover:text-secondary transition-colors" onClick={() => setCurrentView(AppView.SUITS)}>Suits</li>
              <li className="cursor-pointer hover:text-secondary transition-colors" onClick={() => setCurrentView(AppView.MATERIALS)}>Dress Materials</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="font-semibold text-white">{AGENT_NAME}</p>
              <a href={`tel:+91${AGENT_CONTACT}`} className="hover:text-white transition-colors cursor-pointer block">{AGENT_CONTACT}</a>
              <a href={`mailto:${AGENT_EMAIL}`} className="hover:text-white transition-colors cursor-pointer break-all block">{AGENT_EMAIL}</a>
              <p className="font-semibold text-white mt-4">Yogesh Poddar</p>
              <a href={`tel:+919375713415`} className="hover:text-white transition-colors cursor-pointer block">9375713415</a>
              <p className="mt-4 text-xs bg-white/10 inline-block px-2 py-1 rounded">Surat, India</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
           © {new Date().getFullYear()} Shivpriya Silk Mills. All rights reserved.
        </div>
      </footer>

      <GeminiAssistant suppliers={suppliers} />
    </div>
  );
}

export default App;
