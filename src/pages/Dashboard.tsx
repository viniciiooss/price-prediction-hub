
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3, ArrowUp, ArrowDown, Target, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface AgroData {
  produto: string;
  uf: string;
  classificao_produto: string;
  acuracia_modelo_perc: number;
  previsao_jun: number;
  previsao_min_jun: number;
  previsao_max_jun: number;
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
}

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [filteredData, setFilteredData] = useState<AgroData | null>(null);

  // Busca todos os dados da tabela AgroAI
  const { data: agroData, isLoading, error } = useQuery({
    queryKey: ['agroData'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('AgroAI')
        .select('*');
      
      if (error) throw error;
      return data as AgroData[];
    }
  });

  // Extrai produtos únicos
  const products = React.useMemo(() => {
    if (!agroData) return [];
    const uniqueProducts = [...new Set(agroData.map(item => item.produto))].filter(Boolean);
    return uniqueProducts.map(produto => ({ value: produto, label: produto }));
  }, [agroData]);

  // Extrai estados únicos para o produto selecionado
  const states = React.useMemo(() => {
    if (!agroData || !selectedProduct) return [];
    const statesForProduct = agroData
      .filter(item => item.produto === selectedProduct)
      .map(item => item.uf)
      .filter(Boolean);
    const uniqueStates = [...new Set(statesForProduct)];
    return uniqueStates.map(uf => ({ value: uf, label: uf }));
  }, [agroData, selectedProduct]);

  // Atualiza os dados filtrados quando produto e estado mudam
  useEffect(() => {
    if (agroData && selectedProduct && selectedState) {
      const data = agroData.find(item => 
        item.produto === selectedProduct && item.uf === selectedState
      );
      setFilteredData(data || null);
    }
  }, [agroData, selectedProduct, selectedState]);

  // Define produto e estado padrão quando os dados são carregados
  useEffect(() => {
    if (agroData && agroData.length > 0 && !selectedProduct) {
      const firstProduct = agroData[0].produto;
      const firstState = agroData[0].uf;
      if (firstProduct) setSelectedProduct(firstProduct);
      if (firstState) setSelectedState(firstState);
    }
  }, [agroData, selectedProduct]);

  // Prepara dados históricos para o gráfico
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

  // Dados de distribuição por produto
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

  // Dados regionais
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

  // Dados de precisão
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar dados</h2>
          <p className="text-gray-600">Não foi possível conectar com o banco de dados.</p>
        </div>
      </div>
    );
  }

  if (!agroData || agroData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhum dado encontrado</h2>
          <p className="text-gray-600">Não há dados disponíveis na tabela AgroAI.</p>
        </div>
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

        {filteredData && (
          <>
            {/* KPIs */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
