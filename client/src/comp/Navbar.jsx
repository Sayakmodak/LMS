
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import Darkmode from './Darkmode'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';



const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    // console.log(user);
    const [logoutUser, { data, error, isError, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "You are logged out")
            navigate("/login")
        }
        if (isError) {
            toast.error(error.message || "Failed to logout")
        }
    }, [isSuccess, data])

    return (
        <div className='h-16 dark:bg-[#0a0a0a] bg-white border-b dark:border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* Desktop */}
            <div className='max-w-7xl md:flex mx-auto hidden justify-between items-center gap-10 h-full px-12'>
                <Link to="/">
                    <div className='flex items-center gap-2'>
                        <School size={"30"} />
                        <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
                    </div>
                </Link>

                {/* user icon and dark mode icon */}
                <div className='flex items-center gap-8'>{
                    user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={user?.userProfileImg || "https://github.com/shadcn.png"} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mr-6">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem><Link to="my-learning">My learning</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link to="profile">Edit profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                                </DropdownMenuGroup>
                                {
                                    user.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                        </>
                                    )
                                }

                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : <div className='flex justify-center items-center gap-2.5'>
                        <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                        <Button onClick={() => navigate("/login")}>SignUp</Button>
                    </div>}
                    <Darkmode />
                </div>
            </div>

            {/* Mobile Device */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='text-2xl font-extrabold'>E-Learning</h1>
                <MobileNavbar />
            </div>

        </div>
    )
}

export default Navbar



const MobileNavbar = () => {
    const role = "instructor";
    return (
        <Sheet className=''>
            <SheetTrigger asChild className=''>
                <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
                <SheetHeader className="flex flex-row items-center justify-between mt-3">
                    <div className='w-full flex items-center justify-between mt-4'>
                        <SheetTitle>E-Learning</SheetTitle>
                        <Darkmode />
                    </div>

                </SheetHeader>
                <Separator className='mr-2' />
                <nav className='flex flex-col space-y-4 p-4 mt-[-30px]'>
                    <span>My Learning</span>
                    <span>Edit Profile</span>
                    <p>Log Out</p>
                </nav>
                {
                    role === 'instructor' ? (<SheetFooter className='mt-[-30px]'>
                        <SheetClose asChild>
                            <Button type="submit">Dashboard</Button>
                        </SheetClose>
                    </SheetFooter>) : "button"
                }

            </SheetContent>
        </Sheet>
    )
}