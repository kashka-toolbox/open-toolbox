import { CommandAndNavigationCommand } from "@/components/ui/CommandAndNavigationCommand";

export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">The Ultimate Toolbox</h1>
        <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Powerfull. Fast. Reliable. The best set of tools at your fingertips. Designed for developers, by developers using beautiful and modern design.
        </span>
      </section>
      <section className="mx-auto flex max-w-[600px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <CommandAndNavigationCommand />
      </section>
      <section>
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </section>
    </>
  );
}
