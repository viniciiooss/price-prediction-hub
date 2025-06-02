
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3, ArrowUp, ArrowDown, Target, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState('soja');
  const [selectedState, setSelectedState] = useState('MT');
  const [predictions, setPredictions] = useState<any>(null);

  // Dados simulados baseados no seu modelo
  const products = [
    { value: 'soja', label: 'Soja - Grão' },
    { value: 'milho', label: 'Milho - Grão' },
    { value: 'feijao', label: 'Feijão - Carioca' },
    { value: 'arroz', label: 'Arroz - Grão Longo' }
  ];

  const states = [
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'PR', label: 'Paraná' },
    { value: 'GO', label: 'Goiás' }
  ];

  // Dados históricos simulados
  const historicalData = [
    { month: 'Jan', price: 120.50, prediction: 118.30 },
    { month: 'Fev', price: 122.80, prediction: 121.20 },
    { month: 'Mar', price: 119.90, prediction: 119.50 },
    { month: 'Abr', price: 125.40, prediction: 124.80 },
    { month: 'Mai', price: 128.20, prediction: 127.90 },
    { month: 'Jun', price: null, prediction: 131.50 }
  ];

  const marketData = [
    { name: 'Soja', value: 45, color: '#22c55e' },
    { name: 'Milho', value: 30, color: '#3b82f6' },
    { name: 'Feijão', value: 15, color: '#a855f7' },
    { name: 'Outros', value: 10, color: '#f59e0b' }
  ];

  const regionData = [
    { region: 'MT', production: 85, price: 125.80 },
    { region: 'RS', production: 72, price: 128.90 },
    { region: 'PR', production: 68, price: 127.50 },
    { region: 'GO', production: 61, price: 124.20 },
    { region: 'SP', production: 55, price: 129.80 }
  ];

  const accuracyData = [
    { product: 'Soja', accuracy: 98.5 },
    { product: 'Milho', accuracy: 96.8 },
    { product: 'Feijão', accuracy: 94.2 },
    { product: 'Arroz', accuracy: 92.7 }
  ];

  // Simula busca de previsões
  useEffect(() => {
    const fetchPredictions = () => {
      // Simula resposta da API Python
      const mockPrediction = {
        product: selectedProduct,
        state: selectedState,
        predicted_price: 131.50,
        min_price: 128.20,
        max_price: 134.80,
        accuracy: 98.5,
        trend: 'up',
        confidence: 'high'
      };
      
      setPredictions(mockPrediction);
    };

    fetchPredictions();
  }, [selectedProduct, selectedState]);

  const getRecommendations = () => {
    if (!predictions) return [];

    const recommendations = [
      {
        type: 'success',
        icon: <CheckCircle className="w-5 h-5" />,
        title: 'Momento Favorável para Venda',
        description: `Com precisão de ${predictions.accuracy}%, recomendamos vender nos próximos 15 dias.`,
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

  if (!predictions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard AgroPredict</h1>
            <p className="text-gray-600">Análises e previsões em tempo real para o mercado agrícola</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar produto" />
              </SelectTrigger>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product.value} value={product.value}>
                    {product.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar estado" />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Previsão de Preço</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {predictions.predicted_price.toFixed(2)}
              </div>
              <p className="text-xs text-gray-600">
                +2.8% em relação ao mês anterior
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {predictions.accuracy}% precisão
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
                R$ {predictions.min_price.toFixed(2)} - R$ {predictions.max_price.toFixed(2)}
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
              <CardTitle className="text-sm font-medium">Tendência</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Alta</div>
              <p className="text-xs text-gray-600">
                Baseado em análise de 12 meses
              </p>
              <Badge className="mt-2 bg-green-100 text-green-700">
                Confiança: {predictions.confidence === 'high' ? 'Alta' : 'Média'}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volatilidade</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">Média</div>
              <p className="text-xs text-gray-600">
                Variação de ±3.2% esperada
              </p>
              <div className="flex items-center space-x-1 mt-2">
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Histórico vs Previsão */}
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

          {/* Distribuição por Produto */}
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
        </div>

        {/* Análise Regional e Precisão */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Análise Regional */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Análise Regional</CardTitle>
              <CardDescription>Produção e preços por estado</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="region" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Bar dataKey="production" fill="#22c55e" name="Produção (mil t)" />
                  <Bar dataKey="price" fill="#3b82f6" name="Preço (R$/saca)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Precisão dos Modelos */}
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
        </div>

        {/* Recomendações */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>Recomendações Inteligentes</span>
            </CardTitle>
            <CardDescription>
              Baseadas na análise de {selectedProduct.toUpperCase()} em {selectedState}
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
      </div>
    </div>
  );
};

export default Dashboard;
