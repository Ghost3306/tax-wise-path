import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Static random FAQs shown when input is empty or non-alphabetic
const STATIC_RANDOM_FAQS: FAQ[] = [
  { id: '1', question: 'What is the Old Tax Regime?', answer: 'Old Tax Regime allows deductions under sections like 80C, 80D, etc., but has higher rates.' },
  { id: '2', question: 'What is the New Tax Regime?', answer: 'New Tax Regime offers lower tax rates with limited deductions.' },
  { id: '3', question: 'What is Section 80C limit?', answer: 'You can invest up to ₹1.5 lakh per year under Section 80C in instruments like PPF, ELSS, etc.' },
  { id: '4', question: 'How to calculate HRA exemption?', answer: 'HRA exemption is minimum of actual HRA received, 50% of basic salary (metro), or rent paid minus 10% of salary.' },
  { id: '5', question: 'What is Standard Deduction?', answer: 'Standard Deduction reduces taxable income by ₹75,000 for salaried individuals.' },
  { id: '6', question: 'When is ITR due?', answer: 'ITR is usually due by July 31st of the assessment year.' },
  { id: '7', question: 'What documents are required for filing?', answer: 'Form 16, bank statements, investment proofs, rent receipts, medical receipts, donation receipts.' },
  { id: '8', question: 'How much can I claim under 80D?', answer: 'Up to ₹25,000 for self/family and ₹25,000 for parents (₹50,000 if senior citizens).' },
];

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);

  // Determine if searchQuery has alphabet letters
  const hasAlphabets = (str: string) => /[a-zA-Z]/.test(str);

  // Fetch FAQs from backend
  const fetchFaqs = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/tax/faq/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, session_id: 'faq_frontend' }),
      });
      if (!response.ok) throw new Error('Failed to fetch FAQs');
      const data = await response.json();
      const results: FAQ[] = (data.results || []).map((r: any, index: number) => ({
        id: `${index}`,
        question: r.question,
        answer: r.answer,
        category: r.category,
      }));
      setFaqs(results.length > 0 ? results : STATIC_RANDOM_FAQS);
    } catch (err) {
      console.error(err);
      setFaqs(STATIC_RANDOM_FAQS);
    } finally {
      setLoading(false);
    }
  };

  // Load FAQs on search query change or page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchQuery.trim() || !hasAlphabets(searchQuery)) {
        setFaqs(STATIC_RANDOM_FAQS);
      } else {
        fetchFaqs(searchQuery.trim());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div id="faq" className="container mx-auto px-4 py-16 bg-muted/30">
      {/* Header */}
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

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto">
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

        {/* FAQ Accordion */}
        <Card className="shadow-medium animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl">
              {loading
                ? 'Fetching FAQs...'
                : searchQuery && hasAlphabets(searchQuery)
                ? `Search Results (${faqs.length})`
                : 'Random FAQs'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                      <div className="flex items-start gap-3">
                        {faq.category && (
                          <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                            {faq.category}
                          </span>
                        )}
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
                <p className="text-muted-foreground">
                  {loading ? 'Fetching FAQs...' : 'No FAQs found matching your search.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQSection;
