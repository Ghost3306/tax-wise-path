import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingDown, FileText, Zap, BarChart3 } from 'lucide-react';
import TaxChart from '../charts/TaxChart';
import ComparisonGraph from '../ComparisonGraph';

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

interface ApiResult {
  payable?: number;
  refund?: number;
  payable_old?: number;
  refund_old?: number;
  gross_income: number;
  deductions: number;
  taxable_income: number;
  total_tax_old: number;
  total_tax_new: number;
  itr_form: string;
  message?: string;
  comparison_graph?: {
    historical: { gross_income: number; taxable_income: number; total_tax: number; created_at: string }[];
    user_input: { gross_income: number; taxable_income: number; total_tax_old: number; total_tax_new: number; created_at: string }[];
  };
}

interface TaxResultsProps {
  incomeData: IncomeData;
  deductionData: DeductionData;
  apiResult?: ApiResult | null;
}

const TaxResults: React.FC<TaxResultsProps> = ({ incomeData, deductionData, apiResult }) => {
  const totalIncome = Object.values(incomeData).reduce((sum, value) => sum + value, 0);
  const totalDeductions = Object.values(deductionData).reduce((sum, value) => sum + value, 0);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

  if (!apiResult) {
    return (
      <Card className="shadow-medium p-6 text-center">
        <p className="text-muted-foreground">
          Fill in your details and click "Calculate Tax" to see results.
        </p>
      </Card>
    );
  }

  // -------------------------------
  // Tax Efficiency (Percentage)
  // -------------------------------
  const taxEfficientRegime = apiResult.total_tax_old < apiResult.total_tax_new ? 'Old Regime' : 'New Regime';
  const taxInefficientTax = taxEfficientRegime === 'Old Regime' ? apiResult.total_tax_new : apiResult.total_tax_old;
  const taxEfficientTax = taxEfficientRegime === 'Old Regime' ? apiResult.total_tax_old : apiResult.total_tax_new;
  const taxSavedPercent = ((taxInefficientTax - taxEfficientTax) / taxInefficientTax) * 100;
  const taxEfficiencyPercent = Math.min(
    (apiResult.deductions / Math.max(apiResult.gross_income, 1)) * 100,
    100
  );

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
          <div className="space-y-3">
            <p className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gross Income</span>
              <span className="font-medium">{formatCurrency(apiResult.gross_income)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Deductions</span>
              <span className="font-medium text-success">{formatCurrency(apiResult.deductions)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxable Income</span>
              <span className="font-medium">{formatCurrency(apiResult.taxable_income)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Tax (Old Regime)</span>
              <span className="font-medium">{formatCurrency(apiResult.total_tax_old)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Tax (New Regime)</span>
              <span className="font-medium">{formatCurrency(apiResult.total_tax_new)}</span>
            </p>

            {/* Tax Efficient Badge */}
            <p className="flex justify-between text-sm font-medium items-center">
              <span className="text-foreground">Tax Efficient Regime</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                {taxEfficientRegime} ({taxSavedPercent.toFixed(1)}% tax saved)
              </Badge>
            </p>

            {/* Suggested ITR Form */}
            <p className="flex justify-between text-sm">
              <span className="text-muted-foreground">Suggested ITR Form</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                {apiResult.itr_form}
              </Badge>
            </p>
          </div>

          <Button className="w-full bg-gradient-primary border-0 hover:opacity-90">
            <FileText className="h-4 w-4 mr-2" />
            File Now
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats - Tax Efficiency */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-warning" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax Efficiency</span>
            <span className="text-sm font-medium">{taxEfficiencyPercent.toFixed(1)}%</span>
          </div>
          <Progress value={taxEfficiencyPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Tax Chart */}
      {apiResult.gross_income > 0 && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              Tax Analysis Charts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaxChart
              oldRegimeTax={apiResult.total_tax_old}
              newRegimeTax={apiResult.total_tax_new}
              totalDeductions={apiResult.deductions}
            />
          </CardContent>
        </Card>
      )}

      {/* Comparison Graph */}
      {apiResult.comparison_graph && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              Tax Comparison Graph
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ComparisonGraph data={apiResult} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxResults;
