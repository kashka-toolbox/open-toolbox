'use client';
import { RefObject, use, useEffect, useState } from "react";
import { PixelArtToolPen } from "./tools/PixelArtToolPen";
import { CanvasTool } from "./CanvasTool";
import { set } from "react-hook-form";

interface CanvasOptions {
    zoomScrollFactor?: number;
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

    const tools = {
        pen: new PixelArtToolPen()
    }

    const [selectedTool, setSelectedTool] = useState<CanvasTool | null>(null);

    const selectTool = (name: keyof typeof tools) => {
        setSelectedTool((oldTool) => {
            return tools[name];
        });
    }

    useEffect(() => {
        console.log("selected tool changed");
        
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
        previewContext.drawImage(previewCanvas!, 0, 0);

        // select tool and pass preview canvas
        selectedTool.onSelect(artworkCanvas!, previewToArtwork);

        return () => {
            setArtworkPreviewCanvas(null);
        }
    }, [selectedTool]);

    const previewToArtwork = () => {
        if (!artworkPreviewCanvas)
            return;
        const previewContext = artworkPreviewCanvas.getContext("2d");
        if (!previewContext)
            throw new Error("Could not get context of preview canvas");
        const artworkContext = artworkCanvas?.getContext("2d");
        if (!artworkContext)
            throw new Error("Could not get context of artwork canvas");

        artworkContext.drawImage(artworkPreviewCanvas, 0, 0);

        setArtworkPreviewCanvas(null);
    }

    const getArtworkContext = () => {
        return artworkCanvas?.getContext("2d");
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

    const onMouseDown = () => setMouseDown(true);
    const onMouseUp = () => setMouseDown(false);

    const onMouseMove = (e: MouseEvent) => {
        if (mouseDown) {
            setPanX((oldPanX) => oldPanX + e.movementX);
            setPanY((oldPanY) => oldPanY + e.movementY);
        }

        if (!selectedTool)
            return;

        // propagate mouse move to tool
        const positionOnArtworkX = Math.floor((e.offsetX - panX) / (zoom * canvas!.width / artworkCanvas!.width));
        const positionOnArtworkY = Math.floor((e.offsetY - panY) / (zoom * canvas!.height / artworkCanvas!.height));

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
    }, [canvasRef.current, mouseDown]);



    useEffect(() => {
        renderCanvas();
    }, [zoom, panX, panY, mouseDown]);

    const renderCanvas = () => {
        if (!canvas || !context)
            return;

        console.log("rendering canvas");

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
         * Zoom basis means -> 1 = imageData height fits canvas height
         */
        const zoomBasis = canvasHeight / artworkHeight;
        console.log("zoomBasis", zoomBasis);
        

        // draw background
        context.fillStyle = "#f0f0f0";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        //draw artwork
        context.imageSmoothingEnabled = false;
        let canvasToDraw = artworkCanvas;
        if(artworkPreviewCanvas) {
            canvasToDraw = artworkPreviewCanvas;
        } 
        context.drawImage(canvasToDraw, panX , panY, artworkWidth * zoomBasis * zoom, artworkHeight * zoomBasis * zoom);
        context.imageSmoothingEnabled = true;

        // draw border arround artwork
        context.strokeStyle = "#ffffff";
        context.lineWidth = 2;
        context.strokeRect(panX, panY, artworkWidth * zoomBasis * zoom, artworkHeight * zoomBasis * zoom);

    }

    return { zoom, setZoom, panX, setPanX, panY, setPanY, mouseDown, newArtwork, hasPreview: !!artworkPreviewCanvas, selectedTool, selectTool };
}