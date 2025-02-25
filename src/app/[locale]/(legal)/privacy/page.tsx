import KashkaMarkdown from '@/components/ui/kashka-markdown';

export default function Home() {
  let markdown = "# Nothing found"

  if (typeof process.env["kashkaPrivacyNotice"] === "string")
      markdown = process.env["kashkaPrivacyNotice"]

  return (
      <section className="flex flex-col gap-4">
          <KashkaMarkdown>{markdown}</KashkaMarkdown>
      </section>
  );
}
