import { Handle, Position } from "@xyflow/react"
import type { TradingMetadata } from "commondata/types"

export function Backpack({data}: {
    data: {
        metadata: TradingMetadata
    }
}){
    return (
        <div className="p-4 bg-linear-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="font-bold text-amber-900 text-sm mb-3">Backpack Trade</div>
            <div className="space-y-2 text-xs text-amber-800">
                <div className="flex items-center gap-2"><span className="font-semibold">Type:</span> <span className="bg-amber-200 px-2 py-1 rounded">{data.metadata.type}</span></div>
                <div className="flex items-center gap-2"><span className="font-semibold">Qty:</span> <span className="bg-amber-200 px-2 py-1 rounded">{data.metadata.qty}</span></div>
                <div className="flex items-center gap-2"><span className="font-semibold">Asset:</span> <span className="bg-amber-200 px-2 py-1 rounded">{data.metadata.symbol}</span></div>
            </div>
            <Handle type="source" position={Position.Right}>
            </Handle>
            <Handle type="target" position={Position.Left}>
            </Handle>
        </div>
    )
}