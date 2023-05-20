import * as express from 'express';
import * as client from 'prom-client';
import { geraDadosExemplo, atualizaMetricas, EventoCompra } from './businessLogic';

// Cria um Histograma do prom-client
const histogramaCompra = new client.Histogram({
  name: 'tempo_compra',
  help: 'Histograma dos tempos de compra',
  buckets: [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200] // Intervalos para 1 a 20 minutos, em segundos
});

// Cria um Contador do prom-client para as compras
const contadorCompras = new client.Counter({
  name: 'total_compras',
  help: 'Número total de compras'
});

const app = express();

// Rota para atualizar o histograma e o contador
app.get('/', async (req: express.Request, res: express.Response) => {
  try {
    // Gera dados de exemplo baseado na variável de ambiente NUM_EVENTS ou 1 se não definida
    const dadosExemplo = geraDadosExemplo(Number(process.env.NUM_EVENTS || 1));
    // Atualiza as métricas com os dados gerados
    await atualizaMetricas(dadosExemplo, histogramaCompra, contadorCompras);
    res.send('Histograma e contador atualizados');
  } catch (error) {
    console.error('Falha ao atualizar métricas:', error);
    res.status(500).send('Falha ao atualizar métricas');
  }
});

// Rota para expor as métricas para o Prometheus
app.get('/metrics', async (req: express.Request, res: express.Response) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    console.error('Falha ao obter métricas:', error);
    res.status(500).send('Falha ao obter métricas');
  }
});

// Rota para verificação de saúde da aplicação
app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).send('OK');
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
