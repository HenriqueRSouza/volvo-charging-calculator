/**
 * Azure Function para buscar veículos competidores via Supabase
 * 
 * Esta função atua como proxy, protegendo as credenciais do Supabase
 */

module.exports = async function (context, req) {
  context.log('HTTP trigger function processed a request.');

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    const tableName = process.env.SUPABASE_TABLE_NAME || 'inmetro_database';

    // Validar se as variáveis de ambiente estão configuradas
    if (!supabaseUrl || !supabaseKey) {
      context.log.error('Credenciais do Supabase não configuradas');
      
      context.res = {
        status: 500,
        body: {
          error: 'Configuração do servidor não encontrada'
        },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      };
      return;
    }

    context.log(`Buscando dados da tabela: ${tableName}`);
    context.log(`URL: ${supabaseUrl}`);

    // Construir URL da API do Supabase
    const url = `${supabaseUrl}/rest/v1/${tableName}?select=*`;
    
    // Fazer requisição ao Supabase
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      context.log.error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
      
      context.res = {
        status: response.status,
        body: {
          error: `Erro ao buscar dados: ${response.statusText}`
        },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      };
      return;
    }

    const data = await response.json();
    context.log(`Dados recuperados: ${data.length} registros`);

    // Retornar dados com CORS habilitado
    context.res = {
      status: 200,
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };

  } catch (error) {
    context.log.error('Erro na função:', error);
    
    context.res = {
      status: 500,
      body: {
        error: 'Erro interno do servidor',
        message: error.message
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }
};

