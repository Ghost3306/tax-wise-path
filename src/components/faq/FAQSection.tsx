import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'What is the difference between Old and New Tax Regime?',
      answer: 'The Old Tax Regime allows various deductions under sections like 80C, 80D, etc., but has higher tax rates. The New Tax Regime offers lower tax rates but with limited deductions. You can choose the regime that benefits you more.',
      category: 'Tax Regime'
    },
    {
      id: '2',
      question: 'How much can I invest under Section 80C?',
      answer: 'You can invest up to ₹1.5 lakh per financial year under Section 80C. This includes investments in PPF, ELSS mutual funds, life insurance premiums, NSC, tax-saving FDs, and more.',
      category: 'Deductions'
    },
    {
      id: '3',
      question: 'What are the current income tax slabs for FY 2024-25?',
      answer: 'For New Tax Regime: 0-3L (0%), 3-6L (5%), 6-9L (10%), 9-12L (15%), 12-15L (20%), above 15L (30%). Standard deduction of ₹75,000 is available for salaried individuals.',
      category: 'Tax Slabs'
    },
    {
      id: '4',
      question: 'How is HRA exemption calculated?',
      answer: 'HRA exemption is the minimum of: (1) Actual HRA received, (2) 40% of basic salary for non-metro cities or 50% for metro cities, (3) Actual rent paid minus 10% of basic salary.',
      category: 'HRA'
    },
    {
      id: '5',
      question: 'When is the deadline for filing ITR?',
      answer: 'The deadline for filing ITR for individuals is usually July 31st of the assessment year. For FY 2023-24 (AY 2024-25), the deadline is July 31, 2024. Late filing attracts penalties.',
      category: 'Filing'
    },
    {
      id: '6',
      question: 'What documents do I need for tax filing?',
      answer: 'You need Form 16 (for salaried), bank statements, investment proofs, rent receipts, medical insurance receipts, donation receipts, and any other income documents.',
      category: 'Documentation'
    },
    {
      id: '7',
      question: 'How much can I save under Section 80D for medical insurance?',
      answer: 'You can claim up to ₹25,000 for yourself and family, additional ₹25,000 for parents (₹50,000 if parents are senior citizens), and ₹5,000 for preventive health check-ups.',
      category: 'Medical'
    },
    {
      id: '8',
      question: 'What is Standard Deduction and who can claim it?',
      answer: 'Standard Deduction of ₹75,000 (for FY 2024-25) is available for salaried employees and pensioners. It reduces your taxable income without any investment or expense proof.',
      category: 'Deductions'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div id="faq" className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-full">
            <HelpCircle className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common tax-related questions
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <Card className="shadow-medium mb-8 animate-slide-up">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSearchQuery(category)}
              className="px-4 py-2 text-sm font-medium rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <Card className="shadow-medium animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl">
              {searchQuery ? `Search Results (${filteredFAQs.length})` : 'All Questions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                          {faq.category}
                        </span>
                        <span className="flex-1">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary hover:underline mt-2"
                >
                  Clear search
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQSection;