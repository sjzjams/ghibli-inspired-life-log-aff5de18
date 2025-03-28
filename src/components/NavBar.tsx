
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Image, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Navigation links data
const navLinks = [
  { name: 'Home', path: '/', icon: <Home className="w-5 h-5 mr-2" /> },
  { name: 'Journal', path: '/journal', icon: <BookOpen className="w-5 h-5 mr-2" /> },
  { name: 'Gallery', path: '/gallery', icon: <Image className="w-5 h-5 mr-2" /> },
  { name: 'Milestones', path: '/milestones', icon: <Star className="w-5 h-5 mr-2" /> },
];

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-sm border-b border-ghibli-blue/20 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">
            Little Life Journal
          </span>
        </Link>

        {/* Mobile menu button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors
                  ${location.pathname === link.path 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-primary/10'
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 inset-x-0 bg-white bg-opacity-95 backdrop-blur-sm border-b border-ghibli-blue/20 shadow-md animate-fade-in">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-md text-lg font-medium flex items-center transition-colors
                  ${location.pathname === link.path 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-primary/10'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
