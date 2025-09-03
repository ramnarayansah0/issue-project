"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";



export default function NavBar(){
    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issue', href: '/issues'},
    ]

    const{status, data}= useSession();


    return(
        <>
        <main>
            <div className="flex gap-6 border-b  mb-2 h-16 items-center">
                <Link href="/"> <AiFillBug/></Link>
                <ul className="flex gap-x-6">
                    {links.map(link =>
                    <li key={link.href}>
                    <Link
                    
                    className={classnames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500' :link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                    })}
                        href={link.href}>{link.label}</Link> </li>)}
                    
                </ul>
                <Box>
                    {status === "authenticated" &&(
                        <Link href="/api/auth/signout">Log out</Link>
                    )}
                    {status === "unauthenticated" &&(
                        <Link href="/api/auth/signin">Log in</Link>
                    )}
                </Box>
            </div>
        </main>
        </>
    )
}