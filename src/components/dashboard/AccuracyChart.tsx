
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AgroData {
  produto: string;
  acuracia_modelo_perc: number;
}

interface AccuracyChartProps {
  agroData: AgroData[];
}

const AccuracyChart: React.FC<AccuracyChartProps> = ({ agroData }) => {
  const accuracyData = React.useMemo(() => {
    if (!agroData) return [];
    
    const productAccuracy = agroData.reduce((acc, item) => {
      if (item.produto && item.acuracia_modelo_perc) {
        if (!acc[item.produto]) {
          acc[item.produto] = { total: 0, count: 0 };
        }
        acc[item.produto].total += item.acuracia_modelo_perc;
        acc[item.produto].count += 1;
      }
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.entries(productAccuracy).map(([product, data]) => ({
      product,
      accuracy: Math.round(data.total / data.count * 100) / 100
    }));
  }, [agroData]);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Precisão dos Modelos</CardTitle>
        <CardDescription>Acurácia por produto</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="product" stroke="#666" />
            <YAxis domain={[85, 100]} stroke="#666" />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#8b5cf6" 
              fill="url(#colorAccuracy)" 
              name="Precisão (%)"
            />
            <defs>
              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AccuracyChart;
