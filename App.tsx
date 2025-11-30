import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import SupplierCard from './components/SupplierCard';
import TrendsChart from './components/TrendsChart';
import GeminiAssistant from './components/GeminiAssistant';
import { AppView, CategoryType, PriceCategory, Supplier } from './types';
import { SUPPLIERS, AGENT_NAME, AGENT_CONTACT, AGENT_EMAIL } from './constants';
import { ArrowRight, CheckCircle, Mail, Phone, Filter, Store, Search, Tag } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [priceFilter, setPriceFilter] = useState<PriceCategory | 'All'>('All');
  const [marketFilter, setMarketFilter] = useState<string>('All');
  const [itemFilter, setItemFilter] = useState<string>('All'); // New Item/Specialty Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Use constant suppliers
  const suppliers = SUPPLIERS;

  // Reset filters when changing views
  useEffect(() => {
    setPriceFilter('All');
    setMarketFilter('All');
    setItemFilter('All');
    setSearchQuery('');
  }, [currentView]);

  // Get suppliers for the current category
  const currentCategorySuppliers = useMemo(() => {
    let category: CategoryType | null = null;
    switch (currentView) {
      case AppView.SAREES:
        category = CategoryType.SAREE;
        break;
      case AppView.SUITS:
        category = CategoryType.SUIT;
        break;
      case AppView.MATERIALS:
        category = CategoryType.DRESS_MATERIAL;
        break;
      default:
        return [];
    }
    return suppliers.filter(s => s.category === category);
  }, [currentView, suppliers]);

  // Derive unique markets from the suppliers in the current category
  const availableMarkets = useMemo(() => {
    const markets = new Set(currentCategorySuppliers.map(s => s.market));
    return ['All', ...Array.from(markets).sort()];
  }, [currentCategorySuppliers]);

  // Derive unique items/specialties (Only relevant for Dress Materials typically, but logic works for all)
  const availableItems = useMemo(() => {
    const items = new Set(currentCategorySuppliers.map(s => s.specialty));
    return ['All', ...Array.from(items).sort()];
  }, [currentCategorySuppliers]);

  // Apply filters
  const filteredSuppliers = useMemo(() => {
    return currentCategorySuppliers.filter(s => {
      // Price Filter: Check if the supplier supports the selected price category
      const matchesPrice = priceFilter === 'All' || s.priceCategories.includes(priceFilter);
      
      // Market Filter
      const matchesMarket = marketFilter === 'All' || s.market === marketFilter;

      // Item/Specialty Filter
      const matchesItem = itemFilter === 'All' || s.specialty === itemFilter;
      
      // Search Filter
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
                            s.name.toLowerCase().includes(q) || 
                            s.location.toLowerCase().includes(q) ||
                            s.specialty.toLowerCase().includes(q);

      return matchesPrice && matchesMarket && matchesItem && matchesSearch;
    });
  }, [currentCategorySuppliers, priceFilter, marketFilter, itemFilter, searchQuery]);

  const topSuppliers = filteredSuppliers.filter(s => s.isTopSupplier);
  const allCategorySuppliers = filteredSuppliers; 

  const renderContent = () => {
    if (currentView === AppView.CONTACT) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center">
            <h2 className="text-3xl font-bold text-primary font-serif mb-6">Connect with {AGENT_NAME}</h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              Ready to place an order or need more details about a supplier? I manage the entire procurement process for you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <Phone className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold text-primary mb-1">Call / WhatsApp</h3>
                <p className="text-lg font-bold text-slate-700">{AGENT_CONTACT}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <Mail className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold text-primary mb-1">Email</h3>
                <p className="text-lg font-bold text-slate-700 break-words">{AGENT_EMAIL}</p>
              </div>
            </div>

            <form className="text-left space-y-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea rows={4} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"></textarea>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      );
    }

    if (currentView === AppView.HOME) {
      return (
        <div className="space-y-16 pb-12">
          {/* Hero Section */}
          <div className="relative bg-primary text-white py-20 px-4 sm:px-6 lg:px-8 rounded-3xl overflow-hidden mx-4 mt-4 shadow-2xl">
             <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1595567363048-81e88917a164?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
             <div className="relative max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                Shivpriya Silk Mills <br/> <span className="text-secondary">Premium Sourcing</span>
              </h1>
              <p className="text-lg text-slate-200 mb-8 leading-relaxed">
                Your gateway to India's finest textile manufacturers. We bridge the gap between quality suppliers and your business needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => setCurrentView(AppView.SAREES)}
                  className="px-8 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  Explore Collections
                </button>
                <button 
                  onClick={() => setCurrentView(AppView.CONTACT)}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Contact Shivpriya
                </button>
              </div>
            </div>
          </div>

          {/* Features / Trends */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary font-serif mb-6">Market Insights</h2>
                <p className="text-slate-600 mb-6 text-lg">
                  Stay ahead of the curve with our analysis of seasonal demands. We ensure you stock the right fabrics at the right time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Curated network of verified suppliers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Quality assurance checks on every order</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Seamless logistics and delivery management</span>
                  </li>
                </ul>
              </div>
              <div>
                <TrendsChart suppliers={suppliers} />
              </div>
            </div>
          </div>

           {/* Featured Categories Teaser */}
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-primary font-serif mb-8 text-center">Our Expertise</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Exquisite Sarees', view: AppView.SAREES, img: 'https://images.unsplash.com/photo-1610189012906-4783fdae2c26?auto=format&fit=crop&q=80' },
                  { title: 'Designer Suits', view: AppView.SUITS, img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80' },
                  { title: 'Premium Materials', view: AppView.MATERIALS, img: 'https://images.unsplash.com/photo-1624912753874-80077f09171e?auto=format&fit=crop&q=80' }
                ].map((cat) => (
                  <div key={cat.title} className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md" onClick={() => setCurrentView(cat.view)}>
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <div className="w-full flex justify-between items-center">
                        <span className="text-white font-bold text-xl font-serif">{cat.title}</span>
                        <ArrowRight className="text-white w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
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

    // Category Views (Sarees, Suits, Materials)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6">
            <div>
              <h2 className="text-3xl font-bold text-primary font-serif mb-2">
                {currentView === AppView.SAREES && 'Saree Collection'}
                {currentView === AppView.SUITS && 'Suit Collection'}
                {currentView === AppView.MATERIALS && 'Dress Materials'}
              </h2>
              <p className="text-slate-600">Browse our trusted partners and manufacturers.</p>
            </div>
            
            {/* Filter UI */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 lg:flex-row lg:items-center">
              
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search suppliers..."
                  className="pl-9 pr-4 py-1.5 w-full lg:w-48 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary outline-none transition-all"
                />
              </div>

              <div className="hidden lg:block w-px h-6 bg-slate-200 mx-2"></div>

              {/* Price Filter - HIDDEN FOR DRESS MATERIALS */}
              {currentView !== AppView.MATERIALS && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center px-2 text-slate-400">
                        <Filter className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium hidden md:inline">Price:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {priceCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setPriceFilter(category)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                              priceFilter === category
                                ? 'bg-secondary text-white shadow-sm'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                  </div>
                  <div className="hidden lg:block w-px h-6 bg-slate-200 mx-2"></div>
                </>
              )}


              {/* Market Filter */}
              <div className="flex items-center gap-2">
                  <div className="flex items-center px-2 text-slate-400">
                    <Store className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium hidden md:inline">Market:</span>
                  </div>
                  <div className="relative">
                    <select 
                      value={marketFilter}
                      onChange={(e) => setMarketFilter(e.target.value)}
                      className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full pl-3 pr-8 py-1.5 cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      {availableMarkets.map((market) => (
                        <option key={market} value={market}>
                          {market}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
              </div>

              {/* Item Type Filter (Only for Dress Materials) */}
              {currentView === AppView.MATERIALS && (
                <>
                  <div className="hidden lg:block w-px h-6 bg-slate-200 mx-2"></div>
                  <div className="flex items-center gap-2">
                      <div className="flex items-center px-2 text-slate-400">
                        <Tag className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium hidden md:inline">Item:</span>
                      </div>
                      <div className="relative">
                        <select 
                          value={itemFilter}
                          onChange={(e) => setItemFilter(e.target.value)}
                          className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full pl-3 pr-8 py-1.5 cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                          {availableItems.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* Top Suppliers Section */}
        {topSuppliers.length > 0 && (
          <div className="mb-16">
             <div className="flex items-center mb-6">
                <div className="bg-secondary w-1 h-8 mr-3 rounded-full"></div>
                <h3 className="text-2xl font-bold text-primary">Top Rated Suppliers</h3>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topSuppliers.map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
             </div>
          </div>
        )}

        {/* All Suppliers Section */}
        <div>
          <div className="flex items-center mb-6">
            <div className="bg-slate-300 w-1 h-6 mr-3 rounded-full"></div>
            <h3 className="text-xl font-bold text-slate-700">All Suppliers</h3>
          </div>
          
          {allCategorySuppliers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allCategorySuppliers.map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          ) : (
             <div className="bg-slate-50 rounded-xl p-12 text-center border border-dashed border-slate-300">
                <p className="text-slate-500 text-lg">No suppliers found matching your filters.</p>
                <div className="flex justify-center gap-4 mt-4">
                  <button 
                    onClick={() => { setPriceFilter('All'); setSearchQuery(''); setItemFilter('All'); }}
                    className="text-secondary font-medium hover:underline text-sm"
                  >
                    Clear Filters
                  </button>
                  <button 
                    onClick={() => setMarketFilter('All')}
                    className="text-secondary font-medium hover:underline text-sm"
                  >
                    Clear Market
                  </button>
                   <button 
                    onClick={() => { setMarketFilter('All'); setPriceFilter('All'); setSearchQuery(''); setItemFilter('All'); }}
                    className="text-primary font-bold hover:underline text-sm"
                  >
                    Clear All
                  </button>
                </div>
             </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main>
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="bg-primary text-slate-300 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold font-serif text-lg mb-4">Shivpriya Silk Mills</h4>
            <p className="text-sm opacity-80">
              Empowering businesses with premium textile sourcing solutions directly from India's manufacturing hubs.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-secondary" onClick={() => setCurrentView(AppView.HOME)}>Home</li>
              <li className="cursor-pointer hover:text-secondary" onClick={() => setCurrentView(AppView.SAREES)}>Sarees</li>
              <li className="cursor-pointer hover:text-secondary" onClick={() => setCurrentView(AppView.SUITS)}>Suits</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Agent Contact</h4>
            <p className="text-sm mb-2">{AGENT_NAME}</p>
            <p className="text-sm mb-2">{AGENT_CONTACT}</p>
            <p className="text-sm">Surat, India</p>
          </div>
        </div>
      </footer>

      <GeminiAssistant suppliers={suppliers} />
    </div>
  );
}

export default App;