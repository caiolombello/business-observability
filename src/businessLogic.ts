import * as client from 'prom-client';

// Define a interface para um evento de compra
export interface EventoCompra {
  idCliente: number;
  tempoCompra: number;
}

// Função para gerar dados de exemplo
export function geraDadosExemplo(numEventos: number): EventoCompra[] {
  const dadosExemplo: EventoCompra[] = [];
  for(let i = 0; i < numEventos; i++) {
    dadosExemplo.push({
      idCliente: i,
      // Gera um tempo de compra aleatório entre 60 e 1200 segundos (1 a 20 minutos)
      tempoCompra: Math.floor(Math.random() * (1200 - 60 + 1)) + 60
    });
  }
  return dadosExemplo;
}

// Função para atualizar as métricas com os dados de exemplo
export async function atualizaMetricas(dadosExemplo: EventoCompra[], histogramaCompra: client.Histogram<string>, contadorCompras: client.Counter<string>) {
  for(let evento of dadosExemplo) {
    histogramaCompra.observe(evento.tempoCompra); // Observa o tempo de compra no histograma
    contadorCompras.inc(); // Incrementa o contador de compras
  }
}
