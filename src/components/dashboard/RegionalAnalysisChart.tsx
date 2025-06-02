
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AgroData {
  uf: string;
  previsao_jun: number;
}

interface RegionalAnalysisChartProps {
  agroData: AgroData[];
}

const RegionalAnalysisChart: React.FC<RegionalAnalysisChartProps> = ({ agroData }) => {
  const regionData = React.useMemo(() => {
    if (!agroData) return [];
    
    const stateData = agroData.reduce((acc, item) => {
      if (item.uf && item.previsao_jun) {
        if (!acc[item.uf]) {
          acc[item.uf] = { count: 0, totalPrice: 0 };
        }
        acc[item.uf].count += 1;
        acc[item.uf].totalPrice += item.previsao_jun;
      }
      return acc;
    }, {} as Record<string, { count: number; totalPrice: number }>);

    return Object.entries(stateData).map(([region, data]) => ({
      region,
      production: data.count,
      price: Math.round(data.totalPrice / data.count * 100) / 100
    }));
  }, [agroData]);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Análise Regional</CardTitle>
        <CardDescription>Dados por estado</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="region" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Bar dataKey="production" fill="#22c55e" name="Produtos" />
            <Bar dataKey="price" fill="#3b82f6" name="Preço Médio" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RegionalAnalysisChart;
