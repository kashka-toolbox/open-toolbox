"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { menuData } from "@/lib/navigation";
import { useRouter } from "next/navigation";

export function CommandAndNavigationCommand() {
  const router = useRouter()

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {
          menuData.map((category, index) => (
            <CommandGroup key={index} heading={category.title}>
              {category.items.map((subItem, subIndex) => (
                <CommandItem
                  onSelect={() => {
                    if (subItem.href) router.push(subItem.href);
                  }}
                  key={subIndex}
                  className="hover:cursor-pointer flex flex-row items-baseline overflow-hidden text-nowrap group/cmd"
                >
                  {subItem.icon ? <subItem.icon className="mr-2 h-4 w-4 min-w-4 place-self-center" /> : <div className="mr-2 h-4 w-4 min-w-4" />}
                  <span className="text-nowrap inline-block">{subItem.title}</span>
                  <span className="text-muted-foreground pl-2 text-xs text-ellipsis overflow-hidden min-w-0 transition-opacity duration-100 opacity-0 group-data-[selected='true']/cmd:opacity-100">{subItem.description}</span>
                  <CommandShortcut className="w-fit pl-2">{subItem.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          ))
        }
      </CommandList>
    </Command>
  );
}