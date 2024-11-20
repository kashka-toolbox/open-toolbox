"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { menuData } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";


export const CommandAndNavigationCommand = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const router = useRouter()

  const [showCommandList, setShowCommandList] = useState(false);
  const commandListRef = useRef(null);

  return (
    <Command
      ref={ref}
      className={cn("rounded-lg border shadow-md", className, showCommandList ? "shadow-2xl" : "")}
      onFocus={() => setShowCommandList(true)}
      onBlur={() => setShowCommandList(false)}>
      <CommandInput
        placeholder="Search a tool here..." />
      <CSSTransition
        nodeRef={commandListRef}
        in={showCommandList}
        timeout={200}
        classNames={{
          enter: "max-h-[300px]",
          enterActive: "max-h-[300px]",
          enterDone: "max-h-[300px]",
        }}>
        <CommandList className={cn("transition-[max-height,border-top-width] duration-200", showCommandList ? "border-t" : "border-t-0")} ref={commandListRef}>
          <CommandEmpty>No results found.</CommandEmpty>
          {
            menuData.map((category, index) => (
              <CommandGroup key={index} heading={category.title}>
                {category.items.map((subItem, subIndex) => (
                  <CommandItem
                    onSelect={() => {
                      if (subItem.href && subItem.openInNewTab != true)
                        router.push(subItem.href);
                      else if (subItem.href && subItem.openInNewTab === true)
                        window.open(subItem.href, '_blank');
                    }}
                    key={subIndex}
                    className="hover:cursor-pointer flex flex-row items-baseline overflow-hidden text-nowrap group/cmd"
                    keywords={["test"]}
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
      </CSSTransition>
    </Command>
  );
});