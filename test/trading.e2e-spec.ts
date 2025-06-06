import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TradingGateway } from '../src/trading/types';
import { AppModule } from '../src/app.module';
import { BinanceTradingGateway } from '../src/trading/binance-trading.gateway';
import { mockedTradingData } from './mocked-trading-data';

describe('Cats', () => {
  let app: INestApplication;
  const mockedFetchMarketData = jest.fn();
  const mockedBinanceTradingGateway: TradingGateway = {
    fetchMarketData: mockedFetchMarketData,
    // fetchMarketData: () => Promise.resolve(mockedTradingData),
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

  it(`/POST /analyze should analyze the trading data`, () => {
    mockedFetchMarketData.mockResolvedValue(mockedTradingData);

    return request(app.getHttpServer())
      .post('/trading/analyze')
      .send({
        startDate: '2025-05-01 12:00:00',
        endDate: '2025-06-03 12:00:00',
      })
      .expect(201)
      .expect({
        maxPriceAnalysis:
          'The highest price in date range: 2025-06-06T09:38:00+02:00 - 2025-06-06T09:47:59+02:00 is 103155.79',
        lowPriceAnalysis:
          'The lowest price in date range: 2025-06-06T09:38:00+02:00 - 2025-06-06T09:47:59+02:00 is 103060.46',
        priceChange:
          'The price change in date range: 2025-06-06T09:38:00+02:00 - 2025-06-06T09:47:59+02:00: -69.67',
        median:
          'The price median in date range: 2025-06-06T09:38:00+02:00 - 2025-06-06T09:47:59+02:00: 154660.475',
      });
  });

  it(`/POST /analyze should throw an error when there are not enough data to analyze`, () => {
    mockedFetchMarketData.mockResolvedValue([mockedTradingData[0]]);

    return request(app.getHttpServer())
      .post('/trading/analyze')
      .send({
        startDate: '2025-05-01 12:00:00',
        endDate: '2025-06-03 12:00:00',
      })
      .expect(409)
      .expect({
        statusCode: 409,
        message: 'Not enough data to analyze',
      });
  });

  it(`/POST /analyze should throw an error when dates are not given`, () => {
    mockedFetchMarketData.mockResolvedValue([mockedTradingData[0]]);

    return request(app.getHttpServer())
      .post('/trading/analyze')
      .expect(400)
      .expect({
        message: [
          'startDate must be a valid ISO 8601 date string',
          'endDate must be a valid ISO 8601 date string',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
