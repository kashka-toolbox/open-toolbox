'use client';
import { ColorInput } from "@/components/flow/nodes/ColorInput";
import { ColorPreview } from "@/components/flow/nodes/ColorPreview";
import { NumberDelay } from "@/components/flow/nodes/NumberDelay";
import { NumberInput } from "@/components/flow/nodes/NumberInput";
import { CommitIcon, EnterIcon } from "@radix-ui/react-icons";
import { NodeTag, NodeTypeMetaData } from "./FlowTypes";

export const inputNodes = {
    NumberInput,
    ColorInput
};

export const processingNodes = {
    ColorPreview,
    NumberDelay
};

export const outputNodes = {
};

export const nodeTypes = {
    ...inputNodes,
    ...processingNodes,
    ...outputNodes
};

export type NodeTypes = keyof typeof nodeTypes;

export const nodeTypeMetaData: Record<NodeTypes, NodeTypeMetaData> = {
    NumberInput: {
        label: 'Number Input',
        icon: <EnterIcon />,
        tags: new Set<NodeTag>(['input'])
    },
    ColorInput: {
        label: 'Color Input',
        icon: <EnterIcon />,
        tags: new Set<NodeTag>(['input'])
    },
    ColorPreview: {
        label: 'Color Preview',
        icon: <CommitIcon />,
        tags: new Set<NodeTag>(['processing'])
    },
    NumberDelay: {
        label: 'Number Delay',
        icon: <CommitIcon />,
        tags: new Set<NodeTag>(['processing', 'async'])
    }
};