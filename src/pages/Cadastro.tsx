
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, UserPlus, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cadastro = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoProdutor: '',
    estado: '',
    cidade: '',
    principaisCulturas: [] as string[],
    aceitaTermos: false
  });

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const culturas = [
    'Soja', 'Milho', 'Feijão', 'Arroz', 'Trigo', 'Algodão', 
    'Café', 'Cana-de-açúcar', 'Tomate', 'Batata', 'Cebola', 'Mandioca'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceitaTermos) {
      toast({
        title: "Erro no cadastro",
        description: "Você deve aceitar os termos de uso para continuar.",
        variant: "destructive"
      });
      return;
    }

    console.log('Dados do cadastro:', formData);
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Bem-vindo ao AgroPredict. Em breve você receberá um email de confirmação.",
    });

    // Reset form
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      tipoProdutor: '',
      estado: '',
      cidade: '',
      principaisCulturas: [],
      aceitaTermos: false
    });
  };

  const handleCulturaChange = (cultura: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        principaisCulturas: [...prev.principaisCulturas, cultura]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        principaisCulturas: prev.principaisCulturas.filter(c => c !== cultura)
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Cadastre-se no AgroPredict
          </h1>
          <p className="text-xl text-gray-600">
            Junte-se a milhares de produtores que já transformaram suas decisões com dados inteligentes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                  <UserPlus className="w-6 h-6 mr-2 text-green-600" />
                  Criar Conta
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Preencha os dados abaixo para começar a usar nossa plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      Dados Pessoais
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                          id="nome"
                          type="text"
                          placeholder="Digite seu nome completo"
                          value={formData.nome}
                          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={formData.telefone}
                          onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                          className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tipoProdutor">Tipo de Produtor *</Label>
                        <Select 
                          value={formData.tipoProdutor} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, tipoProdutor: value }))}
                        >
                          <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pequeno">Pequeno Produtor</SelectItem>
                            <SelectItem value="medio">Médio Produtor</SelectItem>
                            <SelectItem value="grande">Grande Produtor</SelectItem>
                            <SelectItem value="cooperativa">Cooperativa</SelectItem>
                            <SelectItem value="agroindustria">Agroindústria</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Localização */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      Localização
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="estado">Estado *</Label>
                        <Select 
                          value={formData.estado} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, estado: value }))}
                        >
                          <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                          <SelectContent>
                            {estados.map(estado => (
                              <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cidade">Cidade *</Label>
                        <Input
                          id="cidade"
                          type="text"
                          placeholder="Digite sua cidade"
                          value={formData.cidade}
                          onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Culturas */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      Principais Culturas
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {culturas.map(cultura => (
                        <div key={cultura} className="flex items-center space-x-2">
                          <Checkbox
                            id={cultura}
                            checked={formData.principaisCulturas.includes(cultura)}
                            onCheckedChange={(checked) => handleCulturaChange(cultura, checked as boolean)}
                            className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label htmlFor={cultura} className="text-sm text-gray-700 cursor-pointer">
                            {cultura}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Termos */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="termos"
                        checked={formData.aceitaTermos}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, aceitaTermos: checked as boolean }))}
                        className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1"
                      />
                      <Label htmlFor="termos" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                        Aceito os <Link to="#" className="text-green-600 hover:underline">termos de uso</Link> e 
                        a <Link to="#" className="text-green-600 hover:underline">política de privacidade</Link> do AgroPredict *
                      </Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-lg rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Criar Conta
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Benefícios */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Vantagens Exclusivas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  'Acesso completo ao dashboard',
                  'Previsões ilimitadas',
                  'Alertas personalizados',
                  'Relatórios detalhados',
                  'Suporte especializado',
                  'Análises de mercado'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Precisa de Ajuda?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Nossa equipe está pronta para ajudar você a começar.
                </p>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  Falar com Especialista
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
