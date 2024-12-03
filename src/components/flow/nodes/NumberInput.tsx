'use client';
import { Input } from "@/components/ui/input";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { SourceHandleNumber } from "../handles/SourceHandleNumber";

export function NumberInput({ id, data }: { id: string; data: { label: string, value: number, min: number, max: number } }) {
    const { updateNodeData } = useReactFlow();    

    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const cappedNumber = Math.min(data.max, Math.max(data.min, +evt.target.value));
        updateNodeData(id, { value: cappedNumber });
    }, [updateNodeData, data, id]);

    return ( // TODO add min/max input
        <div className="bg-background text-foreground flex flex-col gap-2 p-3 border-1 rounded-md">
            <div>{data.label}</div>
            <Input
                id={`number-${id}`}
                name="number"
                type="number"
                min="0"
                max="255"
                onChange={onChange}
                className="nodrag"
                value={data.value}
            />
            <SourceHandleNumber id={`source-handle-number-${id}`} label='Output' />
        </div>
    );
}