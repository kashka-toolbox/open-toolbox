'use client';
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { HoverCard } from "@radix-ui/react-hover-card";
import { DataTypeCheckingHandle } from "./DataTypeCheckingHandle";
import { cn } from "@/lib/utils";
import { Position } from "@xyflow/react";
import { ReactNode } from "react";

export function SourceHandle({ id, label, typeDescription, className, dataType }: { id: string, label: string, typeDescription: ReactNode, className?: string, dataType: string }) {
    return (
        <div className='relative'>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <DataTypeCheckingHandle
                        type="source"
                        position={Position.Right}
                        id={id}
                        className={cn(`handle !-right-3`, className)}
                        datatype={dataType}
                    />
                </HoverCardTrigger>
                <HoverCardContent>
                    {typeDescription}
                </HoverCardContent>
            </HoverCard>

            <label htmlFor="red" className="block text-right w-full">
                {label}
            </label>
        </div>
    );
}