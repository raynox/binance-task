import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MarketDataResponse, TradingGateway } from './types';

@Injectable()
export class BinanceTradingGateway implements TradingGateway {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchMarketData(startTimestamp: number, endTimestamp: number) {
    const response = await this.httpService.axiosRef.get<MarketDataResponse>(
      `${this.configService.get('BINANCE_URL')}/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=10&startTime=${startTimestamp}&endTime=${endTimestamp}`,
    );

    return response.data;
  }
}
