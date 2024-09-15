import { CanvasTool } from "../CanvasTool";

export class PixelArtToolPen extends CanvasTool {
    constructor() {
        super("Pen");
    }

    onArtworkClick(x: number, y: number, mouseEvent: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    onMouseMove(artworkX: number, artworkY: number, mouseEvent: MouseEvent): void {
        console.log(artworkX, artworkY);
        
    }
}