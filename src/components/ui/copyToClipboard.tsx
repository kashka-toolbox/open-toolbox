import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"; // Assuming you're using Heroicons
import * as React from "react";
import { Button } from "./button";

interface CopyToClipboardBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  clipboardContent: string;
  asChild?: boolean;
}

const CopyToClipboard = React.forwardRef<HTMLButtonElement, CopyToClipboardBtnProps>(
  ({ className, clipboardContent, asChild = false, ...props }, ref) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(clipboardContent).then(() => {
        console.log("Copied to clipboard!");
        setShowSuccess(true);
      }).catch(err => {
        // TODO: Toast error message
        console.error("Failed to copy: ", err);
      });
    };

    return (
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handleCopy}
        className={cn("h-6 w-6", className)}
        onMouseLeave={() => setShowSuccess(false)}
        onPointerLeave={() => setShowSuccess(false)}
        ref={ref}
        {...props}>
        <CheckIcon className={`absolute h-4 w-4 opacity-${showSuccess ? 1 : 0} transition-opacity`} />
        <CopyIcon className={`h-4 w-4 opacity-${showSuccess ? 0 : 1} transition-opacity`} />
      </Button>
    );
  }
);

CopyToClipboard.displayName = "CopyToClipboardBtn";

export { CopyToClipboard };
