import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Info, Calculator, IndianRupee } from 'lucide-react';
import TaxResults from './TaxResults';
import { useAuth } from '@/contexts/AuthContext';
import ComparisonGraph from '../ComparisonGraph';


interface DeductionData {
  basic80C: string;
  interest80TTA: string;
  medical80D: string;
  charity80G: string;
  housing80EEA: string;
  employeeNPS80CCD: string;
  employerNPS80CCD2: string;
  otherDeduction: string;
}

interface TaxResultsProps {
  incomeData: IncomeData;
  deductionData: DeductionData;
  apiResult?: ApiResult | null;
  recommendedPolicies?: { [category: string]: string[] }[]; // <-- new prop
}


interface IncomeData {
  salary: string;
  interest: string;
  rental: string;
  digitalAssets: string;
  exemptAllowances: string;
  homeLoanSelfOccupied: string;
  homeLoanLetOut: string;
  otherIncome: string;
}

const TaxCalculator = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const { user, profile, signOut } = useAuth();
  const [incomeData, setIncomeData] = useState<IncomeData>({
    salary: '',
    interest: '',
    rental: '',
    digitalAssets: '',
    exemptAllowances: '',
    homeLoanSelfOccupied: '',
    homeLoanLetOut: '',
    otherIncome: '',
  });

  const [deductionData, setDeductionData] = useState<DeductionData>({
    basic80C: '',
    interest80TTA: '',
    medical80D: '',
    charity80G: '',
    housing80EEA: '',
    employeeNPS80CCD: '',
    employerNPS80CCD2: '',
    otherDeduction: '',
  });

  const [apiResult, setApiResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Handlers
  const handleIncomeChange = (field: keyof IncomeData, value: string) =>
    setIncomeData(prev => ({ ...prev, [field]: value }));

  const handleDeductionChange = (field: keyof DeductionData, value: string) =>
    setDeductionData(prev => ({ ...prev, [field]: value }));

  // Stable parsed values for TaxResults
  const parsedIncomeData = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(incomeData).map(([k, v]) => [k, parseFloat(v) || 0])
      ),
    [incomeData]
  );

  const parsedDeductionData = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(deductionData).map(([k, v]) => [k, parseFloat(v) || 0])
      ),
    [deductionData]
  );

  // Submit handler
  const handleSubmit = async () => {
  setLoading(true);
  try {
    // Get logged-in user from localStorage
    const user = localStorage.getItem('user'); // assume it's stored as JSON string
    const userEmail = user ? JSON.parse(user).email : null;
    //console.log(user['username']);
    const payload = {
      username:profile.username,
      taxpayer_type: 'resident',
      email: user, 
      
      gross_income:
        (parseFloat(incomeData.salary) || 0) +
        (parseFloat(incomeData.interest) || 0) +
        (parseFloat(incomeData.rental) || 0) +
        (parseFloat(incomeData.digitalAssets) || 0) +
        (parseFloat(incomeData.otherIncome) || 0),
      regime: 'old',
      age: 35,
      tds: 40000,
      deductions: {
        home_emi:
          (parseFloat(incomeData.homeLoanSelfOccupied) || 0) +
          (parseFloat(incomeData.homeLoanLetOut) || 0),
        edu_emi: 0,
        sec_80c: parseFloat(deductionData.basic80C) || 0,
        nps:
          (parseFloat(deductionData.employeeNPS80CCD) || 0) +
          (parseFloat(deductionData.employerNPS80CCD2) || 0),
        health: parseFloat(deductionData.medical80D) || 0,
        donation: parseFloat(deductionData.charity80G) || 0,
        savings_interest: parseFloat(deductionData.interest80TTA) || 0,
        disability: 0,
      },
      has_business: false,
      presumptive: false,
      special_income: false,
    };

    const res = await fetch('http://127.0.0.1:8000/tax/calculate/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result);
    setApiResult(result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};


  // Number-only onChange helper
  const handleNumberInput = (setter: (field: any, value: string) => void, field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setter(field as any, value);
  };

  return (
    <div id="calculator" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-full">
            <Calculator className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Income Tax Calculator
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate your tax liability and explore deduction options with our comprehensive tax calculator
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Forms */}
        <div className="lg:col-span-2">
          <Card className="shadow-medium animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Tax Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Details</TabsTrigger>
                  <TabsTrigger value="income">Income Details</TabsTrigger>
                  <TabsTrigger value="deduction">Deductions</TabsTrigger>
                </TabsList>

                {/* Basic */}
                <TabsContent value="basic" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label>Income from Salary</Label>
                      <Input
                        value={incomeData.salary}
                        onChange={handleNumberInput(handleIncomeChange, 'salary')}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label>Exempt Allowances</Label>
                      <Input
                        value={incomeData.exemptAllowances}
                        onChange={handleNumberInput(handleIncomeChange, 'exemptAllowances')}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Income */}
                <TabsContent value="income" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries({
                      Interest: 'interest',
                      'Rental Income Received': 'rental',
                      'Income from Digital Assets': 'digitalAssets',
                      'Interest on Home Loan - Self Occupied': 'homeLoanSelfOccupied',
                      'Interest on Home Loan - Let Out': 'homeLoanLetOut',
                      'Other Income': 'otherIncome',
                    }).map(([label, field]) => (
                      <div className="space-y-1" key={field}>
                        <Label>{label}</Label>
                        <Input
                          value={(incomeData as any)[field]}
                          onChange={handleNumberInput(handleIncomeChange, field)}
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Deductions */}
                <TabsContent value="deduction" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries({
                      'Basic Deductions - 80C': 'basic80C',
                      'Interest from Deposits - 80TTA': 'interest80TTA',
                      'Medical Insurance - 80D': 'medical80D',
                      'Donations to Charity - 80G': 'charity80G',
                      'Interest on Housing Loan - 80EEA': 'housing80EEA',
                      "Employee's Contribution to NPS - 80CCD": 'employeeNPS80CCD',
                      "Employer's Contribution to NPS - 80CCD(2)": 'employerNPS80CCD2',
                      'Any Other Deduction': 'otherDeduction',
                    }).map(([label, field]) => (
                      <div className="space-y-1" key={field}>
                        <Label>{label}</Label>
                        <Input
                          value={(deductionData as any)[field]}
                          onChange={handleNumberInput(handleDeductionChange, field)}
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={handleSubmit} className="mt-6 w-full" disabled={loading}>
                {loading ? 'Calculating...' : 'Calculate Tax'}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-1">
          
         <TaxResults
  incomeData={parsedIncomeData}
  deductionData={parsedDeductionData}
  apiResult={apiResult}
  recommendedPolicies={apiResult?.recommended_policies || []} // <-- pass recommended policies
/>

        </div>
        
                   <ComparisonGraph data={apiResult} />
                  </div>
    </div>
  );
};

export default TaxCalculator;
