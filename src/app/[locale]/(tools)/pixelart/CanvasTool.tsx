
export abstract class CanvasTool {
    public name: string;

    private previewCanvas?: OffscreenCanvas;
    private previewToArtwork?: Function;

    constructor(name: string) {
        this.name = name;
    }

    onSelect(previewCanvas: OffscreenCanvas, previewToArtwork: Function): void {
        this.previewCanvas = previewCanvas;
        this.previewToArtwork = previewToArtwork;

        console.log("Tool selected: " + this.name);
    }

    abstract onArtworkClick(x: number, y: number, mouseEvent: MouseEvent): void;
    abstract onMouseMove(artworkX: number, artworkY: number, mouseEvent: MouseEvent): void;
}