'use client';
import { Handle, HandleProps } from "@xyflow/react";

export function DataTypeCheckingHandle(props: HandleProps) {
    return <Handle isValidConnection={
        (connection) => {
            console.log(connection, props.datatype);
            if (connection.targetHandle == null) return false;
            if (props.datatype == null) return false;

            return connection.targetHandle.includes(props.datatype);
        }
    } {...props} />;
}