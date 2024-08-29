"use client"
import { Section } from "@/components/ui/Section";
import { TranslationTable, TranslationTableItem } from "@/components/ui/translationTable";
import { useTranslations } from 'next-intl';
import { urlEncodingTranslationTableData } from "./translationTableData";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function URLEncoding() {
  const t = useTranslations("tools.encoding.url");

  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleModeChange = () => {
    setInput(output);
    setMode((prev) => prev === "encode" ? "decode" : "encode");
  }

  useEffect(() => {
    if (mode === "encode") {
      setOutput(
        encodeURIComponent(input)
        .replaceAll("~", "%7E")
        .replaceAll("!", "%21")
        .replaceAll("'", "%27")
        .replaceAll("(", "%28")
        .replaceAll(")", "%29")
        .replaceAll("*", "%2A")
      );
    } else {
      setOutput(
        decodeURIComponent(input)
        .replaceAll("%7E", "~")
        .replaceAll("%21", "!")
        .replaceAll("%27", "'")
        .replaceAll("%28", "(")
        .replaceAll("%29", ")")
        .replaceAll("%2A", "*")
      );
    }
  }, [mode, input]);

  return <div className="flex flex-col gap-4 lg:gap-8 pt-2">
    <Section variant={"primary"}>
      <h1 className="header-section-1 mb-6">{t("title")}</h1>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex flex-col w-full">
          <Label className="w-full pl-1 pr-1 pb-2" htmlFor="input">Input:</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="input"
            className="min-h-24 lg:min-h-48" ></Textarea>
        </div>

        <Button variant={"outline"} className="min-w-9" size={"icon"} onClick={handleModeChange}><UpdateIcon className="h-4 w-4" /></Button>

        <div className="flex flex-col w-full">
          <Label className="w-full pl-1 pr-1 pb-2" htmlFor="input">{mode == "encode" ? t('encoded') : t('decoded')}:</Label>
          <Textarea
            value={output}
            id="input"
            className="min-h-24 lg:min-h-48"
            readOnly={true}></Textarea>
        </div>
      </div>
    </Section>
    <Section variant={"hoverFading"}>
      <h1 className="header-section-2">{t("title")}</h1>
      <p>
        {t("description")}
      </p>

      <h2 className="header-section-3">{t("howItWorks.title")}</h2>
      <ul className="ps-4 mt-0 space-y-1 list-disc list-none [&>*]:before:content-['→'] [&>*]:before:pr-4">
        {t.rich("howItWorks.description")}
      </ul>
    </Section>
    <Section variant={"hoverFading"}>
      <h2 className="header-section-3 mb-4">{t("lookup.title")}</h2>
      <TranslationTable className="auto-fill-20">
        {Object.entries(urlEncodingTranslationTableData).map(([untranslated, translated]) => (
          <TranslationTableItem key={untranslated} untranslated={untranslated} translated={translated} />
        ))}
      </TranslationTable>
    </Section>
  </div>
}