import { Handle, Position } from "@xyflow/react";

export type TradingMetadata = {
    type: "LONG" | "SHORT";
    qty : number;
    symbol: "SOL" | "BTC" | "ETH"
}


export function Lighter({data}: {
    data: {
        metadata: TradingMetadata
    }
}){
    return (
        <div className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="font-bold text-blue-900 text-sm mb-3">Lighter Trade</div>
            <div className="space-y-2 text-xs text-blue-800">
                <div className="flex items-center gap-2"><span className="font-semibold">Type:</span> <span className="bg-blue-200 px-2 py-1 rounded">{data.metadata.type}</span></div>
                <div className="flex items-center gap-2"><span className="font-semibold">Qty:</span> <span className="bg-blue-200 px-2 py-1 rounded">{data.metadata.qty}</span></div>
                <div className="flex items-center gap-2"><span className="font-semibold">Asset:</span> <span className="bg-blue-200 px-2 py-1 rounded">{data.metadata.symbol}</span></div>
            </div>
            <Handle type="source" position={Position.Right}>
            </Handle>
            <Handle type="target" position={Position.Left}>
            </Handle>
        </div>
    )
}