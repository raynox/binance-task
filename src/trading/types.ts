export interface TradingGateway {
  fetchMarketData(): Promise<MarketData[]>;
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
