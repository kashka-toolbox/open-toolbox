'use client';
import { ColorInput } from "@/components/flow/nodes/ColorInput";
import { ColorPreview } from "@/components/flow/nodes/ColorPreview";
import { NumberInput } from "@/components/flow/nodes/NumberInput";

export const inputNodes = {
    NumberInput,
    ColorInput
};

export const processingNodes = {
    ColorPreview
};

export const outputNodes = {
};

export const nodeTypes = {
    ...inputNodes,
    ...processingNodes,
    ...outputNodes
};