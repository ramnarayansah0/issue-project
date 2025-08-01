"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { FaBeer } from "react-icons/fa";
import classnames from "classnames";



export default function NavBar(){
    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issue', href: '/issues'},
    ]


    return(
        <>
        <main>
            <div className="flex gap-6 border-b  mb-2 h-16 items-center">
                <Link href="/"> <AiFillBug/></Link>
                <ul className="flex gap-x-6">
                    {links.map(link =>
                    <Link
                    key={link.href}
                    className={classnames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500' :link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                    })}
                        href={link.href}>{link.label}</Link>)}
                    
                </ul>
            </div>
        </main>
        </>
    )
}