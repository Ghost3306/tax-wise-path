import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, Menu, X, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:scale-105 transition-transform">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TaxBuddy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              Home
            </Link>
            <a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              Calculator
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              FAQ
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              About
            </a>

            {/* User Menu */}
            <div className="flex items-center space-x-2 ml-6">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {profile?.username?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{profile?.username || "User"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate('/profile')}
                      className="cursor-pointer"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Button 
                        variant="outline" 
                        onClick={handleLogout}
                        className="group hover:border-destructive hover:text-destructive transition-colors w-full"
                      >
                        <LogOut className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                        Logout
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="hover:bg-accent hover:text-accent-foreground"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => navigate('/register')}
                    className="bg-gradient-primary border-0 hover:opacity-90 transition-opacity"
                  >
                    Register
                  </Button>
                </>
              )}
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
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border animate-fade-in">
              <Link 
                to="/" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Home
              </Link>
              <a 
                href="#calculator" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Calculator
              </a>
              <a 
                href="#faq" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              >
                FAQ
              </a>
              <a 
                href="#about" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                About
              </a>

              {/* Auth Buttons */}
              <div className="pt-4 space-y-2">
                {user ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {profile?.username || "User"}
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      className="w-full bg-gradient-primary border-0"
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
