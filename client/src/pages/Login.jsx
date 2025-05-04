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
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"


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

    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();

    // console.log(registerData, registerIsSuccess, registerIsLoading);

    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Account created")
        }
        if (registerError) {
            toast.error(registerData.data.message || "Sign Up failed")
        }
        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login successful")
        }
        if (loginError) {
            toast.error(loginData.data.message || "Login falied")
        }
    }, [registerData, loginData, loginIsLoading, registerIsLoading]);

    /* it's not optimized
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

    const handleOnClickRegistration = async (type) => {
        if (type == "login") {
            // console.log(login);
            await loginUser(login);
        }
        else {
            // console.log(signUp);
            await registerUser(signUp);
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-full mt-20">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2" >
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
                            <Button disabled={registerIsLoading} onClick={() => handleOnClickRegistration("signup")}>{
                                registerIsLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : "Signup"
                            }</Button>
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
                            <Button disabled={loginIsLoading} onClick={() => handleOnClickRegistration("login")}>{
                                loginIsLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : "Login"
                            }</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}