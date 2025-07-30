"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const schema = z.object({
	email: z.email(),
	password: z.string().min(8).max(20),
	rememberMe: z.boolean(),
});
type Schema = z.infer<typeof schema>;

export default function LoginForm() {
	const router = useRouter();
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: { email: "", password: "", rememberMe: false },
	});

	const onSubmit = async (schema: Schema) => {
		console.log(schema);
		authClient.signIn.email(schema, {
			onSuccess: () => router.push("/"),
			onError(ctx) {
				console.log(ctx.error);
			},
		});
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-y-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rememberMe"
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-row gap-2">
								<FormControl>
									<Checkbox
										onCheckedChange={(checked) => field.onChange(checked)}
									/>
								</FormControl>
								<FormLabel>Remember me</FormLabel>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Login</Button>
			</form>
		</Form>
	);
}
