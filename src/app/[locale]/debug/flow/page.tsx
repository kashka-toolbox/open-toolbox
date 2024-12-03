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
        position: { x: 250, y: 0 },
    },
    {
        type: 'ColorPreview',
        id: 'color',
        position: { x: 250, y: 160 },
        data: { label: 'Color' },
    }
];
const initialEdges = [
    {
        id: '1-color',
        source: '1',
        target: 'color',
        targetHandle: 'number-red',
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

export default function FlowPage() {
    return (
        <ReactFlowProvider>
            <FlowAsForm flowStore={debugFlowStore} />
            <br />
            <Card className='overflow-hidden'>
                <CardContent className='p-0'>
                    <Flow flowStore={debugFlowStore} />
                </CardContent>
            </Card>
        </ReactFlowProvider>
    );
}


function FlowAsForm({ flowStore }: { flowStore: FlowStore }) {
    const flowState = flowStore();

    const inputs = flowState.nodes.filter((node) => Object.keys(inputNodes).includes(node.type ?? ""));
    const outputs = flowState.nodes.filter((node) => Object.keys(outputNodes).includes(node.type ?? ""));

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
        className='min-h-96'
        proOptions={{ hideAttribution: true }}>
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} />
    </ReactFlow>
    </>
}



