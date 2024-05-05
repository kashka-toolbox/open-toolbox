import { CommandAndNavigationCommand } from "@/components/ui/CommandAndNavigationCommand";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">{t('title')}</h1>
        <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi dicta deleniti ad quasi, totam sunt unde labore inventore officiis sequi blanditiis optio soluta distinctio alias explicabo quibusdam qui sit nobis.
        </span>
      </section>
      <section className="mx-auto flex max-w-[600px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <CommandAndNavigationCommand />
      </section>
    </>
  );
}
