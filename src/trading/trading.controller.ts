import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { TradingService } from './trading.service';
import { AnalyzeDataDto, TradingGateway } from './types';
import { BinanceTradingGateway } from './binance-trading.gateway';
import * as moment from 'moment';

@Controller('trading')
export class TradingController {
  constructor(
    private readonly tradingService: TradingService,
    @Inject(BinanceTradingGateway)
    private readonly tradingGateway: TradingGateway,
  ) {}

  @Post('analyze')
  async analyzeTrading(@Body() analyzeDataDto: AnalyzeDataDto) {
    try {
      const startTimestamp = parseInt(
        `${moment(analyzeDataDto.startDate).unix()}000`,
      );

      const endTimestamp = parseInt(
        `${moment(analyzeDataDto.endDate).unix()}000`,
      );

      const marketData = await this.tradingGateway.fetchMarketData(
        startTimestamp,
        endTimestamp,
      );

      const analysis = this.tradingService.analyzeTrading(marketData);

      return analysis;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }
}
