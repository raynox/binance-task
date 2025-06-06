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
  startDate: string;
  endDate: string;
}
