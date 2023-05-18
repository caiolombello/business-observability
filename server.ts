import { Request, Response } from 'express';
import * as client from 'prom-client';
const express = require('express');

interface PurchaseEvent {
  customerId: number;
  timeToPurchase: number;
}

function generateSampleData(numEvents: number): PurchaseEvent[] {
  const sampleData: PurchaseEvent[] = [];
  for(let i = 0; i < numEvents; i++) {
    sampleData.push({
      customerId: i,
      timeToPurchase: Math.floor(Math.random() * 60)
    });
  }
  return sampleData;
}

// Create a prom-client Histogram
const purchaseHistogram = new client.Histogram({
  name: 'purchase_time',
  help: 'Histogram of purchase times',
  buckets: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
});

const app = express();

app.get('/', (req: Request, res: Response) => {
  const sampleData = generateSampleData(1000);
  for(let event of sampleData) {
    purchaseHistogram.observe(event.timeToPurchase);
  }
  res.send('Histogram updated');
});

// Expose metrics endpoint for Prometheus
app.get('/metrics', async (req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  }); 

app.listen(3000, () => console.log('Server is running on port 3000'));
