'use client';
import React, { useContext } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { menuData } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { AuthContext } from './auth-provider';
import LoginForm from './auth/login.form';
import { ToolboxLogo } from './ui/Icons/ToolboxLogo';
import { Button } from './ui/button';
import { DarkmodeToggle } from './ui/darkmode-toggle';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';


// TODO: add mobile layout
export default function Header() {
  const { isSignedIn, logout } = useContext(AuthContext) ?? {};
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <ToolboxLogo className="h-6 w-6 " />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Toolbox
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem href="https://github.com/Morten-Renner/mortens-toolbox" title="Source Code" target='_blank'>
                    See the source code on GitHub.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {
              menuData.map((category, index) => (
                category.displayInMenu && (<NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {category.items.map((subItem, subIndex) => (
                        subItem.displayInMenu && (
                          <ListItem
                            key={subIndex}
                            title={subItem.title}
                            href={subItem.href}
                            target={subItem.openInNewTab === true ? '_blank' : undefined}
                          >
                            {subItem.description}
                          </ListItem>)
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>)
              ))
            }

          </NavigationMenuList>
        </NavigationMenu>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <DarkmodeToggle />

          {
            isSignedIn ?
              <div>
                <Button onClick={() => logout!()}>Logout</Button>
              </div>
              : <Dialog>
                  <DialogTrigger asChild>
                    <Button>Login</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className='h-1' />
                    <DialogHeader>
                      <Tabs defaultValue="login">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="login">Login</TabsTrigger>
                          <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                          <LoginForm />
                        </TabsContent>
                        <TabsContent value="register">
                          TODO: Register
                        </TabsContent>
                      </Tabs>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
          }
        </div>
      </div>
    </header>
  );
};


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          href={href ?? ""}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"