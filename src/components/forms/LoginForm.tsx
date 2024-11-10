'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { useRouter } from 'next/router';

const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        console.log(data);
        router.push('/dashboard');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input {...field} id="email" type="email" />
                            </FormControl>
                            {form.formState.errors.email ? (
                                <FormMessage>{form.formState.errors.email.message}</FormMessage>
                            ) : (
                                <FormDescription>
                                    We'll never share your email with anyone else.
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input {...field} id="password" type="password" />
                            </FormControl>
                            {form.formState.errors.password ? (
                                <FormMessage>{form.formState.errors.password.message}</FormMessage>
                            ) : (
                                <FormDescription>
                                    Must be at least 8 characters.
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />
                <div className='flex flex-col space-y-4'>
                <div className='flex items-center justify-between'>
                    <Link href="/" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </Link>
                    <Link href="/register" className="text-sm text-primary hover:underline">
                        Create an account
                    </Link>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="rememberme" />
                    <label
                        htmlFor="rememberme"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Remember me
                    </label>
                </div>
                </div>
                <Button type="submit" variant="default" className="w-full">
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
