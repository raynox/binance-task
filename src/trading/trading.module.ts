import { Module } from '@nestjs/common';
import { TradingController } from './trading.controller';
import { HttpModule } from '@nestjs/axios';
import { BinanceTradingGateway } from './binance-trading.gateway';
import { BinanceTradingAnalysisService } from './binance-trading.service';

@Module({
  imports: [HttpModule],
  controllers: [TradingController],
  providers: [BinanceTradingGateway, BinanceTradingAnalysisService],
})
export class TradingModule {}
