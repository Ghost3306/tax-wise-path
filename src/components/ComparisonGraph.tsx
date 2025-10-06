import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HistoricalData {
  gross_income: number;
  taxable_income: number;
  total_tax: number;
  created_at: string;
}

interface UserInputData {
  gross_income: number;
  taxable_income: number;
  total_tax_old: number;
  total_tax_new: number;
  created_at: string;
}

interface GraphData {
  comparison_graph?: {
    historical: HistoricalData[];
    user_input: UserInputData[];
  };
}

interface Props {
  data: GraphData | null;
}

const ComparisonGraph: React.FC<Props> = ({ data }) => {
  if (!data || !data.comparison_graph) return null;

  const { historical, user_input } = data.comparison_graph;
  console.log(data.comparison_graph);

  // Merge all gross incomes and sort
  const allGrossIncomes = [
    ...historical.map(d => d.gross_income),
    ...user_input.map(d => d.gross_income),
  ];
  const uniqueSortedGross = Array.from(new Set(allGrossIncomes)).sort((a, b) => a - b);

  // Create maps for quick lookups
  const historicalMap = new Map(historical.map(d => [d.gross_income, d.total_tax]));
  console.log('userinput', user_input);

  // For user input, we only have 1 point. Fill all gross incomes with the same value for line to render
  const userOldTax = user_input[0]?.total_tax_old ?? 0;
  const userNewTax = user_input[0]?.total_tax_new ?? 0;

  const userOldMap = new Map(uniqueSortedGross.map(g => [g, userOldTax]));
  const userNewMap = new Map(uniqueSortedGross.map(g => [g, userNewTax]));

  // Debug: print all data
  console.log('Unique Gross:', uniqueSortedGross);
  console.log('Historical Map:', historicalMap);
  console.log('User Old Map:', userOldMap);
  console.log('User New Map:', userNewMap);

  const chartData = {
    labels: uniqueSortedGross.map(g => g.toLocaleString('en-IN')),
    datasets: [
      {
        label: 'Historical Tax',
        data: uniqueSortedGross.map(g => historicalMap.get(g) ?? null),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Your Tax (Old Regime)',
        data: uniqueSortedGross.map(g => userOldMap.get(g)),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Your Tax (New Regime)',
        data: uniqueSortedGross.map(g => userNewMap.get(g)),
        borderColor: 'rgba(0, 128, 0, 1)',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Tax Comparison Graph' },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      y: { title: { display: true, text: 'Total Tax (₹)' } },
      x: { title: { display: true, text: 'Gross Income (₹)' } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ComparisonGraph;
