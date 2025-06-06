import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { TradingService } from './trading.service';
import { TradingGateway } from './types';
import { BinanceTradingGateway } from './binance-trading.gateway';

@Controller('trading')
export class TradingController {
  constructor(
    private readonly tradingService: TradingService,
    @Inject(BinanceTradingGateway)
    private readonly tradingGateway: TradingGateway,
  ) {}

  @Post('analyze')
  async analyzeTrading() {
    try {
      const marketData = await this.tradingGateway.fetchMarketData();
      const analysis = this.tradingService.analyzeTrading(marketData);

      return analysis;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }
}
