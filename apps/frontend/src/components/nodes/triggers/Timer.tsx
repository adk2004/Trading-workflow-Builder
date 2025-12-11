import { Handle, Position } from "@xyflow/react";

export type TimerData = {
    time: number;
}

export function Timer({data, isConnectable}: {data:{metadata: TimerData},isConnectable: boolean}) {
    return (
        <div className="p-4 bg-linear-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="font-bold text-green-900 text-sm mb-2">Timer Trigger</div>
            <div className="text-xs text-green-800 bg-green-200 px-2 py-1 rounded inline-block">
                Every {data.metadata.time} seconds
            </div>
            <Handle type="source" position={Position.Right}>
            </Handle>
        </div>
    )
}