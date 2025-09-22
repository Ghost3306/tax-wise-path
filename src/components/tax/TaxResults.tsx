import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingDown, IndianRupee, FileText, Zap, BarChart3 } from 'lucide-react';
import TaxChart from '../charts/TaxChart';

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

interface TaxResultsProps {
  incomeData: IncomeData;
  deductionData: DeductionData;
}

const TaxResults: React.FC<TaxResultsProps> = ({ incomeData, deductionData }) => {
  // Calculate total income
  const totalIncome = Object.values(incomeData).reduce((sum, value) => sum + value, 0);
  
  // Calculate total deductions
  const totalDeductions = Object.values(deductionData).reduce((sum, value) => sum + value, 0);
  
  // Simplified tax calculation for demo purposes
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  
  // Old regime calculation (simplified)
  const calculateOldRegimeTax = (income: number) => {
    let tax = 0;
    if (income > 250000) tax += Math.min(income - 250000, 250000) * 0.05;
    if (income > 500000) tax += Math.min(income - 500000, 500000) * 0.20;
    if (income > 1000000) tax += (income - 1000000) * 0.30;
    return Math.round(tax);
  };
  
  // New regime calculation (simplified)
  const calculateNewRegimeTax = (income: number) => {
    let tax = 0;
    if (income > 300000) tax += Math.min(income - 300000, 300000) * 0.05;
    if (income > 600000) tax += Math.min(income - 600000, 300000) * 0.10;
    if (income > 900000) tax += Math.min(income - 900000, 300000) * 0.15;
    if (income > 1200000) tax += Math.min(income - 1200000, 300000) * 0.20;
    if (income > 1500000) tax += (income - 1500000) * 0.30;
    return Math.round(tax);
  };
  
  const oldRegimeTax = calculateOldRegimeTax(taxableIncome);
  const newRegimeTax = calculateNewRegimeTax(totalIncome); // New regime doesn't allow most deductions
  
  const isNewRegimeBetter = newRegimeTax < oldRegimeTax;
  const taxSavings = Math.abs(oldRegimeTax - newRegimeTax);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Tax Liability Summary */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="h-5 w-5 text-primary" />
            Tax Liability Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Old vs New Regime */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm text-muted-foreground">Old Regime</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(oldRegimeTax)}</p>
              </div>
            </div>
            
            <div className="text-center py-2">
              <p className="text-sm text-muted-foreground">vs</p>
            </div>
            
            <div className="flex justify-between items-center p-4 rounded-lg bg-success/10 border border-success/20">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm text-success">New Regime</p>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    Recommended
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-success">{formatCurrency(newRegimeTax)}</p>
              </div>
            </div>
          </div>

          {/* Tax Savings */}
          <div className="p-4 rounded-lg bg-gradient-success text-success-foreground text-center">
            <p className="text-sm opacity-90">You save</p>
            <p className="text-2xl font-bold">{formatCurrency(taxSavings)}</p>
          </div>

          {/* Action Button */}
          <Button className="w-full bg-gradient-primary border-0 hover:opacity-90">
            <FileText className="h-4 w-4 mr-2" />
            File Now
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-warning" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Income</span>
              <span className="font-medium">{formatCurrency(totalIncome)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Deductions</span>
              <span className="font-medium text-success">{formatCurrency(totalDeductions)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-foreground">Taxable Income</span>
              <span className="text-foreground">{formatCurrency(taxableIncome)}</span>
            </div>
          </div>
          
          {/* Tax Efficiency Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax Efficiency</span>
              <span className="text-sm font-medium">
                {Math.round((totalDeductions / Math.max(totalIncome, 1)) * 100)}%
              </span>
            </div>
            <Progress 
              value={Math.min((totalDeductions / Math.max(totalIncome, 1)) * 100, 100)} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Regime Comparison */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">Regime Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Effective Tax Rate</span>
              <div className="text-right">
                <p className="text-sm font-medium">{((newRegimeTax / Math.max(totalIncome, 1)) * 100).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">New Regime</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Savings vs Old Regime</span>
              <p className="text-sm font-medium text-success">
                {formatCurrency(taxSavings)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Chart */}
      {totalIncome > 0 && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              Tax Analysis Charts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaxChart 
              oldRegimeTax={oldRegimeTax}
              newRegimeTax={newRegimeTax}
              totalDeductions={totalDeductions}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxResults;