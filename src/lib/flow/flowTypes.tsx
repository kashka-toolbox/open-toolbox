'use client';
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "@xyflow/react";

export type AppNode = Node;
export type FlowState = {
    nodes: AppNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateNodeData: (id: string, data: Partial<AppNode['data']>) => void;
};
