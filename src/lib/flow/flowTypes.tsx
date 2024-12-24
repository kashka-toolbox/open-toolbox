'use client';
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "@xyflow/react";

export type AppNode = Node & {
    processingSince?: number;
};
export type FlowState = {
    nodes: AppNode[];
    edges: Edge[];
    readonly processingNodes: readonly AppNode[];
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateNodeData: (id: string, data: Partial<AppNode['data']>) => void;
    setNodeProcessing: (id: string, processing: boolean) => void;
    isNodeProcessing: (id: string) => boolean;
};
