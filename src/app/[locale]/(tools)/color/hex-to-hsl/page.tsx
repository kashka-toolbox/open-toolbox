"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { CopyToClipboard } from "@/components/ui/copyToClipboard";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";

export default function URLEncoding() {
    const t = useTranslations("tools.color.hexToHsl");

    const [input, setInput] = useState<string>("#123456");
    const [output, setOutput] = useState<string>("");
    const [valuesOnly, setValuesOnly] = useState<boolean>(false);

    useEffect(() => {
        try {
            setOutput(
                hexToCssHsl(input.toLowerCase().trim(), !valuesOnly)
                    .replaceAll(",", ", ")
            );
        } catch (e) {
            setOutput(e as string);
        }
    }, [input, valuesOnly]);

    return <div className="flex flex-col gap-4 lg:gap-8 pt-2">
        <Section variant={"primary"}>
            <h1 className="header-section-1 mb-6">{t("title")}</h1>
            <span className="flex flex-col md:flex-row gap-4 items-center">
                <Input value={input} onChange={(e) => setInput(e.currentTarget.value)} placeholder="#448487" />
                <span className="flex flex-row items-center gap-2 w-full">
                    <Input value={output} className="transition-colors duration-500" readOnly style={{
                        borderColor: input,
                    }} />
                    <CopyToClipboard clipboardContent={output} className="mt-[1px]" />
                </span>
            </span>

            <Separator orientation="horizontal" className="my-4" />

            <div className="flex flex-row flex-wrap gap-2 lg:gap-4">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="valuesOnly"
                        checked={valuesOnly}
                        onCheckedChange={(value) => setValuesOnly(value === true)} />
                    <label
                        htmlFor="valuesOnly"
                        className="peer-disabled:cursor-not-allowed hover:cursor-pointer"
                    >
                        {t("options.valuesOnly")}
                    </label>
                </div>
            </div>
        </Section>
    </div>
}

function hexToCssHsl(hex: string, valuesOnly = false) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result || result.length !== 4) throw "Failed to parse hex";

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    let cssString = "";
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    cssString = h + "," + s + "%," + l + "%";
    cssString = !valuesOnly ? "hsl(" + cssString + ")" : cssString;

    return cssString;
}