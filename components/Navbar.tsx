import React from 'react';
import { AppView } from '../types';
import { ScrollText, Menu, X } from 'lucide-react';

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
    { label: 'Dress Materials', view: AppView.MATERIALS },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
            <div className="bg-primary p-1.5 rounded mr-2">
              <ScrollText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary font-serif tracking-tight">Shivpriya Silk Mills</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Agent Services</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === item.view
                    ? 'text-secondary bg-yellow-50'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <button
              onClick={() => onNavigate(AppView.CONTACT)}
              className="ml-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors shadow-md"
            >
              Contact Shivpriya Silk Mills
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-primary p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.view
                    ? 'text-secondary bg-yellow-50'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
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
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-primary mt-4"
            >
              Contact Shivpriya Silk Mills
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;