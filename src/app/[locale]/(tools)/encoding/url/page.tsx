"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/Section";
import { Textarea } from "@/components/ui/textarea";
import { TranslationTable, TranslationTableItem } from "@/components/ui/translationTable";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";
import { urlEncodingTranslationTableData } from "./translationTableData";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { convertURL } from "./convertURL";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ConverterBidirectional } from "@/components/ui/tools/converter/converter-bidirectional";
import { ConverterCheckbox } from "@/components/ui/tools/converter/converter-checkbox";

export default function URLEncoding() {
  const t = useTranslations("tools.encoding.url");

  const [includeOptionalCharacters, setIncludeOptionalCharacters] = useState(false);
  const [encodeSpaceAsPlus, setEncodeSpaceAsPlus] = useState(false);

  return <div className="flex flex-col gap-4 lg:gap-8 pt-2">
    <ConverterBidirectional
      a2b={(input: string) => convertURL("encode", input, includeOptionalCharacters, encodeSpaceAsPlus)}
      b2a={(input: string) => convertURL("decode", input, includeOptionalCharacters, encodeSpaceAsPlus)}
      translationKey="tools.encoding.url"
      dependencies={[includeOptionalCharacters, encodeSpaceAsPlus]}>
      <ConverterCheckbox
        id="includeOptionalCharacters"
        checked={includeOptionalCharacters}
        onCheckedChange={(value) => setIncludeOptionalCharacters(value === true)}>
        Include <HoverCard>
          <HoverCardTrigger className="underline">optional characters</HoverCardTrigger>
          <HoverCardContent>
            <p>These characters are:<br /><code>~ ! ‘ ( ) *</code></p>
          </HoverCardContent>
        </HoverCard>
      </ConverterCheckbox>
      <ConverterCheckbox
        id="encodeSpaceAsPlus"
        checked={encodeSpaceAsPlus}
        onCheckedChange={(value) => setEncodeSpaceAsPlus(value === true)}>
        Encode space as +
      </ConverterCheckbox>
    </ConverterBidirectional>

    <Section variant={"ghost"}>
      <h2 className="header-section-2">{t("whatis")}</h2>
      <p>
        {t("description")}
      </p>

      <h3 className="header-section-3">{t("howItWorks.title")}</h3>
      <ul className="ps-4 mt-0 space-y-1 list-disc list-none [&>*]:before:content-['→'] [&>*]:before:pr-4">
        {t.rich("howItWorks.description")}
      </ul>
    </Section>
    <Section variant={"default"}>
      <h2 className="header-section-2">{t("lookup.title")}</h2>
      <div className="mb-4 text-muted-foreground">{t("lookup.description")}</div>
      <TranslationTable className="auto-fill-20">
        {Object.entries(urlEncodingTranslationTableData).map(([untranslated, translated]) => (
          <TranslationTableItem key={untranslated} untranslated={untranslated} translated={translated} />
        ))}
      </TranslationTable>
    </Section>
  </div>
}