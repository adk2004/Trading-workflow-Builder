import { Handle, Position } from "@xyflow/react";

export type PriceTriggerData = {
    asset: string;
    price: number;
}

export function PriceTrigger({data, isConnectable}: {data:{metadata: PriceTriggerData},isConnectable: boolean}) {
    return (
        <div className="p-4 bg-linear-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="font-bold text-orange-900 text-sm mb-2">Price Trigger</div>
            <div className="space-y-1 text-xs text-orange-800">
                <div className="flex items-center gap-2"><span className="font-semibold">Asset:</span> <span className="bg-orange-200 px-2 py-1 rounded">{data.metadata.asset}</span></div>
                <div className="flex items-center gap-2"><span className="font-semibold">Price:</span> <span className="bg-orange-200 px-2 py-1 rounded">${data.metadata.price}</span></div>
            </div>
            <Handle type="source" position={Position.Right}>
            </Handle>
        </div>
    )
}