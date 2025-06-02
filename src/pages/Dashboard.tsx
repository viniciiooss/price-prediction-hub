
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import FilterControls from '@/components/dashboard/FilterControls';
import KPICards from '@/components/dashboard/KPICards';
import HistoricalChart from '@/components/dashboard/HistoricalChart';
import MarketDistributionChart from '@/components/dashboard/MarketDistributionChart';
import RegionalAnalysisChart from '@/components/dashboard/RegionalAnalysisChart';
import AccuracyChart from '@/components/dashboard/AccuracyChart';
import RecommendationsCard from '@/components/dashboard/RecommendationsCard';

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
          
          <FilterControls
            products={products}
            states={states}
            selectedProduct={selectedProduct}
            selectedState={selectedState}
            onProductChange={setSelectedProduct}
            onStateChange={setSelectedState}
          />
        </div>

        {filteredData && (
          <>
            {/* KPIs */}
            <KPICards filteredData={filteredData} />

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <HistoricalChart filteredData={filteredData} />
              <MarketDistributionChart agroData={agroData} />
            </div>

            {/* Análise Regional e Precisão */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RegionalAnalysisChart agroData={agroData} />
              <AccuracyChart agroData={agroData} />
            </div>

            {/* Recomendações */}
            <RecommendationsCard 
              filteredData={filteredData}
              selectedProduct={selectedProduct}
              selectedState={selectedState}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
