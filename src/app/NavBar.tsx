"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { Avatar, Box, DropdownMenu, Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";



export default function NavBar(){
	const currentPath = usePathname();
	const links = [
		{ label: 'Dashboard', href: '/'},
		{ label: 'Issue', href: '/issues'},
	]

	const{status, data:session}= useSession();


	return(
		<>
		<main>
			<div className="flex gap-6 border-b  mb-2 h-16 items-center justify-between ">
				<div className=" flex items-center gap-2 ">

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
				</div>
				<Box className="mx-2">
					{status === "authenticated" &&(
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Button variant="ghost" radius="full" size="2" aria-label="Account menu">
									<Avatar fallback="?"
									src={session?.user?.image ?? undefined}
									size="2"
									radius="full"
									/>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end" sideOffset={8}>
								<DropdownMenu.Label>
									{session?.user?.email ?? 'Signed in'}
								</DropdownMenu.Label>
								<DropdownMenu.Item onSelect={() => signOut()}>
									Log out
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>

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