import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/hero/HeroSection';
import TaxCalculator from '../components/tax/TaxCalculator';
import Chatbot from '../components/chat/Chatbot';
import FAQSection from '../components/faq/FAQSection';
import FileUpload from '../components/upload/FileUpload';
import AboutSection from '../components/about/AboutSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TaxCalculator />
        <FileUpload />
        <Chatbot />
        <FAQSection />
        <AboutSection />
      </main>
    </div>
  );
};

export default Index;
