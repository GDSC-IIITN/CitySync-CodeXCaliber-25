"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentProps, FormEvent, useRef } from "react";
import { useContractorSingup } from "@/hooks/api/useSignup";
import { contractorSignupAuth } from "@repo/schema/contractor";

export function SignupForm({ className, ...props }: ComponentProps<"form">) {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneNumRef = useRef<HTMLInputElement>(null);
    const gstinNumRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const controactor = useContractorSingup();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const phoneNum = phoneNumRef.current?.value;
        const gstinNum = gstinNumRef.current?.value;
        const password = passwordRef.current?.value;

        const inputData = contractorSignupAuth.safeParse({
            name: name,
            email: email,
            phoneNo: phoneNum,
            GSTIN: gstinNum,
            password: password,
        });
        if (!inputData.success) {
            console.log("Error: ", inputData.error);
            return;
        }
        controactor.mutate(inputData.data);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <h2 className="text-2xl">
                !!!!!! WARNING: ONLY FOR CONTRACTOR !!!!!!
            </h2>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="name"
                        ref={nameRef}
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        ref={emailRef}
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="phoneNum">Phone Number</Label>
                    <Input
                        id="phoneNum"
                        type="text"
                        ref={phoneNumRef}
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="gstinnum">GSTIN Number</Label>
                    <Input
                        id="gstinNum"
                        type="text"
                        ref={gstinNumRef}
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        ref={passwordRef}
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    );
}
