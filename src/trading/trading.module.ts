import { Module } from '@nestjs/common';
import { TradingController } from './trading.controller';
import { HttpModule } from '@nestjs/axios';
import { TradingService } from './trading.service';
import { BinanceTradingGateway } from './binance-trading.gateway';

@Module({
  imports: [HttpModule],
  controllers: [TradingController],
  providers: [TradingService, BinanceTradingGateway],
})
export class TradingModule {}
