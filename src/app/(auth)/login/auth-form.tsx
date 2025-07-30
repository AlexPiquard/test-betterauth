"use client";

import IconGitHub from "@/components/icons/IconGitHub";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function AuthForm({ className }: { className: string }) {
	const githubSubmit = () => {
		authClient.signIn.social({ provider: "github" });
	};

	return (
		<div className={`flex flex-col ${className}`}>
			<Tabs defaultValue="signin">
				<TabsList>
					<TabsTrigger value="signin">Sign In</TabsTrigger>
					<TabsTrigger value="signup">Sign up</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<Card>
						<CardHeader>
							<CardTitle>Sign In</CardTitle>
							<CardDescription>
								Login to your existing account using an email and a password
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6">
							<LoginForm />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="signup">
					<Card>
						<CardHeader>
							<CardTitle>Sign Up</CardTitle>
							<CardDescription>
								Create an account using an email and a password
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6">
							<RegisterForm />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
			<div className="flex flex-row items-center gap-4 my-4">
				<Separator className="flex-1" />
				<span className="text-muted-foreground">ou</span>
				<Separator className="flex-1" />
			</div>
			<Button variant="outline" onClick={githubSubmit}>
				<IconGitHub />
				GitHub
			</Button>
		</div>
	);
}
