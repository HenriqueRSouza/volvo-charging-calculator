export interface CompetitorVehicle {
  marca: string;
  modelo: string;
  kmLCidade: number;
  kmLEstrada: number;
  tipoCombustivel: string;
}

/**
 * Função para buscar dados de veículos competidores via backend Express
 * 
 * Esta função consome a API Express que atua como proxy seguro,
 * protegendo as credenciais do Supabase no backend.
 * 
 * Variáveis de ambiente esperadas:
 *  - VITE_API_BACKEND_URL: URL do backend Express (opcional)
 *  - Para desenvolvimento local: http://localhost:5000
 */
export async function fetchCompetitorVehicles(): Promise<CompetitorVehicle[]> {
  // Usar URL do backend Express ou variável de ambiente
  const backendUrl = 'https://icy-field-0a4fde21e.3.azurestaticapps.net';
  const apiUrl = `${backendUrl}/api/GetCompetitorVehicles`;

  try {
    console.log('🔗 Buscando dados da API backend...');
    console.log('URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Erro na resposta da API:', response.status, response.statusText);
      throw new Error(`Erro ao buscar dados (${response.status})`);
    }

    const data = await response.json();
    console.log('📦 Dados recebidos da API:', data);

    if (!Array.isArray(data)) {
      console.warn('⚠️ A resposta da API não é um array:', data);
      return [];
    }

    // Mapeia os dados retornados para o formato padrão
    const mappedData: CompetitorVehicle[] = data.map((vehicle: any) => ({
      marca: vehicle.marca || vehicle.Marca || vehicle.brand,
      modelo: vehicle.modelo || vehicle.Modelo || vehicle.model,
      kmLCidade: vehicle.km_l_cidade || vehicle.kmLCidade || vehicle.km_l_city || vehicle.city_km_l || vehicle.cidade,
      kmLEstrada: vehicle.km_l_estrada || vehicle.kmLEstrada || vehicle.km_l_highway || vehicle.highway_km_l || vehicle.estrada,
      tipoCombustivel: vehicle.tipo || vehicle.tipo_combustivel || vehicle.tipoCombustivel || vehicle.fuel_type || vehicle.combustivel,
    }));

    console.log('✅ Dados processados:', mappedData);
    return mappedData;
  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
    return [];
  }
}

/**
 * Função auxiliar para obter todos os veículos competidores.
 */
export async function getAllCompetitorVehicles(): Promise<CompetitorVehicle[]> {
  return await fetchCompetitorVehicles();
}
