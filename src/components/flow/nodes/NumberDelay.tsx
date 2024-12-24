'use client';
import { useReactFlow } from "@xyflow/react";
import { useCallback, useContext, useEffect } from "react";
import { SourceHandleNumber } from "../handles/SourceHandleNumber";
import { TargetHandleNumber } from "../handles/TargetHandleNumber";
import { FlowStoreContext } from "@/app/[locale]/debug/flow/page";
import { BaseNode } from "./BaseNode";

/**
 * 
 * Handles:
 * - Input: number-delay
 * - Input: number-value
 * - Output: number-out
 */
export function NumberDelay({ id, data }: { id: string; data: { label: string, delay: number } }) {
    const { updateNodeData } = useReactFlow();    
    const flowStore = useContext(FlowStoreContext);

    const onChangeDelay = useCallback((delay: number) => {
        updateNodeData(id, { delay });
    }, [updateNodeData, id]);

    useEffect(() => {
        console.log("Store Update??");
    }, [flowStore]);

    const onChange = useCallback((value: number) => { // todo proccess change after block is resolved
        (async () => {
            if(!flowStore) return;
            if(flowStore.getState().isNodeProcessing(id)) return;
            
            flowStore.getState().setNodeProcessing(id, true);
            await timeout(data.delay);
            updateNodeData(id, { value });
            flowStore.getState().setNodeProcessing(id, false);
        })();
    }, [updateNodeData, flowStore, data, id]);

    return ( // TODO add min/max input
        <BaseNode id={id} label={data.label}>
            <TargetHandleNumber id={`value`} label='Value' onChange={onChange} />
            <TargetHandleNumber id={`delay`} label='Delay' onChange={onChangeDelay} />
            <SourceHandleNumber id={`number-out`} label='Value' />
        </BaseNode>
    );
}

const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));