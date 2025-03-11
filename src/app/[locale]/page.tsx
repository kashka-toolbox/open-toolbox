import { CommandAndNavigationCommand } from "@/components/ui/CommandAndNavigationCommand";
import { Section } from "@/components/ui/Section";
import { Link } from "@/navigation";
import { BoxIcon, GitHubLogoIcon, LaptopIcon } from "@radix-ui/react-icons";
import { useTranslations } from 'next-intl';

import { ReactNode } from 'react';

function MarqueeItem({ children }: { children: ReactNode }) {
  return (
    <h2
      aria-hidden="true"
      className="text-2xl md:text-4xl font-black tracking-normal scroll-m-20 text-nowrap uppercase ml-4 mr-4 transition-colors cursor-default p-4 pl-6 pr-6 rounded-2xl border border-primary-foreground hover:border-primary hover:text-primary">
      {children}
    </h2>
  );
}

export default function Home() {
  const t = useTranslations('home');

  return (
    <>
      <div className="container pl-1 pr-1 md:pl-4 md:pr-4 pb-12 min-h-[calc(100vh-256px)]">
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">{t('title')}</h1>
          <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi dicta deleniti ad quasi, totam sunt unde labore inventore officiis sequi blanditiis optio soluta distinctio alias explicabo quibusdam qui sit nobis.
          </span>
        </section>
        <section className="mx-auto flex max-w-[600px] min-h-48 flex-col items-center gap-2 py-8 md:my-12 md:mb-8 lg:my-24 lg:mb-20 relative">
          <CommandAndNavigationCommand className="absolute left-0 right-0 h-min" />
        </section>
      </div>

      <section className="h-[74px] w-screen overflow-clip mb-8 md:mb-16">
        <span className="relative">
          <span className="absolute float-left left-0 w-[150vw] overflow-clip">
            <span className="flex animate-marquee-slow w-[max-content]">
              <span className="flex w-[max-content]">
                <MarqueeItem>Zero Ads</MarqueeItem>
                <MarqueeItem>Zero tracking</MarqueeItem>
                <MarqueeItem>Zero Analytics</MarqueeItem>
                <MarqueeItem>Zero costs</MarqueeItem>
              </span>
              <span className="flex w-[max-content]">
                <MarqueeItem>Zero Ads</MarqueeItem>
                <MarqueeItem>Zero tracking</MarqueeItem>
                <MarqueeItem>Zero Analytics</MarqueeItem>
                <MarqueeItem>Zero costs</MarqueeItem>
              </span>
              <span className="flex w-[max-content]">
                <MarqueeItem>Zero Ads</MarqueeItem>
                <MarqueeItem>Zero tracking</MarqueeItem>
                <MarqueeItem>Zero Analytics</MarqueeItem>
                <MarqueeItem>Zero costs</MarqueeItem>
              </span>
              <span className="flex w-[max-content]">
                <MarqueeItem>Zero Ads</MarqueeItem>
                <MarqueeItem>Zero tracking</MarqueeItem>
                <MarqueeItem>Zero Analytics</MarqueeItem>
                <MarqueeItem>Zero costs</MarqueeItem>
              </span>
            </span>
          </span>
        </span>
      </section>

      <Section className="container mb-16" variant={"ghost"}>
        <h1 className="header-section-1">
          <span className="text-primary">100%</span> Client Side Computing
        </h1>
        <p className="text-base">
          Every input you provide is processed on your device. No data is sent to any server, except encrypted configuration data, if you choose to save it.
        </p>
      </Section>

      <Section className="container mb-16" variant={"ghost"}>
        <h1 className="header-section-1 flex flex-row items-center gap-4">
          <span><span className="text-primary">Forever</span> open source</span> <GitHubLogoIcon className="inline-block h-8 w-8" />
        </h1>
        <p className="text-base">
          All the source code is available on <Link href={"#"}>GitHub</Link>. This project is free for non-commercial use. See the <Link href={"#"}>license</Link> for more information.
        </p>
      </Section>



    </>
  );
}
