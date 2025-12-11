import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger,} from '@/components/nodes/triggers/PriceTrigger';
import { Timer, } from '@/components/nodes/triggers/Timer';
import { Lighter,} from '@/components/nodes/actions/Lighter';
import { ActionSheet } from './ActionSheet';
import { HyperLiquid } from '@/components/nodes/actions/HyperLiquid';
import { Backpack } from '@/components/nodes/actions/Backpack';
import type { PriceTriggerData, TimerData, TradingMetadata } from 'commondata/types';


export type NodeKind = "priceTrigger" | "timeTrigger" | "hyperliquid" | "backpack" | "lighter" | "email" ;
export type NodeMetaData = PriceTriggerData | TimerData | TradingMetadata
const nodeTypes = {
    "priceTrigger": PriceTrigger,
    "timeTrigger": Timer,
    "lighter": Lighter,
    "hyperliquid": HyperLiquid,
    "backpack": Backpack
};

interface NodeType {
    id: string;
    type: NodeKind;
    data: {
        kind: "trigger" | "action";
        metadata: NodeMetaData; 
    }
    position: { x: number; y: number; };
    
}

interface Edge {
    id : string;
    source: string;
    target: string;
}

export function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectAction, setSelectAction] = useState<{
    position : {
      x: number
      y: number
    },
    startingNodeId: string
  } | null
  >(null);
  const [open, setOpen] = useState<boolean>(false);
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
    },
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  const onConnectEnd = useCallback(
    (params: any, connectionInfo) => {
      if(!connectionInfo.isValid){
        setSelectAction({
          startingNodeId: connectionInfo.fromNode.id,
          position: connectionInfo.from
        })
      }
      setOpen(true);
    },[]
  )
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {
        !nodes.length && 
        <TriggerSheet onSelect={(type, metadata) => {
            const newNode: NodeType = {
                id: Math.random().toString(),
                type,
                data: {
                    kind: "trigger",
                    metadata
                },
                position: { x: 250, y: 5 },
            };
            setNodes([...nodes, newNode]);
        }}/>
      }
      <ActionSheet open={open} setOpen={setOpen} onSelect={(type, metadata) => {
        const nodeId = Math.random().toString();
        const newNode: NodeType = {
            id:  nodeId,
            type,
            data: {
                kind: "action",
                metadata
            },
            position: selectAction.position,
        };
        setNodes([...nodes, newNode]);
        const newEdge: Edge = {
          id: Math.random().toString(),
          source : selectAction.startingNodeId,
          target: nodeId,
        }
        setEdges([...edges, newEdge]);
        setSelectAction(null);
        setOpen(false);
        }
      }/>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}