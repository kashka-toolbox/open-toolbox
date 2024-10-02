'use client';
import { Section } from "@/components/ui/Section";
import { useEffect, useRef, useState } from "react";
import { useCanvas } from "./useCanvas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Pixelart() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [width, setWidth] = useState(16);
    const [height, setHeight] = useState(16);

    const canvas = useCanvas(canvasRef, {
        zoomScrollFactor: 0.002,
        pauseRenderOnFocusLoss: true,
    });

    useEffect(() => {
        canvas.newArtwork(width, height);
    }, [width, height]);

    useEffect(() => {
        canvas.newArtwork(width, height);
        console.log("new artwork");
    }, []);


    return (
        <div className="flex flex-col gap-4 lg:gap-8 pt-2">
            <Section className="bg-white h-[40vh] !p-0">
                <canvas ref={canvasRef} className="w-full h-full rounded" />
            </Section>
            <Section>
                <h3 className="header-section-3">Help</h3>
                <p>
                    Middle mouse button to pan {/* TODO: Add icons for this */}
                </p>
            </Section>
            <Section>
                <h2 className="header-section-2">Canvas options</h2>
                <label htmlFor="canvasHeight">Height:</label>
                <Input id="canvasHeight" type="number" onChange={e => setHeight(+e.currentTarget.value)} value={height} />
                <label htmlFor="canvasWidth">Width:</label>
                <Input id="canvasWidth" type="number" onChange={e => setWidth(+e.currentTarget.value)} value={width} />
            </Section>
            <Section>
                <h2 className="header-section-2">Info</h2>
                <p>Zoom: {canvas.zoom}</p>
                <p>PanX: {canvas.panX}</p>
                <p>PanY: {canvas.panY}</p>
                <p>Mouse down: {canvas.mouseDown ? "true" : "false"}</p>
                <p>Middle Mouse down: {canvas.middleMouseDown ? "true" : "false"}</p>
                <p>Has Preview: {canvas.hasPreview ? "true": "false"}</p>

                <p>Tool: {canvas.selectedTool ? canvas.selectedTool.name : "none"}</p>
                <Button onClick={() => canvas.selectTool("pen")}>pen</Button>
                <Button onClick={() => canvas.selectTool("none")}>unselect</Button>
            </Section>
        </div>
    )
}