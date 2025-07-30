"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { authClient } from "@/lib/auth-client";

export default function NavigationLayout() {
	const { data: session } = authClient.useSession();

	return (
		<nav className="mb-4 border-b">
			<div className="container mx-auto flex flex-row justify-between py-2">
				<Button asChild variant="ghost">
					<Link href="/">Home</Link>
				</Button>
				{session ? <LoggedRightPart /> : <DefaultRightPart />}
			</div>
		</nav>
	);
}

function DefaultRightPart() {
	return (
		<div className="flex gap-4">
			<Button asChild variant="ghost">
				<Link href="/login">Login</Link>
			</Button>
			<ModeToggle />
		</div>
	);
}

function LoggedRightPart() {
	const router = useRouter();
	const signOut = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => router.push("/"),
			},
		});
	};
	return (
		<div className="flex gap-4">
			<Button onClick={signOut} variant="ghost">
				Logout
			</Button>
			<ModeToggle />
		</div>
	);
}
