
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, BarChart3, UserPlus, CheckCircle, ArrowRight, TrendingUp, Shield, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6 text-green-600" />,
      title: "Previsões Precisas",
      description: "Algoritmos avançados de machine learning para previsões confiáveis de preços agrícolas"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: "Análise de Tendências",
      description: "Identifique padrões e tendências de mercado para tomar decisões estratégicas"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Dados Confiáveis",
      description: "Base de dados robusta com informações históricas e atualizações em tempo real"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Tempo Real",
      description: "Monitoramento contínuo e alertas automáticos sobre mudanças no mercado"
    }
  ];

  const benefits = [
    "Redução de riscos na comercialização",
    "Otimização do tempo de plantio e colheita",
    "Melhor planejamento financeiro",
    "Aumento da margem de lucro",
    "Decisões baseadas em dados científicos"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Previsões Inteligentes
                  </span>
                  <br />
                  <span className="text-gray-800">para o Agronegócio</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transforme dados em decisões estratégicas. Nossa plataforma utiliza machine learning 
                  avançado para prever preços de produtos agrícolas com alta precisão.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Ver Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button variant="outline" className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 text-lg rounded-xl transition-all duration-200">
                    Começar Gratuitamente
                    <UserPlus className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Previsão de Preços</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      98.5% Precisão
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <span className="font-medium text-gray-700">Soja - Grão</span>
                      <span className="text-green-600 font-bold">R$ 125,80/saca</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <span className="font-medium text-gray-700">Milho - Grão</span>
                      <span className="text-blue-600 font-bold">R$ 68,50/saca</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <span className="font-medium text-gray-700">Feijão - Carioca</span>
                      <span className="text-purple-600 font-bold">R$ 295,20/saca</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-800">
              Por que escolher o AgroPredict?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma combina dados históricos, análise preditiva e interface intuitiva 
              para oferecer as melhores previsões do mercado agrícola.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 group-hover:scale-110 transition-transform duration-200">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-800">
                  Maximize seus Resultados
                </h2>
                <p className="text-xl text-gray-600">
                  Com nossas previsões precisas, você pode tomar decisões mais inteligentes 
                  e aumentar significativamente sua rentabilidade.
                </p>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/cadastro">
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105">
                  Comece Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Resultados Comprovados
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-gray-600">Precisão das Previsões</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-blue-600">25%</div>
                    <div className="text-sm text-gray-600">Aumento no Lucro</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-purple-600">1000+</div>
                    <div className="text-sm text-gray-600">Produtores Ativos</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-orange-600">50+</div>
                    <div className="text-sm text-gray-600">Produtos Monitorados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Pronto para revolucionar seu agronegócio?
            </h2>
            <p className="text-xl text-green-100">
              Junte-se a milhares de produtores que já transformaram suas decisões com dados inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Explorar Dashboard
                  <BarChart3 className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg rounded-xl transition-all duration-200">
                  Cadastre-se Gratuitamente
                  <UserPlus className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
