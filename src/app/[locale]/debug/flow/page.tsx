'use client';

import {
    Background,
    BackgroundVariant,
    Controls,
    ReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { inputNodes, nodeTypes, outputNodes } from '@/lib/flow/FlowNodes';
import { createFlow, FlowStore } from '@/lib/flow/createFlow';
import { Label } from '@radix-ui/react-dropdown-menu';
import '@xyflow/react/dist/style.css';
import { createContext, useEffect, useState } from 'react';
import { AppNode } from '@/lib/flow/FlowTypes';

const initialNodes = [
    {
        type: 'NumberInput',
        id: '1',
        data: { label: 'Number Input', value: 255, min: 0, max: 255 },
        position: { x: 0, y: 0 },
    },
    {
        type: 'NumberInput',
        id: '2',
        data: { label: 'Number Input', value: 0, min: 0, max: 255 },
        position: { x: 0, y: 130 },
    },
    {
        type: 'NumberInput',
        id: '3',
        data: { label: 'Number Input', value: 115, min: 0, max: 255 },
        position: { x: 0, y: 260 },
    },
    {
        type: 'ColorInput',
        id: '4',
        data: { label: 'Color Input', value: "#000000" },
        position: { x: 500, y: 0 },
    },
    {
        type: 'ColorPreview',
        id: 'color',
        position: { x: 500, y: 160 },
        data: { label: 'Color' },
    },
    {
        type: 'NumberDelay',
        id: 'delay-1',
        data: { label: 'Number Delay', delay: 1000 },
        position: { x: 220, y: 0 },
    }
];
const initialEdges = [
    {
        id: 'delay-color-1',
        source: 'delay-1',
        target: 'color',
        targetHandle: 'number-red',
    },
    {
        id: 'input-delay-1',
        source: '1',
        target: 'delay-1',
        targetHandle: 'number-value',
    },
    {
        id: '2-color',
        source: '2',
        target: 'color',
        targetHandle: 'number-green',
    },
    {
        id: '3-color',
        source: '3',
        target: 'color',
        targetHandle: 'number-blue',
    }
];

const debugFlowStore = createFlow(initialNodes, initialEdges);
export const FlowStoreContext = createContext<null | FlowStore>(null);

export default function FlowPage() {
    return (
        <FlowStoreContext.Provider value={debugFlowStore}>
            <ReactFlowProvider>
                <FlowAsForm flowStore={debugFlowStore} />
                <br />
                <Card className='overflow-hidden'>
                    <CardContent className='p-0'>
                        <Flow flowStore={debugFlowStore} />
                    </CardContent>
                </Card>
            </ReactFlowProvider>
        </FlowStoreContext.Provider>
    );
}


function FlowAsForm({ flowStore }: { flowStore: FlowStore }) {
    const flowState = flowStore();

    const [inputs, setInputNodes] = useState<AppNode[]>([]);
    const [outputs, setOutputNodes] = useState<AppNode[]>([]);

    useEffect(() => {        
        const unsubscribe = flowStore.subscribe((state) => {
            setInputNodes(state.nodes.filter((node) => Object.keys(inputNodes).includes(node.type ?? "")));
            setOutputNodes(state.nodes.filter((node) => Object.keys(outputNodes).includes(node.type ?? "")));
        });

        return () => {
            unsubscribe();
        };
    }, [flowStore]);

    return <div>
        Input nodes
        <div>
            {inputs.map((node) => {
                if (node.type === 'NumberInput') return <div key={node.id + ".div"}>
                    <Label id={"FlowAsForm." + node.id}>{node.data.label as string}</Label>
                    <Input type='number' value={node.data.value as number} onChange={(e) => {
                        console.log(node.id, { value: e.target.value });
                        flowState.updateNodeData(node.id, { value: e.target.value })
                    }} />
                </div>;
                if (node.type === 'ColorInput') return <div key={node.id + ".div"}>
                    <Label id={"FlowAsForm." + node.id}>{node.data.label as string}</Label>
                    <Input type='color' value={node.data.value as string} onChange={(e) => flowState.updateNodeData(node.id, { value: e.target.value })} />
                </div>
            })}
        </div>

        Output nodes
        <div>
            {outputs.map((node) => {
                return node.id;
            })}
        </div>
    </div>
}

function Flow({ flowStore }: { flowStore: FlowStore }) {
    const flowState = flowStore();

    return <><ReactFlow
        nodeTypes={nodeTypes}
        nodes={flowState.nodes}
        edges={flowState.edges}
        onNodesChange={flowState.onNodesChange}
        onEdgesChange={flowState.onEdgesChange}
        onConnect={flowState.onConnect}
        colorMode='dark'
        className='min-h-[36rem]'
        proOptions={{ hideAttribution: true }}>
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} />
    </ReactFlow>
    </>
}



