
import React from 'react';
import { AppView } from '../types';
import { ScrollText, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', view: AppView.HOME },
    { label: 'Sarees', view: AppView.SAREES },
    { label: 'Suits', view: AppView.SUITS },
    { label: 'Fabrics', view: AppView.MATERIALS },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(AppView.HOME)}>
            <div className="bg-primary group-hover:bg-secondary transition-colors duration-300 p-2 rounded-lg mr-3 shadow-md">
              <ScrollText className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-primary tracking-tight leading-none group-hover:text-secondary transition-colors">Shivpriya</h1>
              <span className="text-[10px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-1">Silk Mills</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentView === item.view
                    ? 'text-white bg-primary shadow-lg shadow-primary/20'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="h-8 w-px bg-slate-200 mx-4"></div>
            
            <button
              onClick={() => onNavigate(AppView.CONTACT)}
              className="flex items-center gap-2 bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-amber-700 transition-all shadow-lg shadow-amber-900/20 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Aadhat</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-primary p-2 transition-transform active:scale-90"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute w-full shadow-xl animate-fade-in-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  currentView === item.view
                    ? 'text-primary bg-slate-50 border border-slate-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate(AppView.CONTACT);
                setIsMenuOpen(false);
              }}
              className="block w-full text-center px-4 py-3 rounded-xl text-base font-bold text-white bg-primary mt-4 shadow-lg active:bg-slate-800"
            >
              Contact Aadhat
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
