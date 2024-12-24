'use client';
import { ColorInput } from "@/components/flow/nodes/ColorInput";
import { ColorPreview } from "@/components/flow/nodes/ColorPreview";
import { NumberDelay } from "@/components/flow/nodes/NumberDelay";
import { NumberInput } from "@/components/flow/nodes/NumberInput";

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