import { useCallback, useState } from "react";
import { TypeLabelNumber } from "../ui/TypeLabel";
import { TargetHandle } from "./TargetHandle";

export function TargetHandleNumber({ id, label, onChange }: { id: string, label: string, onChange: (value: number) => void }) {
    const [error, setError] = useState<string | undefined>(undefined);

    let wrappedOnChange = useCallback((value: number) => {
        if (isNaN(value)) {
            setError('Value is not a number');
            return;
        }

        setError(undefined);
        onChange(value)
    }, [onChange]);

    return <TargetHandle
        id={`number-${id}`}
        label={label}
        onChange={wrappedOnChange}
        typeDescription={<div>Needs a <TypeLabelNumber />-Input </div>}
        className="!bg-type-number !border-type-number-foreground"
        dataType='number'
        error={error} />
}