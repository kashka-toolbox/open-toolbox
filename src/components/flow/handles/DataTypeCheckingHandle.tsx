'use client';
import { Connection, Handle, HandleProps, IsValidConnection } from "@xyflow/react";
import { use, useCallback } from "react";

export function DataTypeCheckingHandle(props: HandleProps) {
    const isValidConnection: IsValidConnection = useCallback((connection) => {
        if (connection.targetHandle == null) return false;
        if (props.datatype == null) return false;

        return connection.targetHandle.includes(props.datatype);
    }, [props.datatype]);

    return <Handle isValidConnection={isValidConnection} {...props} />;
}