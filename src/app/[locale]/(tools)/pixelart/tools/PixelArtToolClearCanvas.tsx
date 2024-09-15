'use client';
import { EraserIcon } from "@radix-ui/react-icons";
import { CanvasTool } from "../CanvasTool";

export class PixelArtToolClearCanvas extends CanvasTool {
    constructor() {
        super("Clear Canvas", <EraserIcon />);
    }

    drawPreview(): void {
        throw new Error("Method not implemented.");
    }
    draw(): void {
        throw new Error("Method not implemented.");
    }
}