"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { approximateLatexTextOutput } from "@/lib/text/approximateLatexTextOutput"
import { Metric } from "./Metric";
import { Section } from "@/components/ui/Section";

const metrics = [
  { label: "characters", regex: /./g },
  { label: "words", regex: /\b\w+\b/g },
  { label: "sentences", regex: /[.!?](?:$|\s)+/g },
];

export default function Home() {
  const [text, setText] = useState("");
  const [latex, setLatex] = useState(false);
  const [preprocessedText, setPreprocessedText] = useState("");

  useEffect(() => {
    setPreprocessedText(latex ? approximateLatexTextOutput(text) : text);
  }, [text, latex])

  return (
    <Section className="flex flex-col gap-4">
      <span className="flex flex-col gap-1">
        <Label htmlFor="wordcounter" className="font-semibold tracking-tight text-2xl">Enter your Text here:</Label>
        <Textarea
          id="wordcounter"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="min-h-32 hmd:min-h-64" />
      </span>
      <span className="flex flex-row justify-between min-h-16">
        {metrics.map((metric, index) => (
          [
            <Metric key={metric.label} label={metric.label} value={preprocessedText.match(metric.regex)?.length ?? 0} />,
            (index != metrics.length - 1) ? <Separator key={metric.label + "_seperator"} orientation="vertical" /> : null
          ]
        ))}
      </span>
      <Separator orientation="horizontal" />
      <span>
        <div className="items-top flex space-x-2 mt-2">
          <Checkbox id="latex"
            checked={latex}
            onCheckedChange={(checked) => setLatex(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="latex"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Approximate for latex
            </label>
            <p className="text-sm text-muted-foreground">
              This increases the accuracy of word counting in Latex documents.
            </p>
          </div>
        </div>
      </span>
    </Section>
  );
}

