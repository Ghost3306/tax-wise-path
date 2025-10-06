import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Loader2, Search, MessageSquare, DollarSign, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ChatMessage {
  id: string;
  message: string;
  response: string | null;
  created_at: string;
}

interface TaxHistoryItem {
  id: number;
  gross_income: number;
  taxable_income: number;
  total_tax: number;
  created_at: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string | null;
  created_at: string;
}

const Profile = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [taxHistory, setTaxHistory] = useState<TaxHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingTax, setLoadingTax] = useState(true);

  // FAQ states
  const [faqQuestion, setFaqQuestion] = useState('');
  const [userFaqs, setUserFaqs] = useState<FAQItem[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchChatMessages();
    fetchTaxHistory();
    fetchUserFaqs();
  }, [user, navigate]);

  // ------------------ Fetch Chat History ------------------
  const fetchChatMessages = async () => {
    if (!user) return;
    setLoadingChats(true);
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: 'Failed to load chat history', variant: 'destructive' });
    } else {
      setChatMessages(data || []);
    }
    setLoadingChats(false);
  };

  // ------------------ Fetch Tax History ------------------
  const fetchTaxHistory = async () => {
    if (!profile) return;
    setLoadingTax(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/tax/tax-history/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: profile.username }),
      });
      if (!response.ok) throw new Error('Failed to fetch tax history');
      const data: TaxHistoryItem[] = await response.json();
      setTaxHistory(data);
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
    setLoadingTax(false);
  };

  // ------------------ FAQ Section ------------------
  const fetchUserFaqs = async () => {
    if (!user) return;
    setLoadingFaqs(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/tax/faq/by-email/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profile.username }),
      });
      if (!response.ok) throw new Error('Failed to fetch user FAQs');
      const data = await response.json();
      setUserFaqs(data.faqs || []);
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
    setLoadingFaqs(false);
  };

  const submitFaq = async () => {
    if (!faqQuestion.trim()) {
      toast({ title: 'Error', description: 'Question cannot be empty', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/tax/faq/insert/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profile.username, question: faqQuestion }),
      });
      if (!response.ok) throw new Error('Failed to submit FAQ');
      toast({ title: 'Success', description: 'FAQ submitted successfully' });
      setFaqQuestion('');
      fetchUserFaqs();
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({ title: 'Logged out', description: 'You have been successfully logged out' });
    navigate('/');
  };

  const filteredChat = chatMessages.filter(msg =>
    msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (msg.response?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  const filteredTax = taxHistory.filter(item =>
    item.gross_income.toString().includes(searchQuery) ||
    item.total_tax.toString().includes(searchQuery) ||
    item.taxable_income.toString().includes(searchQuery)
  );

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* User Info Card */}
        <Card className="mb-8 shadow-medium animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                    {profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{profile.username}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}  
                className="group hover:border-destructive hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Chat History Card */}
        {/* <Card className="mb-8 shadow-medium animate-scale-in"> */}
          {/* <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle>Chat History</CardTitle>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader> */}
          {/* <CardContent>
            {loadingChats ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredChat.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? 'No matching chats found' : 'No chat history yet'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredChat.map(msg => (
                  <div key={msg.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors animate-slide-in">
                    <div className="mb-2">
                      <p className="text-sm font-medium text-primary">You:</p>
                      <p className="text-sm mt-1">{msg.message}</p>
                    </div>
                    {msg.response && (
                      <div>
                        <p className="text-sm font-medium text-secondary">Response:</p>
                        <p className="text-sm mt-1 text-muted-foreground">{msg.response}</p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent> */}
        {/* </Card> */}

        {/* Tax History Card */}
        <Card className="shadow-medium animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle>Tax History</CardTitle>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by income or tax..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loadingTax ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredTax.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? 'No matching records found' : 'No tax history yet'}
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {filteredTax.map(item => (
                  <div key={item.id} className="flex flex-col p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors animate-slide-in">
                    <div className="flex gap-4">
                      <span className="font-medium">Gross Income:</span>
                      <span>{item.gross_income}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-medium">Taxable Income:</span>
                      <span>{item.taxable_income}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-medium">Total Tax:</span>
                      <span>{item.total_tax}</span>
                    </div>
                    <div className="text-xs mt-2">
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ---------------- FAQ Submission & Display Section ---------------- */}
        <Card className="mb-8 shadow-medium animate-slide-up">
          <CardHeader className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle>Submit a Question</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <Input
                placeholder="Type your question here..."
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
              />
              <Button onClick={submitFaq}>Submit Question</Button>
            </div>

            <h3 className="text-lg font-semibold mb-3">Your Submitted Questions</h3>
            {loadingFaqs ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : userFaqs.length === 0 ? (
              <p className="text-muted-foreground">You haven't submitted any questions yet.</p>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {userFaqs.map(faq => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer || <span className="text-muted-foreground">Admin will respond soon.</span>}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Profile;
