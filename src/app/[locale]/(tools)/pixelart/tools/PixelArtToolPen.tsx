import { CanvasTool } from "../CanvasTool";

export class PixelArtToolPen extends CanvasTool {
    constructor() {
        super("Pen");
    }

    onArtworkClick(x: number, y: number, mouseEvent: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    
    onMouseMove(artworkX: number, artworkY: number, mouseEvent: MouseEvent): void {
        if (!this.prewviewContext || !this.previewCanvas || !this.previewToArtwork || !this.resetPreviewToArtwork) {
            console.log("Tool not selected", {
                prewviewContext: this.prewviewContext,
                previewCanvas: this.previewCanvas,
                previewToArtwork: this.previewToArtwork,
                resetPreviewToArtwork: this.resetPreviewToArtwork,
            });
            return;
        }

        this.resetPreviewToArtwork();
        
        this.prewviewContext.fillStyle = "black";
        this.prewviewContext.fillRect(artworkX, artworkY, 1, 1);
    }
}