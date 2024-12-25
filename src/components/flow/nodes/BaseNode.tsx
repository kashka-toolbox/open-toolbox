'use client';

import { FlowStoreContext } from "@/app/[locale]/debug/flow/page";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";


export function BaseNode({ id, label, children, options }:
    { id: string; label: string; children?: React.ReactNode; options?: {
        processingLabel?: string;
    } }) {
    const flowStore = useContext(FlowStoreContext);

    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!flowStore) return;
        if (flowStore.getState().isNodeProcessing(id)) setIsProcessing(true);

        const unsubscribe = flowStore.subscribe(() => {
            setIsProcessing(flowStore.getState().isNodeProcessing(id));
        });

        return () => {
            unsubscribe();
        };
    }, [flowStore]);

    return ( // TODO add min/max input
        <div className={cn("bg-background text-foreground flex flex-col gap-2 p-3 border-1 rounded-md",
            isProcessing ? "border-primary border" : ""
        )}>
            <h4>{label}</h4>
            {
                isProcessing && <div className="text-sm text-muted-foreground">{options?.processingLabel ?? "Processing..."}</div>
            }
            {children}
        </div>
    );
}
