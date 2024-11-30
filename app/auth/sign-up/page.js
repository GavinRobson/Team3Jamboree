'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { RegisterSchema } from '@/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

import { register } from '@/actions/register';
import { login } from '@/actions/login';
import { cn } from '@/lib/utils';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error);
        if (data?.success) {
          login(values).then(() => {
            router.push('/');
          });
        }
      });
    });
  };

  return (
    <div className="flex justify-center h-full">
      <div className="bg-[#0e1015] px-16 py-8 self-center mt-2 h-1/2 max-w-md rounded-md w-full">
        <h2 className="text-white text-2xl font-semibold justify-center mb-8 flex w-full">
          Create a new account!
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input
                          {...field}
                          type="name"
                          autoComplete="off"
                          className={cn(
                            'block rounded-md px-6 pt-6 pb-1 w-full text-md text-white focus:outline-none focus:ring-0 peer outline-t',
                            form.getFieldState('username').error
                              ? 'bg-[#FF003D]/15 outline outline-1 outline-red-800'
                              : 'bg-neutral-800'
                          )}
                          disabled={isPending}
                          placeholder=" "
                        />
                        <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                          Username
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input
                          {...field}
                          type="email"
                          autoComplete="off"
                          className={cn(
                            'block rounded-md px-6 pt-6 pb-1 w-full text-md text-white focus:outline-none focus:ring-0 peer outline-t',
                            form.getFieldState('email').error
                              ? 'bg-[#FF003D]/15 outline outline-1 outline-red-800'
                              : 'bg-neutral-800'
                          )}
                          disabled={isPending}
                          placeholder=" "
                        />
                        <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                          Email
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input
                          {...field}
                          type="password"
                          autoComplete="off"
                          className={cn(
                            'block rounded-md px-6 pt-6 pb-1 w-full text-md text-white focus:outline-none focus:ring-0 peer outline-t',
                            form.getFieldState('password').error
                              ? 'bg-[#FF003D]/15 outline outline-1 outline-red-800'
                              : 'bg-neutral-800'
                          )}
                          disabled={isPending}
                          placeholder=" "
                        />
                        <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                          Password
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Create an account
            </Button>
          </form>
        </Form>
        <p className="text-neutral-500 mt-6 flex justify-center">
          Already have an account?
          <span
            onClick={() => router.push('/auth/login')}
            className="text-white ml-1 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
