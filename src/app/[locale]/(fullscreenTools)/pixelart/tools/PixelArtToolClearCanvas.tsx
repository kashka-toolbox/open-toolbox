'use client';
import { EraserIcon } from "@radix-ui/react-icons";
import { CanvasTool } from "../CanvasTool";

export class PixelArtToolClearCanvas extends CanvasTool {
    onArtworkClick(x: number, y: number, mouseEvent: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    onMouseMove(artworkX: number, artworkY: number, mouseEvent: MouseEvent, leftMouseDown: boolean): void {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super("Clear Canvas");
    }

    drawPreview(): void {
        throw new Error("Method not implemented.");
    }
    draw(): void {
        throw new Error("Method not implemented.");
    }
}