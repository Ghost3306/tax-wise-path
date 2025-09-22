import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:scale-105 transition-transform">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TaxCalc Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 transform px-3 py-2">
              Home
            </Link>
            <Link to="/#calculator" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 transform px-3 py-2">
              Calculator
            </Link>
            <Link to="/#faq" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 transform px-3 py-2">
              FAQ
            </Link>
            <Link to="/#about" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 transform px-3 py-2">
              About
            </Link>
            <div className="flex items-center space-x-2 ml-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="animate-fade-in hover-lift"
              >
                Login
              </Button>
              <Button 
                variant="gradient"
                onClick={() => navigate('/register')}
                className="animate-fade-in hover-glow"
              >
                Register
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border animate-slide-down">
              <Link 
                to="/" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/#calculator" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link 
                to="/#faq" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/#about" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full animate-slide-up"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="gradient"
                  className="w-full animate-slide-up"
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;