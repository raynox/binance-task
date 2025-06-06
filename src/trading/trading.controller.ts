import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AnalyzeDataDto,
  TradingAnalysisService,
  TradingGateway,
} from './types';
import { BinanceTradingGateway } from './binance-trading.gateway';
import * as moment from 'moment';
import { BinanceTradingAnalysisService } from './binance-trading.service';

@Controller('trading')
export class TradingController {
  constructor(
    @Inject(BinanceTradingAnalysisService)
    private readonly tradingService: TradingAnalysisService,
    @Inject(BinanceTradingGateway)
    private readonly tradingGateway: TradingGateway,
  ) {}

  @Post('analyze')
  @UsePipes(new ValidationPipe({ transform: true }))
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
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }
}
