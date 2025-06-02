
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface AgroData {
  acuracia_modelo_perc: number;
}

interface RecommendationsCardProps {
  filteredData: AgroData;
  selectedProduct: string;
  selectedState: string;
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ 
  filteredData, 
  selectedProduct, 
  selectedState 
}) => {
  const getRecommendations = () => {
    if (!filteredData) return [];

    const recommendations = [
      {
        type: 'success',
        icon: <CheckCircle className="w-5 h-5" />,
        title: 'Momento Favorável para Venda',
        description: `Com precisão de ${filteredData.acuracia_modelo_perc?.toFixed(1)}%, recomendamos vender nos próximos 15 dias.`,
        action: 'Programar venda'
      },
      {
        type: 'warning',
        icon: <AlertTriangle className="w-5 h-5" />,
        title: 'Monitorar Mercado',
        description: 'Preços podem oscilar devido à sazonalidade. Mantenha-se atento.',
        action: 'Configurar alertas'
      },
      {
        type: 'info',
        icon: <Lightbulb className="w-5 h-5" />,
        title: 'Oportunidade de Arbitragem',
        description: `Considere vender em ${selectedState} e comprar em regiões com preços menores.`,
        action: 'Ver análise regional'
      }
    ];

    return recommendations;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>Recomendações Inteligentes</span>
        </CardTitle>
        <CardDescription>
          Baseadas na análise de {selectedProduct} em {selectedState}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {getRecommendations().map((rec, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-l-4 ${
                rec.type === 'success' ? 'border-green-500 bg-green-50' :
                rec.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`mt-0.5 ${
                    rec.type === 'success' ? 'text-green-600' :
                    rec.type === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`}>
                    {rec.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                    <p className="text-gray-600 mt-1">{rec.description}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`ml-4 ${
                    rec.type === 'success' ? 'border-green-200 text-green-700 hover:bg-green-100' :
                    rec.type === 'warning' ? 'border-yellow-200 text-yellow-700 hover:bg-yellow-100' :
                    'border-blue-200 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {rec.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
