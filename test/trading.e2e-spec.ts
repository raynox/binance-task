import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TradingGateway } from '../src/trading/types';
import { AppModule } from '../src/app.module';
import { BinanceTradingGateway } from '../src/trading/binance-trading.gateway';
import { mockedTradingData } from './mocked-trading-data';

describe('Cats', () => {
  let app: INestApplication;
  const mockedBinanceTradingGateway: TradingGateway = {
    fetchMarketData: () => Promise.resolve(mockedTradingData),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BinanceTradingGateway)
      .useValue(mockedBinanceTradingGateway)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .post('/trading/analyze')
      .expect(201)
      .expect({
        maxPriceAnalysis:
          'The highest price in date range: 2025-06-06T09:38:00+02:00 - 2025-06-06T09:47:59+02:00 is 103155.79',
        lowPriceAnalysis:
          'The lowest price in date range: 2025-06-06T09:38:00+02:00 - 2025-06-06T09:47:59+02:00 is 103144.43',
        priceChange:
          'The price change in date range: 2025-06-06T09:38:00+02:00 - 2025-06-06T09:47:59+02:00: -69.67',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
