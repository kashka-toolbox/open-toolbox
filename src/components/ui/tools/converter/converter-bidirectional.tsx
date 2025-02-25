import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Section } from "../../Section";
import { Label } from "../../label";
import { Textarea } from "../../textarea";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../../button";
import { UpdateIcon } from "@radix-ui/react-icons";

/**
 * @prop {children} React.ReactNode - add additional elements like options
 * @prop {dependencies} any[] - add the changing values that should trigger a re-render here
 */
interface ConverterBidirectionalProps {
  a2b: (input: string) => string;
  b2a: (input: string) => string;
  translationKey: string;
  children?: React.ReactNode;
  dependencies?: any[];
}

export const ConverterBidirectional: React.FC<ConverterBidirectionalProps> = ({
  a2b,
  b2a,
  translationKey,
  children,
  dependencies = []
}) => {
  const t = useTranslations("converterBidirectional");
  const t_parent = useTranslations(translationKey);

  const [mode, setMode] = useState<"a2b" | "b2a">("a2b");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleModeChange = () => {
    setInput(output);
    setMode((prev) => prev === "a2b" ? "b2a" : "a2b");
  }

  useEffect(() => {
    try {
      setOutput(mode === "a2b" ? a2b(input) : b2a(input));
    } catch (error: any) {
      setOutput("Error: " + error.message); // TODO: Error handling
    }
  }, [mode, input].concat(dependencies));

  return (<Section variant={"primary"}>
    <h1 className="header-section-1 mb-6">{mode === "a2b" ? t_parent("a2b_title") : t_parent("b2a_title")}</h1>
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex flex-col w-full">
        <Label className="w-full pl-1 pr-1 pb-2" htmlFor="input">{t("input")}</Label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="input"
          className="min-h-24 lg:min-h-48"></Textarea>
      </div>
      <div className="flex flex-col w-full">
        <Label className="w-full pl-1 pr-1 pb-2" htmlFor="input">{mode == "a2b" ? t_parent('a2b_result') : t_parent('b2a_result')}</Label>
        <Textarea
          value={output}
          id="input"
          className="min-h-24 lg:min-h-48"
          readOnly={true}></Textarea>
      </div>
    </div>
    <Separator orientation="horizontal" className="mt-4" />
    <div className="mt-4 flex flex-row flex-wrap gap-4 justify-between">
      <div className="flex flex-row flex-wrap gap-2 lg:gap-4">
        <Button variant={"default"} className="flex flex-row gap-2" onClick={handleModeChange}>
          <span>{t("swapSides")}</span>
          <UpdateIcon className="h-4 w-4" />
        </Button>
        <Button variant={"destructive"} onClick={() => setInput("")}>
          {t("clearInput")}
        </Button>
      </div>
      <div className="flex flex-row flex-wrap gap-2 lg:gap-4">
        {children}
      </div>
    </div>
  </Section>)
}