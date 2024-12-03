import { cn } from "@/lib/utils";

export function TypeLabel({ className, children }: { className: string, children: ReactNode }) {
    return (
        <span className={cn("text-sm py-[2px] px-1 rounded-sm", className)}>
            {children}
        </span>
    );
}

export function TypeLabelNumber() { // TODO: translate!
    return <TypeLabel className='bg-type-number text-type-number-foreground'>
        Number
    </TypeLabel>;
}