import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useContext } from "react"
import { Button } from "../ui/button"
import LoginForm from "./login.form"
import { AuthContext } from '../auth-provider';


export const LoginButton = () => {
    const { isSignedIn, logout } = useContext(AuthContext) ?? {};
    return isSignedIn ?
        <div>
            <Button onClick={() => logout!()}> Logout</Button >
        </div >
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
};