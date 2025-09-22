import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calculator, TrendingDown, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calculator,
      title: "Smart Tax Calculator",
      description: "Compare old vs new tax regimes instantly"
    },
    {
      icon: TrendingDown,
      title: "Tax Optimization",
      description: "Find the best deductions for maximum savings"
    },
    {
      icon: Shield,
      title: "Accurate & Secure",
      description: "Latest tax rules with complete data protection"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get your tax liability in seconds"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-slide-up">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                <Zap className="h-4 w-4 mr-2" />
                FY 2024-25 Ready
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Calculate Your{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Income Tax
              </span>{' '}
              in Minutes
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Get accurate tax calculations, compare regimes, and discover the best deductions 
              to maximize your savings with our comprehensive tax platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-primary border-0 hover:opacity-90 text-lg px-8"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Calculating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 text-lg px-8"
                onClick={() => navigate('/register')}
              >
                Create Free Account
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">₹50Cr+</div>
                <div className="text-sm text-muted-foreground">Tax Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="shadow-soft hover:shadow-medium transition-all group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center animate-fade-in">
          <p className="text-muted-foreground mb-8">Trusted by taxpayers across India</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="h-8 w-20 bg-muted rounded"></div>
            <div className="h-8 w-16 bg-muted rounded"></div>
            <div className="h-8 w-24 bg-muted rounded"></div>
            <div className="h-8 w-18 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;