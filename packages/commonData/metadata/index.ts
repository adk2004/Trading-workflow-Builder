export const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"]
export type TradingMetadata = {
    type: "LONG" | "SHORT";
    qty: number;
    symbol: "SOL" | "BTC" | "ETH"
}
export type PriceTriggerData = {
    asset: string;
    price: number;
}
export type TimerData = {
    time: number;
}