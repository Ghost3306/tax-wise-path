import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Info, Calculator, IndianRupee } from 'lucide-react';
import TaxResults from './TaxResults';

interface DeductionData {
  basic80C: number;
  interest80TTA: number;
  medical80D: number;
  charity80G: number;
  housing80EEA: number;
  employeeNPS80CCD: number;
  employerNPS80CCD2: number;
  otherDeduction: number;
}

interface IncomeData {
  salary: number;
  interest: number;
  rental: number;
  digitalAssets: number;
  exemptAllowances: number;
  homeLoanSelfOccupied: number;
  homeLoanLetOut: number;
  otherIncome: number;
}

const TaxCalculator = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [incomeData, setIncomeData] = useState<IncomeData>({
    salary: 0,
    interest: 0,
    rental: 0,
    digitalAssets: 0,
    exemptAllowances: 0,
    homeLoanSelfOccupied: 0,
    homeLoanLetOut: 0,
    otherIncome: 0,
  });

  const [deductionData, setDeductionData] = useState<DeductionData>({
    basic80C: 0,
    interest80TTA: 0,
    medical80D: 0,
    charity80G: 0,
    housing80EEA: 0,
    employeeNPS80CCD: 0,
    employerNPS80CCD2: 0,
    otherDeduction: 0,
  });

  const handleIncomeChange = (field: keyof IncomeData, value: string) => {
    setIncomeData({
      ...incomeData,
      [field]: parseFloat(value) || 0,
    });
  };

  const handleDeductionChange = (field: keyof DeductionData, value: string) => {
    setDeductionData({
      ...deductionData,
      [field]: parseFloat(value) || 0,
    });
  };

  const InputField = ({ 
    label, 
    value, 
    onChange, 
    placeholder = "0" 
  }: { 
    label: string; 
    value: number; 
    onChange: (value: string) => void;
    placeholder?: string;
  }) => (
    <div className="space-y-2 animate-fade-in hover-lift">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="relative">
        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground animate-pulse" />
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 input-focus hover:shadow-soft"
        />
      </div>
    </div>
  );

  return (
    <div id="calculator" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-full">
            <Calculator className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Income Tax Calculator</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate your tax liability and explore deduction options with our comprehensive tax calculator
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Forms */}
        <div className="lg:col-span-2">
          <Card className="shadow-medium animate-slide-up hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 animate-fade-in">
                <Info className="h-5 w-5 text-primary animate-pulse" />
                Tax Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                  <TabsTrigger value="basic" className="transition-all duration-300 hover:bg-accent">Basic Details</TabsTrigger>
                  <TabsTrigger value="income" className="transition-all duration-300 hover:bg-accent">Income Details</TabsTrigger>
                  <TabsTrigger value="deduction" className="transition-all duration-300 hover:bg-accent">Deductions</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-6 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="animate-stagger">
                      <InputField
                        label="Income from Salary"
                        value={incomeData.salary}
                        onChange={(value) => handleIncomeChange('salary', value)}
                        placeholder="18,95,000"
                      />
                    </div>
                    <div className="animate-stagger">
                      <InputField
                        label="Exempt Allowances"
                        value={incomeData.exemptAllowances}
                        onChange={(value) => handleIncomeChange('exemptAllowances', value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="income" className="mt-6 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'interest', label: 'Income from Interest', placeholder: '21,000' },
                      { key: 'rental', label: 'Rental Income Received', placeholder: '' },
                      { key: 'digitalAssets', label: 'Income from Digital Assets', placeholder: '' },
                      { key: 'homeLoanSelfOccupied', label: 'Interest on Home Loan - Self Occupied', placeholder: '' },
                      { key: 'homeLoanLetOut', label: 'Interest on Home Loan - Let Out', placeholder: '' },
                      { key: 'otherIncome', label: 'Other Income', placeholder: '' },
                    ].map((field, index) => (
                      <div key={field.key} className="animate-stagger">
                        <InputField
                          label={field.label}
                          value={incomeData[field.key as keyof IncomeData]}
                          onChange={(value) => handleIncomeChange(field.key as keyof IncomeData, value)}
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="deduction" className="mt-6 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'basic80C', label: 'Basic Deductions - 80C', placeholder: '' },
                      { key: 'interest80TTA', label: 'Interest from Deposits - 80TTA', placeholder: '' },
                      { key: 'medical80D', label: 'Medical Insurance - 80D', placeholder: '12,000' },
                      { key: 'charity80G', label: 'Donations to Charity - 80G', placeholder: '' },
                      { key: 'housing80EEA', label: 'Interest on Housing Loan - 80EEA', placeholder: '' },
                      { key: 'employeeNPS80CCD', label: "Employee's Contribution to NPS - 80CCD", placeholder: '' },
                      { key: 'employerNPS80CCD2', label: "Employer's Contribution to NPS - 80CCD(2)", placeholder: '' },
                      { key: 'otherDeduction', label: 'Any Other Deduction', placeholder: '' },
                    ].map((field, index) => (
                      <div key={field.key} className="animate-stagger">
                        <InputField
                          label={field.label}
                          value={deductionData[field.key as keyof DeductionData]}
                          onChange={(value) => handleDeductionChange(field.key as keyof DeductionData, value)}
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-1">
          <TaxResults incomeData={incomeData} deductionData={deductionData} />
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;