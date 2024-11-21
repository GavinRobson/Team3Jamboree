'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { LoginSchema } from '@/schemas';

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

import { login } from '@/actions/login';
import { cn } from '@/lib/utils';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        if (!data?.error) {
          router.push('/');
        }
      });
    });
  };

  return (
    <div className="flex justify-center mt-36">
      <div className="bg-[#0e1015] px-16 py-8 self-center mt-2 h-2/5 max-w-md rounded-md w-full">
        <h2 className="text-white text-2xl font-semibold justify-center mb-8 flex w-full">
          Welcome to Nexus
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
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
                          className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-800 focus:outline-none focus:ring-0 peer"
                          disabled={isPending}
                          placeholder=" "
                        />
                        <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                          Password
                        </label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <p className="text-neutral-500 mt-12 flex justify-center">
          First time?
          <span
            onClick={() => router.push('/auth/sign-up')}
            className="text-white ml-1 hover:underline cursor-pointer"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
