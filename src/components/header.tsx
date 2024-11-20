'use client';
import React, { useContext } from 'react';

import {
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { AuthContext } from './auth-provider';
import LoginForm from './auth/login.form';
import { CommandAndNavigationCommand } from './ui/CommandAndNavigationCommand';
import { Button } from './ui/button';
import { DarkmodeToggle } from './ui/darkmode-toggle';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FourDotsIcon } from './ui/Icons/FourDotsIcon';


// TODO: add mobile layout
export default function Header() {
  const { isSignedIn, logout } = useContext(AuthContext) ?? {};
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex justify-around items-center gap-6 h-14 max-w-screen-2xl'>
        <span className='text-3xl font-groteskItalic font-black tracking-tight flex gap-2 items-center min-w-fit'>
          <FourDotsIcon />
          <span>Kashka</span>
        </span>
        <div className='w-full flex justify-around'>
          <div className='relative h-[42px] overflow-visible w-full max-w-[600px]'>
            <CommandAndNavigationCommand className='absolute left-0 right-0 top-0 w-full h-max' />
          </div>
        </div>
        <div className='flex items-center justify-between space-x-2 md:justify-end'>
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