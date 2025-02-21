import { BlendingModeIcon, ExclamationTriangleIcon, GitHubLogoIcon, TextIcon } from "@radix-ui/react-icons";

interface Displayable {
  title: string;
  description?: string;
}

interface DisplayInMenuField {
  displayInMenu: boolean;
}

interface Navigable {
  href: string;
}

interface Icon {
  icon: React.ElementType;
}

interface CommandShortcut {
  shortcut: string;
}

interface OpenInNewTab {
  openInNewTab: boolean;
}

export const menuData: Array<Displayable & DisplayInMenuField & {
  items: Array<
    DisplayInMenuField
    & Displayable
    & Partial<Navigable>
    & Partial<Icon>
    & Partial<CommandShortcut>
    & Partial<OpenInNewTab>>;
}> = [
    {
      title: "Getting started",
      displayInMenu: false,
      items: [
        {
          title: "Home Page",
          description: "The introduction page.",
          href: "/",
          displayInMenu: false,
          shortcut: "*",
        },
        {
          title: "Source Code",
          description: "See the source code on GitHub.",
          href: "https://github.com/Morten-Renner/mortens-toolbox",
          displayInMenu: false,
          icon: GitHubLogoIcon,
          openInNewTab: true,
        },
      ],
    },
    {
      title: "Debug",
      displayInMenu: process.env.NEXT_PUBLIC_DISPLAY_DEBUG === "true",
      items: [
        {
          title: "Debug",
          description: "Debugging tools.",
          href: "/debug",
          displayInMenu: false,
          icon: ExclamationTriangleIcon,
        },
        {
          title: "Auth",
          description: "Debugging Authentication tools.",
          href: "/debug/auth",
          displayInMenu: process.env.NEXT_PUBLIC_DISPLAY_DEBUG === "true",
          icon: ExclamationTriangleIcon,
        }
      ],
    },
    {
      title: "Text",
      displayInMenu: true,
      items: [
        {
          title: "Word Counter",
          description: "Count the number of words in a given text.",
          href: "/word-counter",
          displayInMenu: true,
          icon: TextIcon,
        },
      ],
    },
    {
      title: "Encoding",
      displayInMenu: true,
      description: "Encode and decode different types of data.",
      items: [
        {
          title: "URL",
          description: "En/Decode URLs.",
          href: "/encoding/url",
          displayInMenu: true,
        },
      ],
    },
    {
      title: "Color",
      displayInMenu: true,
      description: "Color tools.",
      items: [
        {
          title: "Hex to HSL",
          description: "Convert HEX colors to HSL.",
          href: "/color/hex-to-hsl",
          displayInMenu: true,
          icon: BlendingModeIcon,
        },
      ],
    }
  ];

export function getTitleByHref(href: string): string | undefined {
  href = trimLocale(href);
  console.log(href);

  return menuData
    .flatMap(category => category.items)
    .find(item => item.href === href)?.title;
}

export function trimLocale(href: string): string {
  //example: /de/tools/word-counter -->  /tools/word-counter
  return href.replace(/\/[a-z]{2}/, '');
}