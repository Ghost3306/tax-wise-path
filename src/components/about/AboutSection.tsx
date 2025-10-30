import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Users } from 'lucide-react';
import LalitImg from "./Lalit.jpeg";
import SahilImg from "./Sahil.jpeg";
import ShraddhaImg from "./Shraddha.jpg";
import ShwetaImg from "./Shweta.jpg";

const AboutSection = () => {
  const developers = [
    {
      name: "Lalit Rawool",
      role: "Backend Devolopement",
      image: LalitImg,
      github: "https://github.com/Ghost3306",
      linkedin: "https://www.linkedin.com/in/lalit-rawool/",
      email: "lalitrawool25@gmail.com"
    },
    {
      name: "Shraddha Chaure",
      role: "Frontend Developer",
      image: ShraddhaImg,
      github: "https://github.com/shraddha45-spec",
      linkedin: "https://www.linkedin.com/in/shraddha-chaure-925340287/",
      email: "sarah@taxcalcpro.com"
    },
    {
      name: "Shweta Borle",
      role: "Frontend Developer",
      image: ShwetaImg,
      github: "https://github.com/Shweta501-hub",
      linkedin: "https://www.linkedin.com/in/shweta-borle-187672287?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "michael@taxcalcpro.com"
    },
    {
      name: "Sahil Pawar",
      role: "Data Analysis",
      image: SahilImg,
      github: "emilydavis",
      linkedin: "https://www.linkedin.com/in/mesahilpawar/",
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
          TaxBuddy is developed by a passionate team of developers and tax professionals dedicated to simplifying tax calculations for everyone.
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
                  href={`${developer.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={`${developer.linkedin}`}
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
          At <span className="font-semibold">TaxBuddy</span>, our mission is to simplify the way individuals and businesses 
          approach tax management. We strive to empower users with transparent, reliable, 
          and hassle-free tools that eliminate complexity and build confidence in financial decisions.
        </p>
        <p className="text-muted-foreground">
          Leveraging cutting-edge technology and up-to-date tax policies, we deliver 
          precision-driven calculations, strategic insights, and personalized recommendations. 
          Our goal is to bridge the gap between finance and technology, helping you save time, 
          reduce errors, and maximize your tax benefits.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">Reliable and accurate tax calculations</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">Comparison between Old & New regimes</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">AI-driven tax planning assistant</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">Extensive knowledge base & FAQ support</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">Secure document management & uploads</span>
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
              © 2024 TaxBuddy. All rights reserved.
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