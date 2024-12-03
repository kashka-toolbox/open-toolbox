'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Position, useHandleConnections, useNodesData } from "@xyflow/react";
import { ReactNode, useEffect } from "react";
import { DataTypeCheckingHandle } from "./DataTypeCheckingHandle";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function TargetHandle<T>({ id, label, onChange, typeDescription, className, dataType, error }:
    {
        id: string,
        label: string,
        onChange: (value: T) => void,
        typeDescription: ReactNode,
        className?: string,
        dataType: string,
        error?: string,
    }) {
    const connections = useHandleConnections({
        type: 'target',
        id,
    });

    const nodeData = useNodesData(connections?.[0]?.source);

    useEffect(() => {
        onChange((nodeData?.data ? nodeData.data.value : undefined) as any as T);
    }, [nodeData]);

    return (
        <div className='relative'>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <DataTypeCheckingHandle
                        type="target"
                        position={Position.Left}
                        id={id}
                        className={cn(`handle !-left-3`, className)}
                        datatype={dataType}
                    />
                </HoverCardTrigger>
                <HoverCardContent>
                    {typeDescription}
                </HoverCardContent>
            </HoverCard>

            <label htmlFor="red" className="label">
                {label}
            </label>
            {
                error && <Alert variant={"destructive"}>
                    <ExclamationTriangleIcon />
                    <AlertTitle></AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            }
        </div>
    );
}