import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Users } from 'lucide-react';

const AboutSection = () => {
  const developers = [
    {
      name: "Alex Johnson",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      github: "alexjohnson",
      linkedin: "alex-johnson-dev",
      email: "alex@taxcalcpro.com"
    },
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      github: "sarahchen",
      linkedin: "sarah-chen-frontend",
      email: "sarah@taxcalcpro.com"
    },
    {
      name: "Michael Rodriguez",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      github: "mrodriguez",
      linkedin: "michael-rodriguez-backend",
      email: "michael@taxcalcpro.com"
    },
    {
      name: "Emily Davis",
      role: "Tax Consultant & Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      github: "emilydavis",
      linkedin: "emily-davis-tax",
      email: "emily@taxcalcpro.com"
    }
  ];

  return (
    <div id="about" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-full">
            <Users className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">About the Project</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          TaxCalc Pro is developed by a passionate team of developers and tax professionals dedicated to simplifying tax calculations for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {developers.map((developer, index) => (
          <Card key={index} className="shadow-medium animate-slide-up hover:shadow-strong transition-all group">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="font-semibold text-lg text-foreground">{developer.name}</h3>
                <p className="text-sm text-muted-foreground">{developer.role}</p>
              </div>
              
              <div className="flex justify-center space-x-3">
                <a
                  href={`https://github.com/${developer.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={`https://linkedin.com/in/${developer.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${developer.email}`}
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Information */}
      <Card className="shadow-medium animate-fade-in">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-4">
                We believe that tax calculation shouldn't be complicated. Our platform provides an intuitive, 
                accurate, and comprehensive solution for Indian taxpayers to calculate their tax liability 
                and explore various tax-saving options.
              </p>
              <p className="text-muted-foreground">
                Built with modern web technologies and powered by the latest tax regulations, 
                TaxCalc Pro helps you make informed financial decisions.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Accurate tax calculations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Old vs New regime comparison</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">AI-powered tax assistant</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Comprehensive FAQ section</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Document upload support</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © 2024 TaxCalc Pro. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs">
              Developed with ❤️ for Indian taxpayers
            </p>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutSection;