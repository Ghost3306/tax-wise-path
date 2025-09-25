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
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="relative">
        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
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

                <TabsContent value="basic" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Income from Salary"
                      value={incomeData.salary}
                      onChange={(value) => handleIncomeChange('salary', value)}
                      placeholder="18,95,000"
                    />
                    <InputField
                      label="Exempt Allowances"
                      value={incomeData.exemptAllowances}
                      onChange={(value) => handleIncomeChange('exemptAllowances', value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="income" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Income from Interest"
                      value={incomeData.interest}
                      onChange={(value) => handleIncomeChange('interest', value)}
                      placeholder="21,000"
                    />
                    <InputField
                      label="Rental Income Received"
                      value={incomeData.rental}
                      onChange={(value) => handleIncomeChange('rental', value)}
                    />
                    <InputField
                      label="Income from Digital Assets"
                      value={incomeData.digitalAssets}
                      onChange={(value) => handleIncomeChange('digitalAssets', value)}
                    />
                    <InputField
                      label="Interest on Home Loan - Self Occupied"
                      value={incomeData.homeLoanSelfOccupied}
                      onChange={(value) => handleIncomeChange('homeLoanSelfOccupied', value)}
                    />
                    <InputField
                      label="Interest on Home Loan - Let Out"
                      value={incomeData.homeLoanLetOut}
                      onChange={(value) => handleIncomeChange('homeLoanLetOut', value)}
                    />
                    <InputField
                      label="Other Income"
                      value={incomeData.otherIncome}
                      onChange={(value) => handleIncomeChange('otherIncome', value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="deduction" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Basic Deductions - 80C"
                      value={deductionData.basic80C}
                      onChange={(value) => handleDeductionChange('basic80C', value)}
                    />
                    <InputField
                      label="Interest from Deposits - 80TTA"
                      value={deductionData.interest80TTA}
                      onChange={(value) => handleDeductionChange('interest80TTA', value)}
                    />
                    <InputField
                      label="Medical Insurance - 80D"
                      value={deductionData.medical80D}
                      onChange={(value) => handleDeductionChange('medical80D', value)}
                      placeholder="12,000"
                    />
                    <InputField
                      label="Donations to Charity - 80G"
                      value={deductionData.charity80G}
                      onChange={(value) => handleDeductionChange('charity80G', value)}
                    />
                    <InputField
                      label="Interest on Housing Loan - 80EEA"
                      value={deductionData.housing80EEA}
                      onChange={(value) => handleDeductionChange('housing80EEA', value)}
                    />
                    <InputField
                      label="Employee's Contribution to NPS - 80CCD"
                      value={deductionData.employeeNPS80CCD}
                      onChange={(value) => handleDeductionChange('employeeNPS80CCD', value)}
                    />
                    <InputField
                      label="Employer's Contribution to NPS - 80CCD(2)"
                      value={deductionData.employerNPS80CCD2}
                      onChange={(value) => handleDeductionChange('employerNPS80CCD2', value)}
                    />
                    <InputField
                      label="Any Other Deduction"
                      value={deductionData.otherDeduction}
                      onChange={(value) => handleDeductionChange('otherDeduction', value)}
                    />
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