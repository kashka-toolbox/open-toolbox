import { DashIcon, GitHubLogoIcon, TextIcon } from "@radix-ui/react-icons";

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

export const menuData: Array<Displayable & DisplayInMenuField & {
  items: Array<DisplayInMenuField & Displayable & Partial<Navigable> & Partial<Icon> & Partial<CommandShortcut>>;
}> = [
    {
      title: "Getting started",
      displayInMenu: false,
      items: [
        {
          title: "Home Page",
          description: "The introduction page.",
          href: "/docs",
          displayInMenu: false,
          shortcut: "*",
        },
        {
          title: "Installation",
          description: "How to install dependencies and structure your app.",
          href: "/docs/installation",
          displayInMenu: false,
        },
        {
          title: "Source Code",
          description: "See the source code on GitHub.",
          href: "https://github.com/Morten-Renner/mortens-toolbox",
          displayInMenu: false,
          icon: GitHubLogoIcon,
        },
      ],
    },
    {
      title: "Text",
      displayInMenu: true,
      items: [
        {
          title: "Word Counter",
          description: "Count the number of words in a given text.",
          href: "/tools/word-counter",
          displayInMenu: true,
          icon: TextIcon,
        },
      ],
    },
  ];

export function getTitleByHref (href: string): string | undefined {
  return menuData
    .flatMap(category => category.items)
    .find(item => item.href === href)?.title;
}