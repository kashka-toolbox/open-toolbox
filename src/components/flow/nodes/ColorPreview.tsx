'use client';
import { useReactFlow } from "@xyflow/react";
import { TargetHandleNumber } from "../handles/TargetHandleNumber";
import { SourceHandle } from "../handles/SourceHandle";

export function ColorPreview({ id, data }: { id: string, data: { value: { r: number, g: number, b: number } } }) {
    const { updateNodeData } = useReactFlow();

    return (
        <div
            className="text-foreground flex flex-col gap-2 p-3 border-1 rounded-md"
            style={{
                background: data.value
                    ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})`
                    : 'rgb(0, 0, 0)',
            }}
        >
            <TargetHandleNumber
                id="red"
                label="Red"
                onChange={(value) => {
                    updateNodeData(id, (node) => {
                        return { value: { ...node.data.value as Object, r: value } };
                    });
                }}
            />
            <TargetHandleNumber
                id="green"
                label="Green"
                onChange={(value) => {
                    updateNodeData(id, (node) => {
                        return { value: { ...node.data.value as Object, g: value } };
                    });
                }}
            />
            <TargetHandleNumber
                id="blue"
                label="Blue"
                onChange={(value) => {
                    updateNodeData(id, (node) => {
                        return { value: { ...node.data.value as Object, b: value } };
                    });
                }}
            />
            <SourceHandle id='color-out' dataType='color' label="ColorOut" typeDescription={<>Color</>} />
        </div>
    );
}
