
export abstract class CanvasTool {
    public name: string;

    protected previewCanvas?: OffscreenCanvas;
    protected prewviewContext?: OffscreenCanvasRenderingContext2D;
    protected previewToArtwork?: Function;
    protected resetPreviewToArtwork?: Function;
    //protected requestRender?: Function;

    constructor(name: string) {
        this.name = name;
    }

    onSelect(previewCanvas: OffscreenCanvas, previewContext: OffscreenCanvasRenderingContext2D, previewToArtwork: Function, resetPreviewToArtwork: Function): void {
        this.previewCanvas = previewCanvas;
        this.prewviewContext = previewContext;
        this.previewToArtwork = previewToArtwork;
        this.resetPreviewToArtwork = resetPreviewToArtwork

        console.log("Tool selected: " + this.name);
    }

    abstract onArtworkClick(x: number, y: number, mouseEvent: MouseEvent): void;
    abstract onMouseMove(artworkX: number, artworkY: number, mouseEvent: MouseEvent, leftMouseDown: boolean): void;
}