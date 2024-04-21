import { DashIcon, TextIcon } from "@radix-ui/react-icons";

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
          title: "Typography",
          description: "Styles for headings, paragraphs, lists...etc",
          href: "/docs/primitives/typography",
          displayInMenu: false,
          shortcut: "STRG+*",
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