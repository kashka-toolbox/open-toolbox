'use client';

import { AppNode, FlowState } from "@/lib/flow/flowTypes";
import { addEdge, applyEdgeChanges, applyNodeChanges, Edge, EdgeChange, Node, NodeChange } from "@xyflow/react";
import { create, StoreApi, UseBoundStore } from "zustand";

export type FlowStore = UseBoundStore<StoreApi<FlowState>>;

export function createFlow(initialNodes: AppNode[], initialEdges: Edge[]): FlowStore {
    console.log('NEW STORE');
    
    return create<FlowState>((set, get) => ({
        nodes: initialNodes,
        edges: initialEdges,
        get processingNodes() {
            return get().nodes.filter((node) => node.processingSince !== undefined);
        },
        onNodesChange: (changes: NodeChange<Node>[]) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },
        onEdgesChange: (changes: EdgeChange<Edge>[]) => {
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },
        onConnect: (connection: any) => {
            set({
                edges: addEdge(connection, get().edges),
            });
        },
        setNodes: (nodes) => {
            set({ nodes });
        },
        setEdges: (edges) => {
            set({ edges });
        },
        updateNodeData(id, data) {
            set({
                nodes: get().nodes.map((node) => {
                    if (node.id === id) {
                        // it's important to create a new object here, to inform React Flow about the changes
                        return { ...node, data: { ...node.data, ...data } };
                    }

                    return node;
                }),
            });
        },
        setNodeProcessing(id, processing) {
            set({
                nodes: get().nodes.map((node) => {
                    if (node.id !== id) {
                        return node;
                    }

                    if(processing) {
                        return { ...node, processingSince: Date.now() };
                    } else {
                        delete node.processingSince;
                        return { ...node };
                    }
                }),
            });
        },
        isNodeProcessing(id) {
            return get().nodes.some((node) => node.id === id && node.processingSince !== undefined);
        },
    }));
}
