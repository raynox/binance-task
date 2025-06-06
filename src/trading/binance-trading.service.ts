import { Injectable } from '@nestjs/common';
import { MarketData, TradingAnalysisService } from './types';
import Decimal from 'decimal.js';
import * as moment from 'moment';

@Injectable()
export class BinanceTradingAnalysisService implements TradingAnalysisService {
  analyzeTrading(marketData: MarketData[]) {
    if (marketData.length <= 3) {
      throw new Error('Not enough data to analyze');
    }

    const firstTrading = marketData[0];
    const lastTrading = marketData[marketData.length - 1];

    const mappedMarketData = marketData.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [openTime, openPrice, highPrice, lowPrice] = item;

      return {
        highPrice,
        lowPrice,
      };
    });

    const startDate = moment(firstTrading[0]);
    const endDate = moment(lastTrading[6]);

    const maxPrice = Math.max(
      ...mappedMarketData.map((item) => new Decimal(item.highPrice).toNumber()),
    );

    const lowPrice = Math.max(
      ...mappedMarketData.map((item) => new Decimal(item.lowPrice).toNumber()),
    );

    const priceChange = new Decimal(firstTrading[1])
      .minus(lastTrading[4])
      .toNumber();

    const prices = marketData.map((item) => new Decimal(item[1]).toNumber());
    const sorted = [...prices].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 !== 0
        ? sorted[middle]
        : sorted[middle - 1] + sorted[middle] / 2;

    return {
      maxPriceAnalysis: `The highest price in date range: ${startDate.format()} - ${endDate.format()} is ${maxPrice}`,
      lowPriceAnalysis: `The lowest price in date range: ${startDate.format()} - ${endDate.format()} is ${lowPrice}`,
      priceChange: `The price change in date range: ${startDate.format()} - ${endDate.format()}: ${priceChange}`,
      median: `The price median in date range: ${startDate.format()} - ${endDate.format()}: ${median}`,
    };
  }
}
