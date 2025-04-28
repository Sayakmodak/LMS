import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { HandCoins } from "lucide-react"
import { useState } from "react"

export function Login() {
    const [signUp, setSignup] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    /* it's not optimistic 
    const handleSignUpOnclick = () => {
        console.log(signUp);
        setLogin("");
    }

    const handleLoginOnclick = () => {
        console.log(login);
        setSignup("");
    }
    const handleSignupOnchange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        const { name } = e.target;
        setSignup({ ...signUp, [name]: e.target.value });
    }

    const handleLoginOnChange = (e) => {
        const { name } = e.target;
        setLogin({ ...login, [name]: e.target.value });
    } 
    */

    const handleOnChange = (e, type) => {
        const { name } = e.target;
        if (type == "login") {
            setLogin({ ...login, [name]: e.target.value });
        }
        else {
            setSignup({ ...signUp, [name]: e.target.value });
        }
    }

    const handleOnClick = (type) => {
        if (type == "login") {
            console.log(login);
        }
        else {
            console.log(signUp);
        }
    }

    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Signup</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
                <Card>
                    <CardHeader>
                        <CardTitle>Signup</CardTitle>
                        <CardDescription>
                            Create a new account and click signup when you are done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="Enter your name.." name="name" value={signUp.name} onChange={(e) => handleOnChange(e, "signup")} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="Enter your email.." value={signUp.email} onChange={(e) => handleOnChange(e, "signup")} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" placeholder="Enter password.." value={signUp.password} onChange={(e) => handleOnChange(e, "signup")} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => handleOnClick("signup")}>Signup</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Login into your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Email</Label>
                            <Input id="current" type="email" placeholder="Enter your email" name="email" onChange={(e) => handleOnChange(e, "login")} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Password</Label>
                            <Input id="new" type="password" placeholder="Enter password" name="password" onChange={(e) => handleOnChange(e, "login")} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => handleOnClick("login")}>Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}