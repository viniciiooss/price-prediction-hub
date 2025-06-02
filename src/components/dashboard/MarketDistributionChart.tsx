
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface AgroData {
  produto: string;
}

interface MarketDistributionChartProps {
  agroData: AgroData[];
}

const MarketDistributionChart: React.FC<MarketDistributionChartProps> = ({ agroData }) => {
  const marketData = React.useMemo(() => {
    if (!agroData) return [];
    
    const productCounts = agroData.reduce((acc, item) => {
      if (item.produto) {
        acc[item.produto] = (acc[item.produto] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const colors = ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444'];
    return Object.entries(productCounts).map(([produto, count], index) => ({
      name: produto,
      value: Math.round((count / agroData.length) * 100),
      color: colors[index % colors.length]
    }));
  }, [agroData]);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Distribuição do Mercado</CardTitle>
        <CardDescription>Participação por tipo de produto</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={marketData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {marketData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketDistributionChart;
