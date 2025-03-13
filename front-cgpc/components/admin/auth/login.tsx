'use client';

import { Button, Input } from '@nextui-org/react';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { LoginFormType } from '@/helpers/types';
import { LoginSchema } from '@/helpers/schemas';
import { createAuthCookie } from '@/actions/auth.action';

export const Login = () => {
    const router = useRouter();

    const initialValues: LoginFormType = {
        email: 'admin@acme.com',
        password: 'admin',
    };

    const handleLogin = useCallback(
        async (values: LoginFormType) => {
            // `values` contains email & password. You can use provider to connect user

            await createAuthCookie();
            router.replace('/');
        },
        [router],
    );

    return (
        <>
            <div className="text-center text-[25px] font-bold mb-6">Login</div>

            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <>
                        <div className="flex flex-col w-1/2 gap-4 mb-4">
                            <Input
                                errorMessage={errors.email}
                                isInvalid={!!errors.email && !!touched.email}
                                label="Email"
                                type="email"
                                value={values.email}
                                variant="bordered"
                                onChange={handleChange('email')}
                            />
                            <Input
                                errorMessage={errors.password}
                                isInvalid={
                                    !!errors.password && !!touched.password
                                }
                                label="Password"
                                type="password"
                                value={values.password}
                                variant="bordered"
                                onChange={handleChange('password')}
                            />
                        </div>

                        <Button
                            color="primary"
                            variant="flat"
                            onPress={() => handleSubmit()}
                        >
                            Login
                        </Button>
                    </>
                )}
            </Formik>

            <div className="font-light text-slate-400 mt-4 text-sm">
                Don&apos;t have an account ?{' '}
                <Link className="font-bold" href="/register">
                    Register here
                </Link>
            </div>
        </>
    );
};
