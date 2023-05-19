import * as client from 'prom-client';

export interface PurchaseEvent {
  customerId: number;
  timeToPurchase: number;
}

export function generateSampleData(numEvents: number): PurchaseEvent[] {
  const sampleData: PurchaseEvent[] = [];
  for(let i = 0; i < numEvents; i++) {
    sampleData.push({
      customerId: i,
      timeToPurchase: Math.floor(Math.random() * 60)
    });
  }
  return sampleData;
}

export async function updateMetrics(sampleData: PurchaseEvent[], purchaseHistogram: client.Histogram<string>, purchaseCounter: client.Counter<string>) {
  for(let event of sampleData) {
    purchaseHistogram.observe(event.timeToPurchase);
    purchaseCounter.inc(); // increment the purchase counter
  }
}
