import { Input } from "@/components/ui/input";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { SourceHandle } from "../handles/SourceHandle";

export function ColorInput({ id, data }: { id: string, data: { label?: string, value: string } }) {
    const { updateNodeData } = useReactFlow();

    useEffect(() => {
        if (data.label == undefined)
            updateNodeData(id, { label: 'flow.input.color' });
    }, []);

    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData(id, { value: evt.target.value });
    }, []);

    return (
        <div className="bg-background text-foreground flex flex-col gap-2 p-3 border-1 rounded-md">
            <div>{data.label}</div>
            <Input
                id={`color-${id}`}
                name="color"
                type="color"
                onChange={onChange}
                className="nodrag"
                value={data.value}
            />
            <SourceHandle id={`source-handle-color-${id}`} label='Output' typeDescription={<div>Test</div>} dataType='color' className='!bg-type-color !border-type-color-foreground' />
        </div>
    );
}