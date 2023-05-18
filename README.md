# Projeto Histograma

Este projeto é um exemplo simples de como criar e visualizar um histograma usando o pacote Node.js `prom-client` para coletar métricas de eventos de compra simulados.

## Pré-requisitos

Você precisará do Node.js e npm instalados em sua máquina para rodar este projeto. Você pode baixá-los [aqui](https://nodejs.org/).

## Instalação

Primeiro, clone este repositório para sua máquina local usando `git clone`.

Depois de clonar o repositório, instale as dependências do projeto com:

```bash
npm install
```

## Uso

Para iniciar o servidor, use o seguinte comando:

```bash
tsc server.ts
node server.js
```

O servidor estará rodando na porta 3000. Para atualizar o histograma, você pode enviar uma requisição GET para `http://localhost:3000/`. Para visualizar as métricas do Prometheus, você pode enviar uma requisição GET para `http://localhost:3000/metrics`.

## Docker

Este projeto também inclui um `Dockerfile` para rodar o aplicativo em um contêiner Docker. Você pode construir a imagem do Docker com:

```bash
docker build -t histograma .
```

E pode rodar o contêiner com:

```bash
docker run -p 3000:3000 -d histograma
```

## Implantando com Helm

Assumindo que você já tem um cluster Kubernetes e o Helm instalado:

Execute
```bash
helm install histograma -f ./Helm/Histograma/values.yaml ./Helm/Histograma
```

Você precisará substituir os comandos acima com detalhes específicos baseados em como seu gráfico do Helm está configurado e onde ele está hospedado.

## Prometheus e Grafana

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm install prometheus prometheus-community/kube-prometheus-stack --version 45.28.1 -f ./Helm/prometheus-grafana.yaml
```

