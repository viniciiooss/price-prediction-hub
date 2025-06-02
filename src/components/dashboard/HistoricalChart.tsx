
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AgroData {
  preco_atual_jan: number;
  previsao_jan: number;
  preco_atual_fev: number;
  previsao_fev: number;
  preco_atual_mar: number;
  previsao_mar: number;
  preco_atual_abr: number;
  previsao_abr: number;
  preco_atual_mai: number;
  previsao_mai: number;
  previsao_jun: number;
}

interface HistoricalChartProps {
  filteredData: AgroData;
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ filteredData }) => {
  const historicalData = React.useMemo(() => {
    if (!filteredData) return [];
    
    return [
      { month: 'Jan', price: filteredData.preco_atual_jan, prediction: filteredData.previsao_jan },
      { month: 'Fev', price: filteredData.preco_atual_fev, prediction: filteredData.previsao_fev },
      { month: 'Mar', price: filteredData.preco_atual_mar, prediction: filteredData.previsao_mar },
      { month: 'Abr', price: filteredData.preco_atual_abr, prediction: filteredData.previsao_abr },
      { month: 'Mai', price: filteredData.preco_atual_mai, prediction: filteredData.previsao_mai },
      { month: 'Jun', price: null, prediction: filteredData.previsao_jun }
    ].filter(item => item.price !== null || item.prediction !== null);
  }, [filteredData]);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Histórico vs Previsão</CardTitle>
        <CardDescription>Comparação entre preços reais e predições do modelo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#22c55e" 
              strokeWidth={3}
              name="Preço Real"
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="prediction" 
              stroke="#3b82f6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Previsão"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalChart;
