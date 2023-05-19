import * as express from 'express';
import * as client from 'prom-client';
import { generateSampleData, updateMetrics, PurchaseEvent } from './businessLogic';

// Create a prom-client Histogram
const purchaseHistogram = new client.Histogram({
  name: 'purchase_time',
  help: 'Histogram of purchase times',
  buckets: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
});

// Create a prom-client Counter for purchases
const purchaseCounter = new client.Counter({
  name: 'total_purchases',
  help: 'Total number of purchases'
});

const app = express();

app.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const sampleData = generateSampleData(Number(process.env.NUM_EVENTS || 1));
    await updateMetrics(sampleData, purchaseHistogram, purchaseCounter);
    res.send('Histogram and counter updated');
  } catch (error) {
    console.error('Failed to update metrics:', error);
    res.status(500).send('Failed to update metrics');
  }
});

// Expose metrics endpoint for Prometheus
app.get('/metrics', async (req: express.Request, res: express.Response) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    console.error('Failed to get metrics:', error);
    res.status(500).send('Failed to get metrics');
  }
});

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).send('OK');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
