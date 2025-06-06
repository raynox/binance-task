import { IsDateString } from 'class-validator';

export interface TradingGateway {
  fetchMarketData(
    startTimestamp: number,
    endTimestamp: number,
  ): Promise<MarketData[]>;
}

export type MarketDataResponse = Array<MarketData>;
export type MarketData = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];

export class AnalyzeDataDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsDateString()
  startDate: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsDateString()
  endDate: string;
}
