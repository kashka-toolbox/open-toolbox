'use client';
import { SourceHandle } from "./SourceHandle";

export function SourceHandleNumber ({ id, label, }: { id: string, label: string }) {
    return SourceHandle({
        id,
        label,
        typeDescription: <div>Number</div>,
        className: "!bg-type-number !border-type-number-foreground",
        dataType: 'number',
    });
}