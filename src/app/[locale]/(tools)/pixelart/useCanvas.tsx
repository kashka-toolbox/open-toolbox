'use client';
import { RefObject, useEffect, useRef, useState } from "react";
import { PixelArtToolPen } from "./tools/PixelArtToolPen";
import { CanvasTool } from "./CanvasTool";

interface CanvasOptions {
    zoomScrollFactor?: number;

    pauseRenderOnFocusLoss?: boolean;
}

const getPixel = (imageData: ImageData, x: number, y: number) => {
    const offset = (y * imageData.width + x) * 4;
    return {
        r: imageData.data[offset],
        g: imageData.data[offset + 1],
        b: imageData.data[offset + 2],
        a: imageData.data[offset + 3]
    }
}

const setPixel = (imageData: ImageData, x: number, y: number, color: { r: number, g: number, b: number, a: number }) => {
    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset] = color.r;
    imageData.data[offset + 1] = color.g;
    imageData.data[offset + 2] = color.b;
    imageData.data[offset + 3] = color.a;
}

export function useCanvas(canvasRef: RefObject<HTMLCanvasElement>, options?: CanvasOptions) {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [artworkCanvas, setArtworkCanvas] = useState<OffscreenCanvas | null>(null);
    const [artworkPreviewCanvas, setArtworkPreviewCanvas] = useState<OffscreenCanvas | null>(null);

    const [zoom, setZoom] = useState(2); // 1 is height fits canvas
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);

    const [mouseDown, setMouseDown] = useState(false);
    const [middleMouseDown, setMiddleMouseDown] = useState(false);

    const frameRequestRef = useRef<number>(-1);

    const tools = {
        pen: new PixelArtToolPen()
    }

    const [selectedTool, setSelectedTool] = useState<CanvasTool | null>(null);

    const selectTool = (name: keyof typeof tools | "none") => {
        setSelectedTool((oldTool) => {
            if (name === "none") {
                return null;
            }

            return tools[name];
        });
    }

    const getArtworkContext = () => {
        return artworkCanvas?.getContext("2d");
    }

    const getArtworkPreviewAContext = () => {
        return artworkPreviewCanvas?.getContext("2d");
    }


    useEffect(() => {
        console.log("selected tool changed");

        if (selectTool === null) {
            setArtworkPreviewCanvas(null);
            return;
        }

        if (!artworkCanvas || !selectedTool)
            return;

        // create preview canvas
        const previewCanvas = new OffscreenCanvas(artworkCanvas!.width, artworkCanvas!.height);
        setArtworkPreviewCanvas(previewCanvas);

        // copy artwork to preview
        const previewContext = previewCanvas.getContext("2d");
        if (!previewContext)
            throw new Error("Could not get context of preview canvas");
        const artworkContext = artworkCanvas!.getContext("2d");
        if (!artworkContext)
            throw new Error("Could not get context of artwork canvas");

        const resetPreviewToArtwork = () => {
            previewContext.drawImage(artworkCanvas!, 0, 0);
        }

        resetPreviewToArtwork();

        // select tool and pass preview canvas
        selectedTool.onSelect(artworkCanvas!, previewContext!, previewToArtwork, resetPreviewToArtwork);
    }, [selectedTool]);

    const previewToArtwork = () => {
        if (!artworkPreviewCanvas)
            return;
        const previewContext = getArtworkPreviewAContext();
        if (!previewContext)
            throw new Error("Could not get context of preview canvas");
        const artworkContext = getArtworkContext();
        if (!artworkContext)
            throw new Error("Could not get context of artwork canvas");

        artworkContext.drawImage(artworkPreviewCanvas, 0, 0);

        setArtworkPreviewCanvas(null);
    }



    const newArtwork = (width = 16, height = 16) => {
        const newArtworkCanvas = new OffscreenCanvas(width, height);
        setArtworkCanvas(newArtworkCanvas);
        setZoom(1);
        setPanX(0);
        setPanY(0);

        const newArtworkContext = newArtworkCanvas.getContext("2d");
        if (!newArtworkContext)
            throw new Error("Could not get context of new artwork canvas");
        newArtworkContext.fillStyle = "#red";
        newArtworkContext.fillRect(0, 0, width, height);
        //draw gradient
        const gradient = newArtworkContext.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "blue");
        newArtworkContext.fillStyle = gradient;
        newArtworkContext.fillRect(0, 0, width, height);
    };

    useEffect(() => { // correct dom size of canvas & zoomBasis
        if (!canvasRef.current)
            return;

        const resizeObserver = new ResizeObserver(() => {
            if (!canvasRef.current)
                return;
            const rect = canvasRef.current.getBoundingClientRect();
            canvasRef.current.width = rect.width;
            canvasRef.current.height = rect.height;
        });
        resizeObserver.observe(canvasRef.current);
        return () => resizeObserver.disconnect();
    }, [canvasRef.current?.width, canvasRef.current?.height]);

    const onMouseDown = (e: MouseEvent) => {
        if (e.button === 1) {
            setMiddleMouseDown(true);
        }

        if (e.button === 0) {
            setMouseDown(true);
        }
    }
    const onMouseUp = (e: MouseEvent) => {
        if (e.button === 1) {
            setMiddleMouseDown(false);
        }

        if (e.button === 0) {
            setMouseDown(false);
        }
    }

    const onMouseMove = (e: MouseEvent) => {
        if (middleMouseDown) {
            setPanX((oldPanX) => oldPanX + e.movementX);
            setPanY((oldPanY) => oldPanY + e.movementY);
        }

        if (!selectedTool || !canvas || !artworkCanvas)
            return;

        // context.strokeRect(panX, panY, artworkWidth * zoomBasis * zoom, artworkHeight * zoomBasis * zoom);
        // propagate mouse move to tool

        const canvasHeight = canvas.height;
        const artworkHeight = artworkCanvas.height;
        const zoomBasis = canvasHeight / artworkHeight;
        
        const positionOnArtworkX = Math.floor(artworkCanvas.width * (e.offsetX - panX) / (artworkCanvas.width * zoom * zoomBasis));
        const positionOnArtworkY = Math.floor(artworkCanvas.height * (e.offsetY - panY) / (artworkCanvas.height * zoom * zoomBasis));

        console.log({
            offsetX: e.offsetX,
            offsetY: e.offsetY,
            positionOnArtworkX,
            positionOnArtworkY,
            panX,
            panY,
            zoomBasis,
        });

        selectedTool.onMouseMove(positionOnArtworkX, positionOnArtworkY, e);
    };

    const onScroll = (e: WheelEvent) => {
        setZoom((oldZoom) => Math.max(0.1,
            Math.min(25,
                oldZoom + e.deltaY * (options?.zoomScrollFactor ?? 0.02)
            )));

        e.preventDefault();
    }

    useEffect(() => {
        if (!canvasRef.current)
            return;
        setCanvas(canvasRef.current);
        setContext(canvasRef.current.getContext("2d"));

        canvasRef.current.addEventListener("wheel", onScroll);
        canvasRef.current.addEventListener("mousedown", onMouseDown);
        canvasRef.current.addEventListener("mouseleave", onMouseUp);
        canvasRef.current.addEventListener("mouseup", onMouseUp);

        return () => { // unsubscribe events
            if (!canvasRef.current)
                return;

            canvasRef.current.removeEventListener("wheel", onScroll);
            canvasRef.current.removeEventListener("mousedown", onMouseDown);
            canvasRef.current.removeEventListener("mouseup", onMouseUp);
        };
    }, [canvasRef.current]);

    useEffect(() => {
        if (!canvasRef.current)
            return;
        canvasRef.current.addEventListener("mousemove", onMouseMove);

        return () => { // unsubscribe events
            if (!canvasRef.current)
                return;
            canvasRef.current.removeEventListener("mousemove", onMouseMove);
        }
    }, [canvasRef.current, mouseDown, middleMouseDown, zoom, panX, panY]);


    /**
     * Renders the canvas every change.
     */
    useEffect(() => {
        frameRequestRef.current = requestAnimationFrame(renderCanvas);

        const onFocusLoss = () => {
            console.log("Pausing render loop due to focus loss");
            cancelAnimationFrame(frameRequestRef.current);
        }

        const onFucusGain = () => {
            console.log("Resuming render loop due to focus gain");
            frameRequestRef.current = requestAnimationFrame(renderCanvas);
        }

        if(options?.pauseRenderOnFocusLoss ?? true) {
            // Stop on unfocus
            window.addEventListener('blur', onFocusLoss, false);

            // Start again on focus
            window.addEventListener('focus', onFucusGain, false);
        }

        return () => {
            cancelAnimationFrame(frameRequestRef.current);
            window.removeEventListener('blur', onFocusLoss);
            window.removeEventListener('focus', onFucusGain);
        };
    }); // Make sure no dependencies are passed here! We want to run this effect every time, so the render loop has the latest state.

    const renderCanvas = () => {
        frameRequestRef.current = requestAnimationFrame(renderCanvas);

        if (!canvas || !context)
            return;


        context.clearRect(0, 0, canvas.width, canvas.height);

        if (!artworkCanvas)
            return;

        const artworkContext = artworkCanvas.getContext("2d");
        if (!artworkContext)
            throw new Error("Could not get artwork context");

        /**
         * DOM size
         */
        const canvasHeight = canvas.height;
        /**
         * DOM size
         */
        const canvasWidth = canvas.width;

        /**
         * Artwork size
         */
        const artworkHeight = artworkCanvas.height;
        /**
         * Artwork size
         */
        const artworkWidth = artworkCanvas.width;

        /**
         * Zoom basis means -> imageData height fits canvas height
         */
        const zoomBasis = canvasHeight / artworkHeight;

        // draw background
        context.fillStyle = "#f0f0f0";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        //draw artwork
        context.imageSmoothingEnabled = false;
        let canvasToDraw = artworkCanvas;
        if (artworkPreviewCanvas !== null) {
            canvasToDraw = artworkPreviewCanvas;
        }

        context.drawImage(canvasToDraw, panX, panY, artworkWidth * zoomBasis * zoom, artworkHeight * zoomBasis * zoom);
        context.imageSmoothingEnabled = true;

        // draw border arround artwork
        context.strokeStyle = "#ffffff";
        context.lineWidth = 2;
        context.strokeRect(panX, panY, artworkWidth * zoomBasis * zoom, artworkHeight * zoomBasis * zoom);
    }

    return { zoom, setZoom, panX, setPanX, panY, setPanY, mouseDown, middleMouseDown, newArtwork, hasPreview: !!artworkPreviewCanvas, selectedTool, selectTool };
}