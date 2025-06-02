
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, ArrowUp, BarChart3 } from 'lucide-react';

interface AgroData {
  produto: string;
  uf: string;
  classificao_produto: string;
  acuracia_modelo_perc: number;
  previsao_jun: number;
  previsao_min_jun: number;
  previsao_max_jun: number;
  preco_atual_mai: number;
}

interface KPICardsProps {
  filteredData: AgroData;
}

const KPICards: React.FC<KPICardsProps> = ({ filteredData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Previsão de Preço (Jun)</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            R$ {filteredData.previsao_jun?.toFixed(2)}
          </div>
          <p className="text-xs text-gray-600">
            Previsão para junho de 2025
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {filteredData.acuracia_modelo_perc?.toFixed(1)}% precisão
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faixa de Preço</CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-gray-800">
            R$ {filteredData.previsao_min_jun?.toFixed(2)} - R$ {filteredData.previsao_max_jun?.toFixed(2)}
          </div>
          <p className="text-xs text-gray-600">
            Intervalo de confiança de 95%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
              style={{ width: '75%' }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Último Preço (Mai)</CardTitle>
          <ArrowUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-800">
            R$ {filteredData.preco_atual_mai?.toFixed(2)}
          </div>
          <p className="text-xs text-gray-600">
            Preço atual em maio
          </p>
          <Badge className="mt-2 bg-blue-100 text-blue-700">
            Produto: {filteredData.classificao_produto}
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Precisão do Modelo</CardTitle>
          <BarChart3 className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {filteredData.acuracia_modelo_perc?.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-600">
            Acurácia da previsão de junho
          </p>
          <div className="flex items-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-700 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPICards;
