'use client';

import { Button, Input } from '@nextui-org/react';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { RegisterFormType } from '@/helpers/types';
import { RegisterSchema } from '@/helpers/schemas';
import { createAuthCookie } from '@/actions/auth.action';

export const Register = () => {
    const router = useRouter();

    const initialValues: RegisterFormType = {
        name: 'Acme',
        email: 'admin@acme.com',
        password: 'admin',
        confirmPassword: 'admin',
    };

    const handleRegister = useCallback(
        async (values: RegisterFormType) => {
            // `values` contains name, email & password. You can use provider to register user

            await createAuthCookie();
            router.replace('/');
        },
        [router],
    );

    return (
        <>
            <div className="text-center text-[25px] font-bold mb-6">
                Register
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <>
                        <div className="flex flex-col w-1/2 gap-4 mb-4">
                            <Input
                                errorMessage={errors.name}
                                isInvalid={!!errors.name && !!touched.name}
                                label="Name"
                                value={values.name}
                                variant="bordered"
                                onChange={handleChange('name')}
                            />
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
                            <Input
                                errorMessage={errors.confirmPassword}
                                isInvalid={
                                    !!errors.confirmPassword &&
                                    !!touched.confirmPassword
                                }
                                label="Confirm password"
                                type="password"
                                value={values.confirmPassword}
                                variant="bordered"
                                onChange={handleChange('confirmPassword')}
                            />
                        </div>

                        <Button
                            color="primary"
                            variant="flat"
                            onPress={() => handleSubmit()}
                        >
                            Register
                        </Button>
                    </>
                )}
            </Formik>

            <div className="font-light text-slate-400 mt-4 text-sm">
                Already have an account ?{' '}
                <Link className="font-bold" href="/login">
                    Login here
                </Link>
            </div>
        </>
    );
};
